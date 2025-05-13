import React from 'react';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className='container text-center mt-5'>
      <h1 className='display-4 text-danger'>404</h1>
      <p className='lead'>Page Not Found</p>
      <button className='btn btn-primary mt-3' onClick={() => navigate('/')}>
        Go Home
      </button>
    </div>
  );
}
