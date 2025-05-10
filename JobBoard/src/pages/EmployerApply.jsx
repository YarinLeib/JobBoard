import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export function EmployerApply() {
  const [applications, setApplications] = useState([]);
  const { companyName } = useParams();

  useEffect(() => {
    axios
      .get('https://json-server-backend-jobboard.onrender.com/jobApplications')
      .then((response) => {
        const allApps = response.data;
        const filtered = allApps.filter((app) => app.companyName?.toLowerCase() === companyName.toLowerCase());
        setApplications(filtered);
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
      });
  }, [companyName]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      axios
        .delete(`https://json-server-backend-jobboard.onrender.com/jobApplications/${id}`)
        .then(() => {
          setApplications(applications.filter((app) => app.id !== id));
          alert('Application deleted!');
        })
        .catch((error) => {
          console.error('Error deleting application:', error);
          alert('Failed to delete application.');
        });
    }
  };

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
                <button className='btn btn-sm btn-danger ms-2' onClick={() => handleDelete(app.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className='btn btn-secondary mt-4' onClick={() => window.history.back()}>
        Back to Login Page
      </div>
    </div>
  );
}
