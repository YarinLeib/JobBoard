import { Link, NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className='bg-dark text-light shadow-sm py-3'>
      <div className='container-fluid d-flex align-items-center justify-content-between position-relative px-4'>
        <div className='position-absolute top-50 start-50 translate-middle d-flex align-items-center text-warning text-decoration-none'>
          <Link to='/' className='d-flex align-items-center text-warning text-decoration-none'>
            <img src='/logo.png' alt='Logo' style={{ width: '45px', height: 'auto' }} />
            <span className='fs-1 fw-bold ms-2'>JobBoard</span>
          </Link>
        </div>

        <ul className='nav gap-4 ms-auto me-3'>
          <li className='nav-item'>
            <NavLink
              to='/'
              className={({ isActive }) => `nav-link ${isActive ? 'text-warning fw-semibold' : 'text-light'}`}>
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              to='/employer'
              className={({ isActive }) => `nav-link ${isActive ? 'text-warning fw-semibold' : 'text-light'}`}>
              Employer
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              to='/filter'
              className={({ isActive }) => `nav-link ${isActive ? 'text-warning fw-semibold' : 'text-light'}`}>
              Job Seeker
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
