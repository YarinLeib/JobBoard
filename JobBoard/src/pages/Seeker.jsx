import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function Seeker() {
  const navigate = useNavigate();
  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  // Get filters from URL
  const params = new URLSearchParams(location.search);
  const keyword = params.get('keywords')?.toLowerCase();
  const locationFilter = params.get('location')?.toLowerCase();
  const minSalary = parseInt(params.get('minSalary'));
  const maxSalary = parseInt(params.get('maxSalary'));

  // Fetch jobs
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

  // Filter logic
  const filteredJobs = jobs.filter((job) => {
    const jobTitle = job.jobTitle.toLowerCase();
    const jobLoc = job.jobLocation.toLowerCase();
    const salaryStr = job.salaryRange.replace(/[^0-9-]/g, ''); // remove commas and symbols
    const [min, max] = salaryStr.split('-').map(Number); // convert to numbers

    const keywordMatch = !keyword || jobTitle.includes(keyword);
    const locationMatch = !locationFilter || jobLoc.includes(locationFilter);
    const salaryMatch = (!minSalary || max >= minSalary) && (!maxSalary || min <= maxSalary);

    return keywordMatch && locationMatch && salaryMatch;
  });

  return (
    <div className='container mt-4'>
      <h1 className='text-warning text-center mb-4'>JobBoard</h1>

      <div className='row'>
        {/* Job list */}
        <div className='col-md-5'>
          {Array.isArray(filteredJobs) && filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
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
            ))
          ) : (
            <p className='text-muted'>No jobs match your filters.</p>
          )}
        </div>

        {/* Job details */}
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
                <button
                  className='btn btn-success'
                  onClick={() => navigate(`/Seeker/${selectedJob.id}${location.search}`)}>
                  Apply Now
                </button>
              </div>
            </div>
          ) : (
            <div className='text-center text-muted'>
              <p>Select a job to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className='text-center mt-4'>
        <button className='btn btn-primary' onClick={() => navigate('/')}>
          Go back
        </button>
      </div>

      {/* Scroll to top button */}
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
