import express from 'express';
import Job from '../models/Job.js';

const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  const jobs = await Job.find().sort({ date: -1 });
  res.json(jobs);
});

// Add a new job
router.post('/', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save job' });
  }
});

// Delete job
router.delete('/:id', async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: 'Job deleted' });
});

// Edit job
router.put('/:id', async (req, res) => {
  const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

export default router;
