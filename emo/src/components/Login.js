import React, { useState, useEffect } from 'react';


import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// Replace with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIfXqQVDoM6NsZo4-cYYG-cu9KgJEp9_k",
  authDomain: "meta-verse-login-page.firebaseapp.com",
  projectId: "meta-verse-login-page",
  storageBucket: "meta-verse-login-page.appspot.com",
  messagingSenderId: "474864330032",
  appId: "1:474864330032:web:b0d146876b115c11e114f5",
  measurementId: "G-5Y9G68W761"
};

// Initialize Firebase app
initializeApp(firebaseConfig);

// Create a custom hook for the authentication state
export function useAuth() { // Renamed to `useAuth` for export
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, [auth]);

  return currentUser;
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate('/home'); // Redirect to home page on successful login
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(getAuth(), provider);
      navigate('/home'); // Redirect to home page on successful login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email or Username:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <button className="google-button" onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
      <p>
        Don't have an account?{' '}
        <a href="/signup">Create an account</a>
      </p>
    </div>
  );
}

export default Login; // Main export
