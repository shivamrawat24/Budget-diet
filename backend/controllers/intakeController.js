const IntakeLog = require('../models/IntakeLog');
const Food = require('../models/Food');

// @route   POST /api/intake/log
// @desc    Log food intake for today
// @access  Private
const logIntake = async (req, res) => {
  try {
    const userId = req.user.id;
    const { foodId, quantity, mealType } = req.body;

    // Get food details
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    // Calculate nutrition for the quantity
    const calories = (food.nutrition.calories / 100) * quantity;
    const protein = (food.nutrition.protein / 100) * quantity;
    const carbs = (food.nutrition.carbohydrates / 100) * quantity;
    const fats = (food.nutrition.fats / 100) * quantity;

    // Get today's date at start of day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find or create today's log
    let intakeLog = await IntakeLog.findOne({
      userId,
      date: today,
    });

    if (!intakeLog) {
      intakeLog = new IntakeLog({
        userId,
        date: today,
      });
    }

    // Add entry
    intakeLog.entries.push({
      foodId,
      foodName: food.name,
      quantity,
      mealType,
      calories: Math.round(calories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
    });

    // Recalculate totals
    intakeLog.totalCalories = intakeLog.entries.reduce((sum, e) => sum + e.calories, 0);
    intakeLog.totalProtein = intakeLog.entries.reduce((sum, e) => sum + e.protein, 0);
    intakeLog.totalCarbs = intakeLog.entries.reduce((sum, e) => sum + e.carbs, 0);
    intakeLog.totalFats = intakeLog.entries.reduce((sum, e) => sum + e.fats, 0);

    await intakeLog.save();

    res.status(201).json({
      success: true,
      message: 'Food logged successfully',
      intakeLog,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/intake/today
// @desc    Get today's intake log
// @access  Private
const getTodayIntake = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get today's date at start of day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const intakeLog = await IntakeLog.findOne({
      userId,
      date: today,
    }).populate('entries.foodId');

    if (!intakeLog) {
      return res.status(200).json({
        success: true,
        intakeLog: {
          userId,
          date: today,
          entries: [],
          totalCalories: 0,
          totalProtein: 0,
          totalCarbs: 0,
          totalFats: 0,
          waterIntake: 0,
        },
      });
    }

    res.status(200).json({
      success: true,
      intakeLog,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/intake/:date
// @desc    Get intake for specific date
// @access  Private
const getIntakeByDate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date } = req.params;

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const intakeLog = await IntakeLog.findOne({
      userId,
      date: targetDate,
    }).populate('entries.foodId');

    if (!intakeLog) {
      return res.status(200).json({
        success: true,
        intakeLog: null,
      });
    }

    res.status(200).json({
      success: true,
      intakeLog,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   DELETE /api/intake/:entryId
// @desc    Remove a logged food entry
// @access  Private
const removeIntakeEntry = async (req, res) => {
  try {
    const { entryId } = req.params;
    const userId = req.user.id;

    // Get today's date at start of day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const intakeLog = await IntakeLog.findOne({
      userId,
      date: today,
    });

    if (!intakeLog) {
      return res.status(404).json({ message: 'No intake log for today' });
    }

    // Remove entry
    intakeLog.entries = intakeLog.entries.filter(
      (e) => e._id.toString() !== entryId
    );

    // Recalculate totals
    intakeLog.totalCalories = intakeLog.entries.reduce((sum, e) => sum + e.calories, 0);
    intakeLog.totalProtein = intakeLog.entries.reduce((sum, e) => sum + e.protein, 0);
    intakeLog.totalCarbs = intakeLog.entries.reduce((sum, e) => sum + e.carbs, 0);
    intakeLog.totalFats = intakeLog.entries.reduce((sum, e) => sum + e.fats, 0);

    await intakeLog.save();

    res.status(200).json({
      success: true,
      message: 'Entry removed',
      intakeLog,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   PUT /api/intake/water
// @desc    Update water intake
// @access  Private
const updateWaterIntake = async (req, res) => {
  try {
    const userId = req.user.id;
    const { waterAmount } = req.body; // in liters

    // Get today's date at start of day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let intakeLog = await IntakeLog.findOne({
      userId,
      date: today,
    });

    if (!intakeLog) {
      intakeLog = new IntakeLog({
        userId,
        date: today,
      });
    }

    intakeLog.waterIntake = waterAmount;
    await intakeLog.save();

    res.status(200).json({
      success: true,
      message: 'Water intake updated',
      intakeLog,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  logIntake,
  getTodayIntake,
  getIntakeByDate,
  removeIntakeEntry,
  updateWaterIntake,
};
