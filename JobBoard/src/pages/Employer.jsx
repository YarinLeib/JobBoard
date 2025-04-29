import { useNavigate } from 'react-router-dom';
export function Employer() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  return (
    <div className='container mt-4'>
      <h1 className='text-primary text-center'>Employer</h1>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-md-6'>
            <div className='mb-3'>
              <label htmlFor='companyName' className='form-label'>
                Company Name
              </label>
              <input type='text' className='form-control' id='companyName' required />
            </div>
            <div className='mb-3'>
              <label htmlFor='requirements' className='form-label'>
                Job Requirements
              </label>
              <textarea className='form-control' id='requirements' rows='3' required />
            </div>
            <div className='mb-3'>
              <label htmlFor='salary' className='form-label'>
                Salary Range
              </label>
              <input type='text' className='form-control' id='salary' required></input>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='mb-3'>
              <label htmlFor='jobTitle' className='form-label'>
                Job Title
              </label>
              <input type='text' className='form-control' id='jobTitle' required></input>
            </div>
            <div className='mb-3'>
              <label htmlFor='jobDescription' className='form-label'>
                Job Description
              </label>
              <textarea className='form-control' id='jobDescription' rows='3' required />
            </div>
            <div className='mb-3'>
              <label htmlFor='jobLocation' className='form-label'>
                Job Location
              </label>
              <input type='text' className='form-control' id='jobLocation' required />
            </div>
          </div>
        </div>
        <div className='text-center'>
          <button type='submit' className='btn btn-primary me-2'>
            Post Job
          </button>
          <button type='button' className='btn btn-secondary' onClick={() => navigate('/')}>
            Go back
          </button>
        </div>
      </form>
    </div>
  );
}
