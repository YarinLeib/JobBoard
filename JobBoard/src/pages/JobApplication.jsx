import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function JobApplication() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios.get('/jobs.json').then((response) => {
      const found = response.data.find((job) => job.id.toString() === id);
      setJob(found);
    });
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mt-4'>
      <h2 className='text-primary text-center mb-4'>Apply for: {job.jobTitle}</h2>
      <p>
        <strong>Company:</strong> {job.companyName}
      </p>
      <p>
        <strong>Description:</strong> {job.jobDescription}
      </p>
    </div>
  );
}
