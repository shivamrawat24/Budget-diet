const mongoose = require('mongoose');

const intakeLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    date: {
      type: Date,
      required: true,
      default: function () {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), today.getDate());
      },
    },

    entries: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food',
        },
        foodName: String,
        quantity: Number, // in grams
        mealType: {
          type: String,
          enum: ['breakfast', 'lunch', 'dinner', 'snack', 'other'],
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        calories: Number,
        protein: Number,
        carbs: Number,
        fats: Number,
      },
    ],

    // Daily Totals
    totalCalories: {
      type: Number,
      default: 0,
    },
    totalProtein: {
      type: Number,
      default: 0,
    },
    totalCarbs: {
      type: Number,
      default: 0,
    },
    totalFats: {
      type: Number,
      default: 0,
    },

    // Water Tracking (optional)
    waterIntake: {
      type: Number,
      default: 0, // in liters
    },

    notes: String,

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create index for efficient querying by userId and date
intakeLogSchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model('IntakeLog', intakeLogSchema);
