import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function EmployerLogin() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const [validCompanies, setValidCompanies] = useState([]);

  useEffect(() => {
    const localJobs = JSON.parse(localStorage.getItem('customJobs')) || [];

    axios.get('/jobs.json').then((response) => {
      const data = response.data;

      const totalJobs = data.companies.length;
      const staticJobs = Array.from({ length: totalJobs }, (_, i) => ({
        id: data.companies[i].id,
        companyName: data.companies[i]?.companyName,
        jobTitle: data.titles[i]?.jobTitle,
        jobDescription: data.descriptions[i]?.jobDescription,
        jobRequirements: data.requirements[i]?.jobRequirements,
        salaryRange: data.salaries[i]?.salaryRange,
        jobLocation: data.locations[i]?.jobLocation,
        jobType: data.types[i]?.jobType,
        jobPostedDate: data.postedDates[i]?.jobPostedDate,
        jobExpiryDate: data.expiryDates[i]?.jobExpiryDate,
        jobSkills: data.skills[i]?.jobSkills,
        jobBenefits: data.benefits[i]?.jobBenefits,
        companyLogo: data.logos[i]?.companyLogo,
      }));

      const allJobs = [...localJobs, ...staticJobs];
      const companies = [...new Set(allJobs.map((job) => job.companyName?.trim()).filter(Boolean))];
      setValidCompanies(companies);
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
