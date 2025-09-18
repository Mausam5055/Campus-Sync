// JWT utility functions
// Will handle token generation and verification

const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) => {
  // Token generation logic will be implemented later
  return 'dummy-token';
};

const generateRefreshToken = (payload) => {
  // Refresh token generation logic will be implemented later
  return 'dummy-refresh-token';
};

const verifyToken = (token) => {
  // Token verification logic will be implemented later
  return { valid: true, payload: {} };
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken
};