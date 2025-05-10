import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function EmployerEdit() {
  const { companyName } = useParams();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5005/jobs').then((res) => {
      const allJobs = res.data;
      const filtered = allJobs.filter((job) => job.companyName.toLowerCase() === companyName.toLowerCase());
      setJobs(filtered);
    });
  }, [companyName]);

  const handleChange = (index, field, value) => {
    const updated = [...jobs];
    updated[index][field] = value;
    setJobs(updated);
  };

  const handleArrayChange = (index, field, value) => {
    const updated = [...jobs];
    updated[index][field] = value.split(',').map((item) => item.trim());
    setJobs(updated);
  };

  const handleSave = (job) => {
    axios
      .put(`http://localhost:5005/jobs/${job.id}`, job)
      .then(() => alert('Job updated!'))
      .catch(() => alert('Failed to update.'));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      axios
        .delete(`http://localhost:5005/jobs/${id}`)
        .then(() => {
          setJobs(jobs.filter((job) => job.id !== id));
          alert('Job deleted!');
        })
        .catch(() => alert('Failed to delete.'));
    }
  };

  return (
    <div className='container mt-4'>
      <h2 className='text-center text-primary mb-4'>Edit Jobs for {companyName}</h2>

      {jobs.length === 0 ? (
        <p className='text-center'>No jobs found for this company.</p>
      ) : (
        jobs.map((job, index) => (
          <div key={job.id} className='card p-4 mb-4 shadow-sm'>
            <input
              className='form-control mb-2'
              value={job.jobTitle}
              onChange={(e) => handleChange(index, 'jobTitle', e.target.value)}
              placeholder='Job Title'
            />
            <textarea
              className='form-control mb-2'
              value={job.jobDescription}
              onChange={(e) => handleChange(index, 'jobDescription', e.target.value)}
              placeholder='Description'
            />
            <textarea
              className='form-control mb-2'
              value={job.jobRequirements}
              onChange={(e) => handleChange(index, 'jobRequirements', e.target.value)}
              placeholder='Requirements'
            />
            <input
              className='form-control mb-2'
              value={job.salaryRange}
              onChange={(e) => handleChange(index, 'salaryRange', e.target.value)}
              placeholder='Salary Range'
            />
            <input
              className='form-control mb-2'
              value={job.jobLocation}
              onChange={(e) => handleChange(index, 'jobLocation', e.target.value)}
              placeholder='Job Location'
            />
            <select
              className='form-select mb-2'
              value={job.jobType}
              onChange={(e) => handleChange(index, 'jobType', e.target.value)}>
              <option value='Full-time'>Full-time</option>
              <option value='Part-time'>Part-time</option>
              <option value='Internship'>Internship</option>
              <option value='Contract'>Contract</option>
            </select>
            <input
              className='form-control mb-2'
              value={job.jobSkills?.join(', ')}
              onChange={(e) => handleArrayChange(index, 'jobSkills', e.target.value)}
              placeholder='Skills (comma separated)'
            />
            <input
              className='form-control mb-2'
              value={job.jobBenefits?.join(', ')}
              onChange={(e) => handleArrayChange(index, 'jobBenefits', e.target.value)}
              placeholder='Benefits (comma separated)'
            />
            <input
              className='form-control mb-2'
              value={job.companyLogo}
              onChange={(e) => handleChange(index, 'companyLogo', e.target.value)}
              placeholder='Logo URL'
            />
            <input
              className='form-control mb-2'
              value={job.jobPostedDate}
              onChange={(e) => handleChange(index, 'jobPostedDate', e.target.value)}
              type='date'
            />
            <input
              className='form-control mb-3'
              value={job.jobExpiryDate}
              onChange={(e) => handleChange(index, 'jobExpiryDate', e.target.value)}
              type='date'
            />
            <button className='btn btn-success me-2' onClick={() => handleSave(job)}>
              Save Changes
            </button>
            <button className='btn btn-danger' onClick={() => handleDelete(job.id)}>
              Delete Job
            </button>
            <button className='btn btn-outline-secondary' onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        ))
      )}
    </div>
  );
}
