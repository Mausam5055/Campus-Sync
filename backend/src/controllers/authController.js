// Authentication controller
// Will handle user registration, login, password reset, etc.

const authService = require('../services/authService');

module.exports = {
  register: async (req, res) => {
    try {
      const result = await authService.registerUser(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  
  login: async (req, res) => {
    try {
      const result = await authService.loginUser(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  
  refreshToken: async (req, res) => {
    try {
      const result = await authService.refreshToken(req.body.token);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  
  logout: (req, res) => {
    // Logout logic will be implemented later
    res.status(200).json({ message: 'Logout successful' });
  },
  
  forgotPassword: async (req, res) => {
    try {
      const result = await authService.forgotPassword(req.body.email);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  
  resetPassword: async (req, res) => {
    try {
      const result = await authService.resetPassword(req.body.token, req.body.newPassword);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};