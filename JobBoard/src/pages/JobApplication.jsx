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
  const [phone, setPhone] = useState('');

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

      const combinedJobs = [...localJobs, ...staticJobs];

      const found = combinedJobs.find((job) => {
        const jobId = job.id?.toString() || job.jobTitle;
        return jobId === id;
      });

      setJob(found);
    });
  }, [id]);

  if (!job) {
    return (
      <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: '60vh' }}>
        <div className='spinner-grow text-primary mb-3' role='status' />
        <h5 className='text-muted'>Loading job details, please wait...</h5>
      </div>
    );
  }

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

      const existingApplications = JSON.parse(localStorage.getItem('jobApplications')) || [];
      existingApplications.push(newApplication);
      localStorage.setItem('jobApplications', JSON.stringify(existingApplications));
      alert('Application submitted successfully!');
      navigate(`/seeker`);
    };

    reader.readAsDataURL(resumeFile);
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

      <form onSubmit={handleSubmit} className='mt-4 position-relative' style={{ overflow: 'visible' }}>
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
