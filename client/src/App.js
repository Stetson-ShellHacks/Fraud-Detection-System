import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Dashboard from './components/Dashboard';
import FileUpload from './components/UploadCSV';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FileUpload />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
