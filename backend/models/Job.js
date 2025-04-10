import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  company: String,
  position: String,
  date: Date,
  link: String,
  status: {
    type: String,
    enum: ['applied', 'interview', 'offer', 'rejected'],
    default: 'applied',
  }
});

export default mongoose.model('Job', jobSchema);
