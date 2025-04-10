import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await axios.get(API_URL);
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobForm onAdd={fetchJobs} />} />
        <Route path="/jobs" element={<JobList jobs={jobs} onUpdate={fetchJobs} />} />
      </Routes>
    </Router>
  );
}

export default App;



