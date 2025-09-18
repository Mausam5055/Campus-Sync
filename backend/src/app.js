const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CampusSync API' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CampusSync Backend is running!' });
});

// API Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

// Export app for server.js
module.exports = app;