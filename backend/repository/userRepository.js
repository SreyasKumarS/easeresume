import User from '../models/userModel.js';
import Resume from '../models/resumeModel.js'
export class UserRepository {
  static async findByEmail(email) {
      try {
          return await User.findOne({ email });
      } catch (error) {
          console.error('Error finding user by email:', error.message);
          throw new Error('Database query failed');
      }
  }

  static async save(user) {
      try {
          const newUser = new User(user);
          return await newUser.save();
      } catch (error) {
          console.error('Error saving user:', error.message);
          throw new Error('Failed to save user to database');
      }
  }

  static async update(user) {
      try {
          return await User.findByIdAndUpdate(user._id, user, { new: true });
      } catch (error) {
          console.error('Error updating user:', error.message);
          throw new Error('Failed to update user');
      }
  }

  static async createResume(data) {
    const resume = new Resume(data);
    return await resume.save();
  }

  static async getResumesByUser(userId) {
    return await Resume.find({ user: userId }).sort({ createdAt: -1 });
  }

  static async editResumeById(resumeId, updatedData){
      const updatedResume = await Resume.findByIdAndUpdate(resumeId, updatedData, {
        new: true, // return the updated doc
        runValidators: true,
      });
      return updatedResume;
    }

    static async deleteResume(resumeId) {
        const deletedResume = await Resume.findByIdAndDelete(resumeId);
        return deletedResume;
      }
      

}