import { useNavigate, useParams } from 'react-router-dom';

export function EmployerOption() {
  const navigate = useNavigate();
  const { companyName } = useParams();

  const handleViewApplications = () => {
    navigate(`/company/${encodeURIComponent(companyName)}/applications`);
  };

  const handleEditPosts = () => {
    navigate(`/company/${encodeURIComponent(companyName)}/posts`);
  };

  return (
    <div className='container mt-5 text-center'>
      <h2 className='text-primary mb-4'>Welcome, {companyName}</h2>
      <div className='d-flex justify-content-center gap-3'>
        <button className='btn btn-outline-primary' onClick={handleEditPosts}>
          Edit Your Job Posts
        </button>
        <button className='btn btn-outline-success' onClick={handleViewApplications}>
          View Applications
        </button>
      </div>
      <div className='mt-4'>
        <button className='btn btn-secondary' onClick={() => navigate('/EmployerLogin')}>
          Logout
        </button>
      </div>
    </div>
  );
}
