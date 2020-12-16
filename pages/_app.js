
import UserContext from '../components/UserContext';
import React, { useState } from 'react';
import '../styles/globals.css';
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState('');

  const updateUser = (user) => {
    setUser(user);
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp
