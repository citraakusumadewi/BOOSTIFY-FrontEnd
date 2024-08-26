import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Assistant Code", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Send the request to the backend
          const res = await fetch('https://boostify-back-end.vercel.app/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              assistant_code: credentials.username,
              password: credentials.password,
            }),
          });
      
          const responseText = await res.text(); // Read response text for better debugging
      
          if (!res.ok) {
            console.error(`Request failed with status ${res.status}: ${responseText}`);
            throw new Error(`Request failed with status ${res.status}: ${responseText}`);
          }
      
          const user = JSON.parse(responseText);
      
          if (user.token) {
            return user;
          } else {
            throw new Error(user.message || 'Invalid credentials');
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error('Authorization failed');
        }
      }      
    })
  ],
  pages: {
    signIn: '/SignIn',  // Halaman sign-in Anda
  }
});
