import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import axios from 'axios';

export function JobApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [job, setJob] = useState(null);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5005/jobs')
      .then((response) => {
        const jobs = response.data;
        const found = jobs.find((job) => job.id.toString() === id);
        setJob(found);
      })
      .catch((err) => console.error('Failed to fetch jobs:', err));
  }, [id]);

  const handleBack = () => {
    navigate(`/seeker${location.search}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const resumeFile = document.getElementById('resume').files[0];
    const coverLetter = document.getElementById('coverLetter').value.trim();

    if (!name || !email || !phone || !resumeFile) {
      alert('Please fill out all required fields.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const resumeBase64 = reader.result;

      const newApplication = {
        id: Date.now(),
        applicantName: name,
        email,
        phone,
        coverLetter,
        jobTitle: job.jobTitle,
        companyName: job.companyName,
        resume: resumeBase64,
      };

      fetch('http://localhost:5005/jobApplications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApplication),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Submission failed');
          return res.json();
        })
        .then(() => {
          alert('Application submitted successfully!');
          navigate(`/seeker`);
        })
        .catch((err) => {
          console.error(err);
          alert('Something went wrong while submitting.');
        });
    };

    reader.readAsDataURL(resumeFile);
  };

  if (!job) {
    return (
      <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: '60vh' }}>
        <div className='spinner-grow text-primary mb-3' role='status' />
        <h5 className='text-muted'>Loading job details, please wait...</h5>
      </div>
    );
  }

  return (
    <div className='container mt-4 text-center'>
      <h1 className='text-primary mb-4'>Job Application</h1>
      <div className='mb-3'>
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
        <strong>Job Skills:</strong> {job.jobSkills?.join(', ')}
      </p>
      <p>
        <strong>Job Benefits:</strong> {job.jobBenefits?.join(', ')}
      </p>
      <p>
        <strong>Posted on:</strong> {new Date(job.jobPostedDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Application Deadline:</strong> {new Date(job.jobExpiryDate).toLocaleDateString()}
      </p>

      <form onSubmit={handleSubmit} className='mt-4'>
        <div className='mb-3'>
          <label htmlFor='coverLetter' className='form-label'>
            Cover Letter
          </label>
          <textarea className='form-control' id='coverLetter' rows='4'></textarea>
        </div>
        <div className='mb-3'>
          <label htmlFor='resume' className='form-label'>
            Upload Resume<span className='text-danger'>*</span>
          </label>
          <input type='file' className='form-control' id='resume' />
        </div>
        <div className='mb-3'>
          Name<span className='text-danger'>*</span>
          <input type='text' className='form-control' placeholder='name' id='name' />
        </div>
        <div className='mb-3'>
          <label htmlFor='phone' className='form-label'>
            Phone Number<span className='text-danger'>*</span>
          </label>
          <div className='d-flex justify-content-center'>
            <PhoneInput
              country={'us'}
              enableSearch={true}
              inputClass='form-control'
              containerStyle={{ maxWidth: '300px' }}
              inputProps={{
                name: 'phone',
                required: true,
                id: 'phone',
              }}
              value={phone}
              onChange={setPhone}
            />
          </div>
        </div>
        <div className='mb-3'>
          Email <span className='text-danger'>*</span>
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
