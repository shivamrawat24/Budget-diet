require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/food');
const dietPlanRoutes = require('./routes/dietPlan');
const intakeRoutes = require('./routes/intake');

// Initialize Express app
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (optional)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/diet-plans', dietPlanRoutes);
app.use('/api/intake', intakeRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Budget Diet Planner Backend is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Unknown error',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════════╗
  ║  Budget Diet Planner Backend              ║
  ║  Server running on port ${PORT}             ║
  ║  Environment: ${process.env.NODE_ENV || 'development'}        ║
  ║  Database: ${process.env.MONGODB_URI}     ║
  ╚════════════════════════════════════════════╝
  `);
});

module.exports = app;
