// JobFilter.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function JobFilter() {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      keywords,
      location,
      minSalary,
      maxSalary,
    }).toString();
    navigate(`/seeker?${queryParams}`);
  };

  return (
    <div className='container mt-4'>
      <h2 className='mb-4 text-center'>Filter Job Listings</h2>

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
        <input type='number' className='form-control' value={minSalary} onChange={(e) => setMinSalary(e.target.value)} />
      </div>

      <div className='mb-3'>
        <label>Maximum Salary</label>
        <input type='number' className='form-control' value={maxSalary} onChange={(e) => setMaxSalary(e.target.value)} />
      </div>

      <button className='btn btn-success' onClick={handleSearch}>
        Search Jobs
      </button>
    </div>
  );
}
