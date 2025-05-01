import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Seeker } from './pages/Seeker';
import { Employer } from './pages/Employer';
import { JobFilter } from './pages/JobFilter'; // 👈 Import it
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/filter' element={<JobFilter />} /> {/* 👈 Add this */}
        <Route path='/seeker' element={<Seeker />} />
        <Route path='/employer' element={<Employer />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

