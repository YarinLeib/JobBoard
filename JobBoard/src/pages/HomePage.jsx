export function HomePage() {
  return (
    <div>
       <div className="p-3 mb-4 bg-secondary d-flex align-items-center justify-content-between">
    <h1 className="text-warning text-center m-0 flex-grow-1">JobBoard</h1>
    <img
      src="/public/logo.png"
      alt="Logo"
      style={{ height: "40px", width: "40px", objectFit: "contain" }}
    />
      </div>
      <div>
        <h2>Welcome</h2>
        <p>Welcome to the JobBoard application!</p>
        <h2>Are you a</h2>
        <h3>Employer</h3>
        <h3>Job Seeker</h3>
      </div>
    </div>
  );
}
