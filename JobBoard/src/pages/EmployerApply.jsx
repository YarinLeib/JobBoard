import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function EmployerApply() {
  const [applications, setApplications] = useState([]);
  const { companyName } = useParams();

  useEffect(() => {
    const storedApplications = JSON.parse(localStorage.getItem('jobApplications')) || [];

    const filtered = storedApplications.filter((app) => app.companyName?.toLowerCase() === companyName.toLowerCase());

    setApplications(filtered);
  }, [companyName]);

  return (
    <div className='container mt-4'>
      <h2 className='text-center text-primary mb-2'>Applications Received</h2>
      <h5 className='text-center text-muted mb-4'>For: {companyName}</h5>

      {applications.length === 0 ? (
        <p className='text-center'>No applications yet.</p>
      ) : (
        <div className='row'>
          {applications.map((app) => (
            <div key={app.id} className='col-md-6 mb-3'>
              <div className='card shadow p-3'>
                <h5>{app.applicantName}</h5>
                <p>
                  <strong>Applied for:</strong> {app.jobTitle}
                </p>
                <p>
                  <strong>Email:</strong> {app.email}
                </p>
                <a
                  href={app.resume}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-sm btn-outline-primary'>
                  View Resume
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className='btn btn-secondary mt-4' onClick={() => window.history.back()}>
        Back to Company Page
      </div>
    </div>
  );
}
