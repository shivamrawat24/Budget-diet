const Food = require('../models/Food');

// @route   GET /api/foods
// @desc    Get all foods with optional filtering
// @access  Public
const getAllFoods = async (req, res) => {
  try {
    const { category, dietType, active } = req.query;

    let filter = { active: true };

    if (category) filter.category = category;
    if (dietType) filter.dietType = dietType;

    const foods = await Food.find(filter).sort({ costPer100g: 1 });

    res.status(200).json({
      success: true,
      count: foods.length,
      foods,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/foods/cheap
// @desc    Get cheapest foods by category
// @access  Public
const getCheapestFoods = async (req, res) => {
  try {
    const { dietType } = req.query;

    let filter = { active: true };
    if (dietType) filter.dietType = dietType;

    // Get cheapest 5 foods overall
    const cheapestFoods = await Food.find(filter)
      .sort({ costPer100g: 1 })
      .limit(10);

    res.status(200).json({
      success: true,
      foods: cheapestFoods,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/foods/:id
// @desc    Get single food item
// @access  Public
const getFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   POST /api/foods
// @desc    Add new food (Admin only)
// @access  Private/Admin
const addFood = async (req, res) => {
  try {
    const food = new Food(req.body);
    await food.save();

    res.status(201).json({
      success: true,
      message: 'Food added successfully',
      food,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllFoods,
  getCheapestFoods,
  getFood,
  addFood,
};
