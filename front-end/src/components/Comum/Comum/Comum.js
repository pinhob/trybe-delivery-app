import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Comum = () => {
  const history = useHistory();

  useEffect(() => {
    history.push('/login');
  }, [history]);

  return (
    <h1>Loading</h1>
  );
};

export default Comum;
