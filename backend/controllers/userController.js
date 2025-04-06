import { UserService } from '../services/userService.js';

export class UserController {
  async register(req, res) {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
          return res.status(400).json({ message: 'All fields are required' });
      }

      try {
          const message = await UserService.registerUser({ name, email, password });
          res.status(201).json({ message });
      } catch (error) {
          console.error('Error registering user');
          res.status(400).json({ message: error.message });
      }
  }

  async verifyOtp(req, res) {
      const { email, otp } = req.body;

      if (!email || !otp) {
          return res.status(400).json({ message: 'Email and OTP are required' });
      }

      try {
          const message = await UserService.verifyOtp(email, otp);
          res.status(200).json({ message });
      } catch (error) {
          console.error('Error verifying OTP');
          res.status(400).json({ message: error.message });
      }
  }

  async resendOtp(req, res) {
      const { email } = req.body;

      if (!email) {
          return res.status(400).json({ message: 'Email is required' });
      }

      try {
          const message = await UserService.resendOtp(email);
          res.status(200).json({ message });
      } catch (error) {
          console.error('Error resending OTP');
          res.status(400).json({ message: error.message });
      }
  }

  async login(req, res){
        
    const { email, password } = req.body;
  
    try {
        const result = await UserService.login(email, password, res);
        return res.status(200).json({
            message: 'Login successful',
            user: result.user,
            token: result.token,
        });
    } catch (error) {
        console.error('error logging in');
        res.status(400).json({ message: error.message });
    }
  }
  
  async logout(req, res) {
    try {
      await UserService.logout(res); 
      return res.status(200).json({ message: 'Logout successful' }); 
    } catch (error) {
        console.error('erro logging in');
        res.status(400).json({ message: error.message });
    }
  }

  async createResume(req, res) {
    try {
        const { user, ...rest } = req.body;
        const resumeData = { ...rest, user };        
    
           
      const savedResume = await UserService.createResume(resumeData);

      res.status(201).json({
        message: 'Resume created successfully',
        resume: savedResume
      });
    } catch (error) {
      console.error('Error creating resume:', error);
      res.status(500).json({ message: 'Failed to create resume' });
    }
  }

  async getResumesByUser(req, res) {
    try {
      const userId = req.query.userId;
      console.log('reahed get resumemmmmmmmmmmm',userId);
      
      const resumes = await UserService.getResumesByUser(userId);

      res.status(200).json({ resumes });
    } catch (error) {
      console.error('Error fetching resumes:', error);
      res.status(500).json({ message: 'Failed to fetch resumes' });
    }
  }

  // PUT /users/edit-resumes/:resumeId
async editResume (req, res){
    try {
      const { resumeId } = req.params;
      const resumeData = req.body;
  
      const updatedResume = await UserService.editResumeById(resumeId, resumeData);
  
      if (!updatedResume) {
        return res.status(404).json({ message: 'Resume not found.' });
      }
  
      res.status(200).json({ message: 'Resume updated successfully.', data: updatedResume });
  
    } catch (error) {
      console.error('Error updating resume:', error);
      res.status(500).json({ message: 'Failed to update resume.' });
    }
  };


async deleteResume(req, res) {
    try {
      const { resumeId } = req.params;
  
      const deletedResume = await UserService.deleteResume(resumeId);
  
      if (!deletedResume) {
        return res.status(404).json({ message: 'Resume not found.' });
      }
  
      res.status(200).json({ message: 'Resume deleted successfully.' });
    } catch (error) {
      console.error('Error deleting resume:', error);
      res.status(500).json({ message: 'Failed to delete resume.' });
    }
  }
  
  async forgotPassword(req, res) {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const message = await UserService.sendPasswordResetOtp(email);
        res.status(200).json({ message });
    } catch (error) {
        console.error('Error in forgotPassword:', error.message);
        res.status(400).json({ message: error.message });
    }
}

async resetPassword(req, res) {
  const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

    try {
        const message = await UserService.resetPassword(email,newPassword);
        res.status(200).json({ message });
    } catch (error) {
        console.error('Error in resetPassword:', error.message);
        res.status(400).json({ message: error.message });
    }
}
  

}