import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function Seeker() {
  const navigate = useNavigate();
  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 7;

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
        const staticJobs = response.data;
      const localJobs = JSON.parse(localStorage.getItem('customJobs')) || [];
      const combinedJobs = [...localJobs, ...staticJobs];
      setJobs(combinedJobs);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      });
  }, []);

  // Filter logic
  const filteredJobs = jobs.filter((job) => {
    const jobTitle = job.jobTitle.toLowerCase();
    const jobLoc = job.jobLocation.toLowerCase();
    const salaryStr = job.salaryRange.replace(/[^0-9-]/g, '');
    const [min, max] = salaryStr.split('-').map(Number);

    const keywordMatch = !keyword || jobTitle.includes(keyword);
    const locationMatch = !locationFilter || jobLoc.includes(locationFilter);
    const salaryMatch = (!minSalary || max >= minSalary) && (!maxSalary || min <= maxSalary);

    return keywordMatch && locationMatch && salaryMatch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className='container mt-4'>
      <div className='d-flex justify-content-between align-items-center mb-4 position-relative'>
        <button className='btn btn-primary position-absolute start-0' onClick={() => navigate('/')}>
          Back
        </button>
        <h1 className='text-warning text-center w-100 m-0'>JobBoard</h1>
      </div>

      <div className='row'>
        {/* Job list */}
        <div className='col-md-5'>
          {Array.isArray(currentJobs) && currentJobs.length > 0 ? (
            currentJobs.map((job) => (
              <div key={job.id} className='card mb-3' style={{ cursor: 'pointer' }} onClick={() => setSelectedJob(job)}>
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

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className='d-flex justify-content-center mt-3 flex-wrap gap-2'>
              <button
                className='btn btn-outline-primary btn-sm'
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}>
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    className={`btn btn-sm ${page === currentPage ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setCurrentPage(page)}>
                    {page}
                  </button>
                );
              })}

              <button
                className='btn btn-outline-primary btn-sm'
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          )}
        </div>

        {/* Job details */}
        <div className='col-md-7'>
          {selectedJob ? (
            <div className='card'>
              <div className='card-body'>
                <div className='text-center mb-3'>
                  <img src={selectedJob.companyLogo} alt={selectedJob.jobTitle} className='img-fluid' />
                </div>
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

      <div className='mt-4 text-start'>
        <button className='btn btn-primary' onClick={() => navigate('/')}>
          back
        </button>
      </div>
    </div>
  );
}
