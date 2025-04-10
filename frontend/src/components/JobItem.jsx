import React from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const JobItem = ({ job, onUpdate, onDelete }) => {
  const updateStatus = async (newStatus) => {
    await axios.put(`${API_URL}/${job._id}`, { ...job, status: newStatus });
    onUpdate();
  };

  const deleteJob = async () => {
    await axios.delete(`${API_URL}/${job._id}`);
    onDelete();
  };

  return (
    <div style={{ border: '1px solid gray', marginBottom: '10px', padding: '10px' }}>
      <h3>{job.company} - {job.role}</h3>
      <p>Status: {job.status}</p>
      <p>Date: {new Date(job.date).toLocaleDateString()}</p>
      <a href={job.link} target="_blank" rel="noreferrer">Link</a>
      <br />
      <select value={job.status} onChange={e => updateStatus(e.target.value)}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <button onClick={deleteJob}>Delete</button>
    </div>
  );
};

export default JobItem;
