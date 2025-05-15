// JobFilter.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function JobFilter() {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [minSalary, setMinSalary] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keywords) params.append('keywords', keywords);
    if (location) params.append('location', location);
    if (minSalary) params.append('minSalary', minSalary);

    const query = params.toString();
    navigate(query ? `/seeker?${query}` : '/seeker');
  };

  return (
    <div className='container mt-4'>
      <h2 className='mb-4 text-center'>Filter Job Listings</h2>

      <form onSubmit={handleSearch}>
        <div className='mb-3'>
          <label>Keywords</label>
          <input className='form-control' value={keywords} onChange={(e) => setKeywords(e.target.value)} />
        </div>

        <div className='mb-3'>
          <label>Location</label>
          <input className='form-control' value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>

        <div className='mb-3'>
          <label>Minimum Salary</label>
          <input
            type='number'
            className='form-control'
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Search Jobs
        </button>
        <button type='button' className='btn btn-secondary ms-2' onClick={() => navigate('/filter')}>
          Go Back
        </button>
      </form>
    </div>
  );
}
