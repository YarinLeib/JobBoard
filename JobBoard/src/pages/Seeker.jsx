import { useNavigate } from 'react-router-dom';
export function Seeker() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h1 className='text-warning text-center'>JobBoard </h1>
        <button className='btn btn-primary' onClick={() => navigate('/')}>
          Go back
        </button>
      </div>
    </>
  );
}
