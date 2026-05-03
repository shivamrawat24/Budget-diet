const express = require('express');
const {
  getAllFoods,
  getCheapestFoods,
  getFood,
  addFood,
} = require('../controllers/foodController');

const router = express.Router();

// @route   GET /api/foods
// @desc    Get all foods
// @access  Public
router.get('/', getAllFoods);

// @route   GET /api/foods/cheap
// @desc    Get cheapest foods
// @access  Public
router.get('/cheap', getCheapestFoods);

// @route   GET /api/foods/:id
// @desc    Get single food
// @access  Public
router.get('/:id', getFood);

// @route   POST /api/foods
// @desc    Add new food
// @access  Private (Admin)
router.post('/', addFood);

module.exports = router;
