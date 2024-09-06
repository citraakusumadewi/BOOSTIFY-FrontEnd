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
        const res = await fetch('https://boostify-back-end.vercel.app/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            assisstant_code: credentials.username,
            password: credentials.password,
          }),
        });

        if (!res.ok) {
          const errorText = await res.text(); // Mengambil respons HTML sebagai teks untuk debug
          console.error('Error response:', errorText); 
          throw new Error('Invalid credentials');
        }

        const user = await res.json();
        if (user && user.token) {
          return user; // Return user with auth token
        }

        return null;
      }
    })
  ],
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.token) {
        console.log("Authorize User:", user);
        token.id = user.token.payload.id;
        token.name = user.token.payload.name;
        token.assistantCode = user.token.payload.assisstant_code;
        token.token = user.token.token;
        console.log('Assigned token:', token.token);
      } else {
        console.error('User or payload is undefined:', user);
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        assistantCode: token.assistantCode,
        token: token.token, // Auth token
      };
      return session;
    }
  },
  pages: {
    signIn: '/SignIn',
    signOut: '/SignOut',
  }
});
