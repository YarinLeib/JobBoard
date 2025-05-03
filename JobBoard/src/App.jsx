import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Seeker } from './pages/Seeker';
import { Employer } from './pages/Employer';
import { JobApplication } from './pages/JobApplication';
import { JobFilter } from './pages/JobFilter';
import { NotFound } from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/filter' element={<JobFilter />} /> {/* 👈 Add this */}
        <Route path='/seeker' element={<Seeker />} />
        <Route path='/employer' element={<Employer />} />
        <Route path='/seeker/:id' element={<JobApplication />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
