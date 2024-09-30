import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Dashboard from './components/Dashboard';
import UploadCSV from './components/UploadCSV';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UploadCSV />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
