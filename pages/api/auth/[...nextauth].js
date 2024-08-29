import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await fetch('https://boostify-back-end.vercel.app/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              assisstant_code: credentials.username,
              password: credentials.password
            })
          });

          if (!res.ok) {
            throw new Error('Invalid credentials');
          }

          const user = await res.json();

          if (user && user.token) {
            return user;
          }

          return null;

        } catch (error) {
          console.error('Error in authorization:', error);
          return null;
        }
      }
    })
  ],
  session: {
    jwt: true,
    maxAge: 60 , // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
        token.name = user.name;
        token.assistantCode = user.assistant_code; // Changed to avoid confusion
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        assistantCode: token.assistantCode, // Changed to match the jwt callback
        token: token.token,
      };
      return session;
    }
  },
  events: {
    async signOut({ token }) {
      if (token?.token) {
        try {
          const response = await fetch('https://boostify-back-end.vercel.app/api/auth/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token.token}`,
            }
          });

          if (!response.ok) {
            console.error('Failed to sign out on the server');
          }
        } catch (error) {
          console.error('Error during sign out:', error);
        }
      }
    }
  },
  pages: {
    signIn: '/auth/SignIn',
    signOut: '/auth/SignOut',
  }
});