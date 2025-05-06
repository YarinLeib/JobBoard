export function EmployerLogin() {
  return (
    <div
      className='d-flex justify-content-center align-items-center bg-light'
      style={{ minHeight: 'calc(100vh - 85px)' }}>
      <div className='card shadow-lg p-4' style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className='mb-4 text-center'>Employer Login</h2>
        <form>
          <div className='mb-3'>
            <label className='form-label'>Company Name</label>
            <input type='text' className='form-control' required />
          </div>
          <button type='submit' className='btn btn-primary w-100'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
