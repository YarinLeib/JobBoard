import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function EmployerLogin() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (companyName.trim()) {
      const encodedName = encodeURIComponent(companyName.trim());
      navigate(`/company/${encodedName}`);
    }
  };

  return (
    <div
      className='d-flex justify-content-center align-items-center bg-light'
      style={{ minHeight: 'calc(100vh - 85px)' }}>
      <div className='card shadow-lg p-4' style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className='mb-4 text-center'>Employer Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>Company Name</label>
            <input
              type='text'
              className='form-control'
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-primary w-100'>
            Login
          </button>
        </form>
        <div className='btn btn-secondary mt-4' onClick={() => navigate('/')}>
          Back to Home
        </div>
      </div>
    </div>
  );
}
