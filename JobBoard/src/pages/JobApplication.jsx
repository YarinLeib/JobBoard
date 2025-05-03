import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import axios from 'axios';

export function JobApplication() {
  const { id } = useParams();
  const location = useLocation();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/jobs.json').then((response) => {
      const found = response.data.find((job) => job.id.toString() === id);
      setJob(found);
    });
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    navigate(`/seeker${location.search}`);
  };

  return (
    <div className='container mt-4 text-center'>
      <h1 className='text-primary text-center mb-4'>Job Application</h1>
      <div className='text-center mb-3'>
        <img src={job.companyLogo} alt={job.jobTitle} className='img-fluid' />
      </div>
      <p>
        <strong>Company:</strong> {job.companyName}
      </p>
      <p>
        <strong>Job Title:</strong> {job.jobTitle}
      </p>
      <p>
        <strong>Description:</strong> {job.jobDescription}
      </p>
      <p>
        <strong>Job Type:</strong> {job.jobType}
      </p>
      <p>
        <strong>Location:</strong> {job.jobLocation}
      </p>
      <p>
        <strong>Salary:</strong> {job.salaryRange}
      </p>
      <p>
        <strong>Requirements:</strong> {job.jobRequirements}
      </p>
      <p>
        <strong>Job Skills:</strong> {job.jobSkills.join(', ')}
      </p>
      <p>
        <strong>Job Benefits:</strong> {job.jobBenefits.join(', ')}
      </p>
      <p>
        <strong>Posted on:</strong> {new Date(job.jobPostedDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Application Deadline:</strong> {new Date(job.jobExpiryDate).toLocaleDateString()}
      </p>

      <form className='mt-4 position-relative' style={{ overflow: 'visible' }}>
        <div className='mb-3'>
          <label htmlFor='coverLetter' className='form-label'>
            Cover Letter
          </label>
          <textarea className='form-control' id='coverLetter' rows='4'></textarea>
        </div>
        <div className='mb-3'>
          <label htmlFor='resume' className='form-label'>
            Upload Resume
          </label>
          <input type='file' className='form-control' id='resume' />
        </div>
        <div className='mb-3'>
          <input type='text' className='form-control' placeholder='name' id='name' />
        </div>
        <div className='mb-3'>
          <label htmlFor='phone' className='form-label'>
            Phone Number
          </label>
          <div className='d-flex justify-content-center'>
            <PhoneInput
              country={'us'}
              enableSearch={true}
              inputClass='form-control'
              containerStyle={{ zIndex: 1000, width: '100%', maxWidth: '400px' }}
              inputProps={{
                name: 'phone',
                required: true,
                id: 'phone',
              }}
            />
          </div>
        </div>
        <div className='mb-3'>
          <input type='email' className='form-control' placeholder='email' id='email' />
        </div>

        <div className='d-flex gap-2 mt-3'>
          <button type='submit' className='btn btn-success'>
            Submit Application
          </button>
          <button type='button' className='btn btn-primary' onClick={handleBack}>
            Back to Job Listings
          </button>
        </div>
      </form>
    </div>
  );
}
