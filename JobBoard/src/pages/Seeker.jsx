import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function Seeker() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  useEffect(() => {
    axios
      .get('/jobs.json')
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      });
  }, []);

  return (
    <div className='container mt-4'>
      <h1 className='text-warning text-center mb-4'>JobBoard</h1>

      <div className='row'>
        <div className='col-md-5'>
          {Array.isArray(jobs) &&
            jobs.map((job) => (
              <div
                key={job.id}
                className='card mb-3'
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSelectedJob(job);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}>
                <div className='card-body'>
                  <h5 className='card-title'>{job.jobTitle}</h5>
                  <h6 className='card-subtitle mb-2 text-muted'>{job.companyName}</h6>
                  <p className='card-text'>
                    <strong>Location:</strong> {job.jobLocation}
                  </p>
                </div>
              </div>
            ))}
        </div>

        <div className='col-md-7'>
          {selectedJob ? (
            <div className='card'>
              <div className='card-body'>
                <h3 className='card-title'>{selectedJob.jobTitle}</h3>
                <h5 className='card-subtitle mb-3 text-muted'>{selectedJob.companyName}</h5>
                <p className='card-text'>{selectedJob.jobDescription}</p>
                <p>
                  <strong>Requirements:</strong> {selectedJob.jobRequirements}
                </p>
                <p>
                  <strong>Location:</strong> {selectedJob.jobLocation}
                </p>
                <p>
                  <strong>Salary:</strong> {selectedJob.salaryRange}
                </p>
                <button className='btn btn-success'>Apply Now</button>
              </div>
            </div>
          ) : (
            <div className='text-center text-muted'>
              <p>Select a job to view details</p>
            </div>
          )}
        </div>
      </div>

      <div className='text-center mt-4'>
        <button className='btn btn-primary' onClick={() => navigate('/')}>
          Go back
        </button>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className='btn btn-primary'
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        }}>
        ↑ Top
      </button>
    </div>
  );
}
