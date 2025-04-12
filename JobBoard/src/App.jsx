import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Seeker } from './pages/Seeker';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/seeker' element={<Seeker />} />
      </Routes>
    </Router>
  );
}

export default App;
