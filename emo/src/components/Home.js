import React, { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth'; // Import Firebase auth methods
import { useNavigate } from 'react-router-dom'; // For navigation on logout

function Home() {
  const navigate = useNavigate();
  const auth = getAuth(); // Get the authentication instance

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out using Firebase auth
      navigate('/'); // Redirect to login page on successful logout
    } catch (error) {
      console.error('Error logging out:', error); // Handle errors (optional)
    }
  };

  // Optional: Implement a check for user authentication on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login'); // Redirect to login if not authenticated
      }
    });

    return unsubscribe; // Cleanup function to prevent memory leaks
  }, [auth, navigate]); // Dependencies for useEffect

  return (
    <div className="home-container">
      <h1>Welcome Home!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
