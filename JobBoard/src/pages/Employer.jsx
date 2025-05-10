import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Employer() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    jobDescription: '',
    requirements: '',
    salary: '',
    jobLocation: '',
    jobType: 'Full-time',
    jobSkills: '',
    jobBenefits: '',
    companyLogo: null,
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'companyLogo') {
      setFormData({ ...formData, companyLogo: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    const base64Logo = formData.companyLogo ? await toBase64(formData.companyLogo) : '';

    const jobData = {
      id: Date.now(),
      companyName: formData.companyName,
      jobTitle: formData.jobTitle,
      jobDescription: formData.jobDescription,
      jobRequirements: formData.requirements,
      jobLocation: formData.jobLocation,
      salaryRange: formData.salary,
      jobType: formData.jobType,
      jobSkills: formData.jobSkills.split(',').map((skill) => skill.trim()),
      jobBenefits: formData.jobBenefits.split(',').map((benefit) => benefit.trim()),
      companyLogo: base64Logo,
      jobPostedDate: new Date().toISOString().split('T')[0],
      jobExpiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };

    try {
      const res = await fetch('http://localhost:5005/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
      });

      if (!res.ok) throw new Error('Failed to post job');

      alert('Job posted successfully!');
      navigate('/Seeker');
    } catch (err) {
      console.error('Error posting job:', err);
      alert('Error posting job. See console for details.');
    }
  };

  return (
    <div className='container mt-4'>
      <h1 className='text-primary text-center'>Employer</h1>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-md-6'>
            <div className='mb-3'>
              <label htmlFor='companyName' className='form-label'>
                Company Name
              </label>
              <input type='text' className='form-control' id='companyName' required onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label htmlFor='requirements' className='form-label'>
                Job Requirements
              </label>
              <textarea className='form-control' id='requirements' rows='3' required onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label htmlFor='salary' className='form-label'>
                Salary Range
              </label>
              <input type='text' className='form-control' id='salary' required onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label htmlFor='jobType' className='form-label'>
                Job Type
              </label>
              <select className='form-select' id='jobType' value={formData.jobType} onChange={handleChange}>
                <option value='Full-time'>Full-time</option>
                <option value='Part-time'>Part-time</option>
                <option value='Internship'>Internship</option>
                <option value='Contract'>Contract</option>
              </select>
            </div>
            <div className='mb-3'>
              <label htmlFor='jobSkills' className='form-label'>
                Job Skills (comma-separated)
              </label>
              <input
                type='text'
                className='form-control'
                id='jobSkills'
                placeholder='e.g., React, TypeScript'
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='col-md-6'>
            <div className='mb-3'>
              <label htmlFor='jobTitle' className='form-label'>
                Job Title
              </label>
              <input type='text' className='form-control' id='jobTitle' required onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label htmlFor='jobDescription' className='form-label'>
                Job Description
              </label>
              <textarea className='form-control' id='jobDescription' rows='3' required onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label htmlFor='jobLocation' className='form-label'>
                Job Location
              </label>
              <input type='text' className='form-control' id='jobLocation' required onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label htmlFor='jobBenefits' className='form-label'>
                Job Benefits (comma-separated)
              </label>
              <input
                type='text'
                className='form-control'
                id='jobBenefits'
                placeholder='e.g., Remote Work, Health Insurance'
                onChange={handleChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='companyLogo' className='form-label'>
                Upload Logo
              </label>
              <input type='file' className='form-control' id='companyLogo' onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className='text-center'>
          <button type='' button className='btn btn-primary me-2' onClick={() => navigate('/EmployerLogin')}>
            Already created a post?
          </button>
          <button type='submit' className='btn btn-primary me-2'>
            Post Job
          </button>
          <button type='button' className='btn btn-secondary' onClick={() => navigate('/')}>
            Go back
          </button>
        </div>
      </form>
    </div>
  );
}
