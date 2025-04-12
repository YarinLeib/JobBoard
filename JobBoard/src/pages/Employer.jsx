import { useNavigate } from 'react-router-dom';
export function Employer() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1 className='text-primary text-center'>Employer</h1>
        <button className='btn btn-primary' onClick={() => navigate('/')}>
          Go back
        </button>
      </div>
    </>
  );
}
