import { useEffect, useState } from 'react';

export function EmployerApply() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Simulate fetching from an API or local storage
    const dummyApplications = [
      {
        id: 1,
        applicantName: 'John Doe',
        jobTitle: 'Frontend Developer',
        email: 'john@example.com',
        resume: 'https://example.com/resume-john.pdf',
      },
      {
        id: 2,
        applicantName: 'Jane Smith',
        jobTitle: 'Backend Developer',
        email: 'jane@example.com',
        resume: 'https://example.com/resume-jane.pdf',
      },
    ];

    setApplications(dummyApplications);
  }, []);

  return (
    <div className='container mt-4'>
      <h2 className='text-center text-primary mb-4'>Applications Received</h2>
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
    </div>
  );
}
