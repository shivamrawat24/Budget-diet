const express = require('express');
const protect = require('../middleware/auth');
const {
  logIntake,
  getTodayIntake,
  getIntakeByDate,
  removeIntakeEntry,
  updateWaterIntake,
} = require('../controllers/intakeController');

const router = express.Router();

// @route   POST /api/intake/log
// @desc    Log food intake
// @access  Private
router.post('/log', protect, logIntake);

// @route   GET /api/intake/today
// @desc    Get today's intake
// @access  Private
router.get('/today', protect, getTodayIntake);

// @route   GET /api/intake/:date
// @desc    Get intake by date
// @access  Private
router.get('/:date', protect, getIntakeByDate);

// @route   DELETE /api/intake/:entryId
// @desc    Remove intake entry
// @access  Private
router.delete('/:entryId', protect, removeIntakeEntry);

// @route   PUT /api/intake/water
// @desc    Update water intake
// @access  Private
router.put('/water', protect, updateWaterIntake);

module.exports = router;
