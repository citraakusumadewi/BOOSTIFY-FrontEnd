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
            password: credentials.password
          })
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token; // Pastikan ini benar
      }
      return token;
    },    
    async session({ session, token }) {
      session.user = token;
      return session;
    }    
  },
  secret: process.env.NEXTAUTH_SECRET,
});
