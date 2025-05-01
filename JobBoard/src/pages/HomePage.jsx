import { useNavigate } from 'react-router-dom';
export function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <div className='p-3 mb-4 bg-secondary d-flex align-items-center justify-content-between'>
        <h1 className='text-warning text-center m-0 flex-grow-1'>JobBoard</h1>
        <img style={{ width: '55px', height: 'auto' }} src='/public/logo.png' />
      </div>
      <div>
        <h2>Welcome</h2>
        <p>Welcome to the JobBoard application!</p>
        <h2>Are you a</h2>
        <button onClick={() => navigate('/employer')}>Employer</button>
        <button onClick={() => navigate('/filter')}>Job Seeker</button>
      </div>
    </div>
  );
}
