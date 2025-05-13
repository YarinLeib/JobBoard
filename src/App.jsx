import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Seeker } from './pages/Seeker';
import { Employer } from './pages/Employer';
import { JobApplication } from './pages/JobApplication';
import { JobFilter } from './pages/JobFilter';
import { NotFound } from './pages/NotFound';
import { Footer } from './components/Footer';
import { EmployerApply } from './pages/EmployerApply';
import { EmployerLogin } from './pages/EmployerLogin';
import { EmployerOption } from './pages/EmployerOption';
import { EmployerEdit } from './pages/EmployerEdit';
import './App.css';

function App() {
  return (
    <Router>
      <div className='d-flex flex-column min-vh-100'>
        <main className='flex-grow-1'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/filter' element={<JobFilter />} />
            <Route path='/seeker' element={<Seeker />} />
            <Route path='/employer' element={<Employer />} />
            <Route path='/seeker/:id' element={<JobApplication />} />
            <Route path='/employerlogin' element={<EmployerLogin />} />
            <Route path='/company/:companyName' element={<EmployerOption />} />
            <Route path='/company/:companyName/applications' element={<EmployerApply />} />
            <Route path='/company/:companyName/posts' element={<EmployerEdit />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
