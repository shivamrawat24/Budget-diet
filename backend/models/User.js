const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false, // Don't return password by default
    },

    // Body Metrics
    age: {
      type: Number,
      required: [true, 'Please provide your age'],
      min: 13,
      max: 100,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Please select your gender'],
    },
    height: {
      type: Number, // in cm
      required: [true, 'Please provide your height in cm'],
      min: 100,
      max: 250,
    },
    weight: {
      type: Number, // in kg
      required: [true, 'Please provide your weight in kg'],
      min: 30,
      max: 300,
    },
    activityLevel: {
      type: String,
      enum: ['sedentary', 'light', 'moderate', 'active', 'veryActive'],
      default: 'moderate',
      description: 'Sedentary: little or no exercise, Light: 1-3 days/week, Moderate: 3-5 days/week, Active: 6-7 days/week, Very Active: physical job or training',
    },

    // Budget & Preferences
    dailyBudget: {
      type: Number, // in local currency (INR assumed)
      required: [true, 'Please provide your daily food budget'],
      min: 50,
    },
    dietPreference: {
      type: String,
      enum: ['vegetarian', 'non-vegetarian', 'vegan'],
      default: 'non-vegetarian',
    },

    // Goals
    goal: {
      type: String,
      enum: ['weightLoss', 'maintenance', 'weightGain'],
      default: 'maintenance',
    },

    // Calculated Values (updated on profile change)
    bmi: {
      type: Number,
      default: null,
    },
    bmiCategory: {
      type: String,
      enum: ['underweight', 'normal', 'overweight', 'obese', null],
      default: null,
    },
    dailyCalorieNeed: {
      type: Number,
      default: null,
    },
    targetCalories: {
      type: Number,
      default: null,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
