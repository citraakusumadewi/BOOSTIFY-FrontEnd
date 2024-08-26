import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from './SignIn.module.css';

export default function SignIn() {
  const [assistantCode, setAssistantCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username: assistantCode,
      password: password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/HomePage");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={assistantCode}
          onChange={(e) => setAssistantCode(e.target.value.toUpperCase())}
          placeholder="Assistant Code"
        />
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
