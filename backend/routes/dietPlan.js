const express = require('express');
const protect = require('../middleware/auth');
const {
  generateDietPlan,
  getDietPlans,
  getDietPlan,
} = require('../controllers/dietPlanController');

const router = express.Router();

// @route   POST /api/diet-plans/generate
// @desc    Generate diet plan
// @access  Private
router.post('/generate', protect, generateDietPlan);

// @route   GET /api/diet-plans
// @desc    Get all diet plans for user
// @access  Private
router.get('/', protect, getDietPlans);

// @route   GET /api/diet-plans/:id
// @desc    Get single diet plan
// @access  Private
router.get('/:id', protect, getDietPlan);

module.exports = router;
