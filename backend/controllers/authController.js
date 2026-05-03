const User = require('../models/User');
const { generateToken } = require('../utils/auth');
const {
  calculateBMI,
  categorizeBMI,
  calculateDailyCalories,
  calculateTargetCalories,
  calculateMacroTargets,
} = require('../utils/calculations');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      age,
      gender,
      height,
      weight,
      activityLevel,
      dailyBudget,
      dietPreference,
      goal,
    } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Calculate BMI and Calories
    const bmi = calculateBMI(weight, height);
    const bmiCategory = categorizeBMI(bmi);
    const dailyCalorieNeed = calculateDailyCalories(
      weight,
      height,
      age,
      gender,
      activityLevel
    );
    const targetCalories = calculateTargetCalories(dailyCalorieNeed, goal);

    // Create user
    user = new User({
      name,
      email,
      password,
      age,
      gender,
      height,
      weight,
      activityLevel,
      dailyBudget,
      dietPreference,
      goal,
      bmi,
      bmiCategory,
      dailyCalorieNeed,
      targetCalories,
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bmi: user.bmi,
        bmiCategory: user.bmiCategory,
        dailyCalorieNeed: user.dailyCalorieNeed,
        targetCalories: user.targetCalories,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Check for user (select password explicitly since it's hidden by default)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bmi: user.bmi,
        bmiCategory: user.bmiCategory,
        dailyCalorieNeed: user.dailyCalorieNeed,
        targetCalories: user.targetCalories,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   PUT /api/auth/update-profile
// @desc    Update user profile and recalculate metrics
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { age, height, weight, activityLevel, dailyBudget, goal } = req.body;

    let user = await User.findById(req.user.id);

    // Update fields if provided
    if (age) user.age = age;
    if (height) user.height = height;
    if (weight) user.weight = weight;
    if (activityLevel) user.activityLevel = activityLevel;
    if (dailyBudget) user.dailyBudget = dailyBudget;
    if (goal) user.goal = goal;

    // Recalculate BMI and Calories
    if (weight || height || age || activityLevel || goal) {
      user.bmi = calculateBMI(user.weight, user.height);
      user.bmiCategory = categorizeBMI(user.bmi);
      user.dailyCalorieNeed = calculateDailyCalories(
        user.weight,
        user.height,
        user.age,
        user.gender,
        user.activityLevel
      );
      user.targetCalories = calculateTargetCalories(user.dailyCalorieNeed, user.goal);
    }

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        activityLevel: user.activityLevel,
        bmi: user.bmi,
        bmiCategory: user.bmiCategory,
        dailyCalorieNeed: user.dailyCalorieNeed,
        targetCalories: user.targetCalories,
        dailyBudget: user.dailyBudget,
        goal: user.goal,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
