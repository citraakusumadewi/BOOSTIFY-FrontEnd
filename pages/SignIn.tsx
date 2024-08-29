import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession, getSession } from 'next-auth/react';
import { DefaultSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import styles from './SignIn.module.css';

// Extend the DefaultSession type to include the id and token
interface CustomUser {
  id?: number;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  token?: string;
}

interface CustomSession extends DefaultSession {
  user: CustomUser;
}

const SignIn: React.FC = () => {
  const [assistantCode, setAssistantCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const { data: session } = useSession() as { data: CustomSession }; // Casting to CustomSession

  useEffect(() => {
    if (session?.user?.token) {
      const userData = {
        id: session.user.id,
        name: session.user.name,
        assistant_code: session.user.email,
        token: session.user.token,
      };
      localStorage.setItem('authData', JSON.stringify(userData));
  
      // Redirect after a small delay to ensure session is established
      setTimeout(() => {
        router.push('/HomePage');
      }, 1000); // Increase the delay to 1 second      
    }
  }, [session]);
  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn('credentials', {
      redirect: false,
      username: assistantCode,
      password,
    });

    setLoading(false);

    if (result?.error) {
      setError('Invalid Password');
    } else {
      // Get the latest session after sign-in
      const session = await getSession() as CustomSession; // Ensure type casting here
      if (session?.user?.token) {
        const userData = {
          id: session.user.id,
          name: session.user.name,
          assistant_code: session.user.email,
          token: session.user.token,
        };
        // Save the session data in localStorage for persistence
        localStorage.setItem('authData', JSON.stringify(userData));
      }
      router.push('/HomePage');
    }
  };

  const handleAssistantCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setAssistantCode(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Boostify Logo" />
      </div>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Sign In to Your Account</h2>
        <form className={styles.form} onSubmit={handleSignIn}>
          <div className={styles.inputGroup}>
            <label htmlFor="assistantCode" className={styles.label}>Assistant Code</label>
            <input
              type="text"
              id="assistantCode"
              className={styles.input}
              placeholder="Assistant Code"
              value={assistantCode}
              onChange={handleAssistantCodeChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={styles.input}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <img
                src={showPassword ? '/eye-slash.png' : '/eye.png'}
                alt="Toggle Password Visibility"
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.signInButton} disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;