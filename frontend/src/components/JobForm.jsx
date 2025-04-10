import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBriefcase, FaChartLine, FaUser, FaSignOutAlt, FaHome, FaPlus, FaList } from 'react-icons/fa';
import JobList from './JobList';
import './Dashboard.css';

const API_URL = import.meta.env.VITE_API_URL;

// JobForm Component
function JobForm({ onAdd }) {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    date: '',
    link: '',
    status: 'applied',
  });
  const [showDuplicatePopup, setShowDuplicatePopup] = useState(false);
  const [existingJobs, setExistingJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(API_URL);
        setExistingJobs(response.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
    };
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isDuplicate = () => {
    return existingJobs.some(job => 
      job.company.toLowerCase() === formData.company.toLowerCase() && 
      job.position.toLowerCase() === formData.position.toLowerCase() &&
      job.link.toLowerCase() === formData.link.toLowerCase()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isDuplicate()) {
      setShowDuplicatePopup(true);
      return;
    }

    try {
      await axios.post(API_URL, formData);
      onAdd();
      setFormData({ company: '', position: '', date: '', link: '', status: 'applied' });
      navigate('/jobs');
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to add job. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Job Application</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label htmlFor="company">Company Name</label>
          <input 
            type="text" 
            id="company"
            name="company" 
            placeholder="Enter company name" 
            value={formData.company} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input 
            type="text" 
            id="position"
            name="position" 
            placeholder="Enter position" 
            value={formData.position} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="date">Application Date</label>
          <input 
            type="date" 
            id="date"
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="link">Job Link</label>
          <input 
            type="url" 
            id="link"
            name="link" 
            placeholder="Enter job posting URL" 
            value={formData.link} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select 
            id="status"
            name="status" 
            value={formData.status} 
            onChange={handleChange}
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        <button type="submit" className="submit-btn">
          <FaPlus /> Add Job
        </button>
      </form>

      {showDuplicatePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Duplicate Job Detected</h3>
            <p>This job application already exists in your tracker.</p>
            <button 
              onClick={() => setShowDuplicatePopup(false)}
              className="popup-close-btn"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Dashboard Component
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [jobs, setJobs] = useState([]);
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(API_URL);
        setJobs(response.data);
      } catch (err) {
        console.error('Error:', err);
        alert('Failed to fetch jobs.');
      }
    };
    
    if (activeTab === 'all-jobs' || activeTab === 'dashboard') {
      fetchJobs();
    }
  }, [activeTab]);

  const handleAddJob = () => {
    console.log('Job added successfully');
    setActiveTab('all-jobs');
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <FaBriefcase className="brand-icon" />
          <span>JobTracker Pro</span>
        </div>
        <div className="navbar-user">
          <FaUser className="user-icon" />
          <span>Welcome, User</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul className="nav-menu">
            <li 
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveTab('dashboard')}
            >
              <FaHome className="menu-icon" />
              <span>Dashboard</span>
            </li>
            <li 
              className={activeTab === 'add-job' ? 'active' : ''}
              onClick={() => setActiveTab('add-job')}
            >
              <FaPlus className="menu-icon" />
              <span>Add Job</span>
            </li>
            <li 
              className={activeTab === 'all-jobs' ? 'active' : ''}
              onClick={() => setActiveTab('all-jobs')}
            >
              <FaList className="menu-icon" />
              <span>All Jobs</span>
            </li>
            <li 
              className={activeTab === 'analytics' ? 'active' : ''}
              onClick={() => setActiveTab('analytics')}
            >
              <FaChartLine className="menu-icon" />
              <span>Analytics</span>
            </li>
          </ul>
          
          <div className="logout-section">
            <FaSignOutAlt className="logout-icon" />
            <span>Logout</span>
          </div>
        </aside>

        {/* Content Area */}
        <main className="content-area">
          {activeTab === 'add-job' && <JobForm onAdd={handleAddJob} />}
          {activeTab === 'all-jobs' && <JobList jobs={jobs} />}
          {activeTab === 'dashboard' && (
            <div className="dashboard-welcome">
              <h2>Welcome to JobTracker Pro</h2>
              <p>Track all your job applications in one place and stay organized in your job search.</p>
              <div className="quick-stats">
                <h3>Your Job Applications</h3>
                <div className="stats-grid">
                  <div className="stat-card">
                    <span className="stat-number">{jobs.length}</span>
                    <span className="stat-label">Total Applications</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">
                      {jobs.filter(job => job.status === 'interview').length}
                    </span>
                    <span className="stat-label">Interviews</span>
                  </div>


                  <div className="stat-card">
                    <span className="stat-number">
                      {jobs.filter(job => job.status === 'offer').length}
                    </span>
                    <span className="stat-label">Offers</span>
                  </div>
                    
                  <div className="stat-card">
                    <span className="stat-number">
                      {jobs.filter(job => job.status === 'Applied').length}
                    </span>
                    <span className="stat-label">Applied</span>
                  </div>

                  <div className="stat-card">
                    <span className="stat-number">
                      {jobs.filter(job => job.status === 'Rejected').length}
                    </span>
                    <span className="stat-label">Rejected</span>
                  </div>
  


                </div>
                <button 
                  onClick={() => setActiveTab('all-jobs')}
                  className="view-all-btn"
                >
                  View All Jobs
                </button>
              </div>
            </div>
          )}
          {activeTab === 'analytics' && (
            <div className="analytics-section">
              <h2>Application Analytics</h2>
              <p>Visual data about your job applications will appear here.</p>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} JobTracker Pro. All rights reserved.</p>
          <div className="footer-links">
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of Service</a>
            <a href="/">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;