import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  jobTitle:String,
  fullName: String,
  email: String,
  phone: String,
  summary: String,
  skills: [String],
  experience: [
    {
      role: String,
      company: String,
      duration: String,
      description: String
    }
  ],
  education: [
    {
      degree: String,
      institution: String,
      year: String
    }
  ],
  achievements: [String],
  certifications: [String], 
  links: {
    linkedin: String,
    portfolio: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

export default mongoose.model('Resume', resumeSchema);
