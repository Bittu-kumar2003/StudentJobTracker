import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './JobList.css'; // Create this CSS file for additional styling

const API_URL = import.meta.env.VITE_API_URL;

function JobList({ jobs, onUpdate }) {
  const [editingJob, setEditingJob] = useState(null);
  const [editForm, setEditForm] = useState({
    company: '',
    position: '',
    date: '',
    link: '',
    status: '',
  });
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this job?');
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert('Job deleted successfully!');
        onUpdate();
      } catch (err) {
        alert('Failed to delete job');
        console.error(err);
      }
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job._id);
    setEditForm({
      company: job.company,
      position: job.position,
      date: job.date.split('T')[0],
      link: job.link,
      status: job.status,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`${API_URL}/${editingJob}`, editForm);
      alert('Job updated successfully!');
      setEditingJob(null);
      setEditForm({});
      onUpdate();
    } catch (err) {
      alert('Failed to update job');
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'applied':
        return '#4a90e2'; // Blue
      case 'interview':
        return '#f5a623'; // Orange
      case 'offer':
        return '#7ed321'; // Green
      case 'rejected':
        return '#d0021b'; // Red
      default:
        return '#9b9b9b'; // Gray
    }
  };

  return (
    <div className="job-list-container">
      {/* Navbar */}
      <nav className="job-list-nav">
        <button onClick={() => navigate(-1)} className="back-button">
          &larr; Back
        </button>
        <h1>Job Applications</h1>
        <div className="nav-spacer"></div> {/* For alignment */}
      </nav>

      {/* Main Content */}
      <main className="job-list-main">
        {jobs.length === 0 ? (
          <div className="no-jobs-message">
            <p>No jobs found. Add a new job application to get started!</p>
          </div>
        ) : (
          jobs.map((job) =>
            editingJob === job._id ? (
              <div key={job._id} className="job-card edit-mode">
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={editForm.company}
                    onChange={handleEditChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    name="position"
                    value={editForm.position}
                    onChange={handleEditChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={editForm.date}
                    onChange={handleEditChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Job Link</label>
                  <input
                    type="url"
                    name="link"
                    value={editForm.link}
                    onChange={handleEditChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
                    className="form-select"
                  >
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="button-group">
                  <button onClick={handleEditSave} className="save-button">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="cancel-button">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div key={job._id} className="job-card">
                <div className="job-header">
                  <h3 className="job-title">
                    {job.position} at <span className="company-name">{job.company}</span>
                  </h3>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(job.status) }}
                  >
                    {job.status}
                  </span>
                </div>
                <div className="job-details">
                  <p className="job-date">
                    <span className="detail-label">Applied:</span>{' '}
                    {new Date(job.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="job-link">
                    <span className="detail-label">Link:</span>{' '}
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noreferrer"
                      className="link-button"
                    >
                      View Job Posting
                    </a>
                  </p>
                </div>
                <div className="job-actions">
                  <button onClick={() => handleEdit(job)} className="edit-button">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(job._id)} className="delete-button">
                    Delete
                  </button>
                </div>
              </div>
            )
          )
        )}
      </main>

      {/* Footer */}
      <footer className="job-list-footer">
        <p>© {new Date().getFullYear()} Job Application Tracker</p>
      </footer>
    </div>
  );
}

export default JobList;