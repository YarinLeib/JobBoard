import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className='d-flex flex-column align-items-center justify-content-center text-center'
        style={{ height: '70vh' }}>
        <h2 className='display-3 fw-bold mb-4'>Welcome</h2>
        <p className='fs-4 mb-5'>Welcome to the JobBoard application!</p>
        <h3 className='display-6 mb-4'>Are you a...</h3>
        <div className='d-flex gap-3'>
          <button className='btn btn-primary btn-lg' onClick={() => navigate('/employer')}>
            Employer
          </button>
          <button className='btn btn-warning btn-lg' onClick={() => navigate('/filter')}>
            Job Seeker
          </button>
        </div>
      </div>
    </div>
  );
}
