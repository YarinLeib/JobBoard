import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function EmployerLogin() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const [validCompanies, setValidCompanies] = useState([]);

  useEffect(() => {
    axios
      .get('https://json-server-backend-jobboard.onrender.com/jobs')
      .then((response) => {
        const jobs = response.data;

        // Extract unique, trimmed company names
        const companies = [...new Set(jobs.map((job) => job.companyName?.trim()).filter(Boolean))];
        setValidCompanies(companies);
      })
      .catch((err) => {
        console.error('Failed to fetch companies:', err);
        setError('Error loading company list.');
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = companyName.trim();

    if (!trimmedName) return;

    const match = validCompanies.find((company) => company.toLowerCase() === trimmedName.toLowerCase());

    if (match) {
      const encodedName = encodeURIComponent(match);
      navigate(`/company/${encodedName}`);
    } else {
      setError('Company not found. Please enter a valid company name.');
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
              onChange={(e) => {
                setCompanyName(e.target.value);
                setError('');
              }}
            />
            {error && <div className='text-danger mt-2'>{error}</div>}
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
