import React from 'react';
import { Button } from 'react-bootstrap';
import useAuth from '../hooks/auth.jsx';

const Home = () => {
  const auth = useAuth();

  return (
    <main>
      <h2>Welcome!</h2>
      <p>Home Page</p>
      <Button onClick={auth.logOut} variant="warning" size="sm">Выйти</Button>
    </main>
  );
};

export default Home;
