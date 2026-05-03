const mongoose = require('mongoose');

const dietPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    planName: {
      type: String,
      default: function () {
        return `${this.goalType} Plan - ${new Date().toLocaleDateString()}`;
      },
    },

    // Plan Details
    goalType: {
      type: String,
      enum: ['weightLoss', 'maintenance', 'weightGain'],
      required: true,
    },

    targetCalories: {
      type: Number,
      required: true,
    },

    duration: {
      type: String,
      enum: ['1week', '2weeks', '1month'],
      default: '1week',
    },

    // Budget Details
    totalBudget: Number, // Total budget for the plan duration
    spentBudget: {
      type: Number,
      default: 0,
    },

    // Foods in Plan
    meals: [
      {
        mealType: {
          type: String,
          enum: ['breakfast', 'lunch', 'dinner', 'snack'],
        },
        foods: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Food',
            },
            quantity: Number, // in grams
            calories: Number,
            protein: Number,
            carbs: Number,
            fats: Number,
            cost: Number,
          },
        ],
        totalCalories: Number,
        totalProtein: Number,
        totalCarbs: Number,
        totalFats: Number,
        totalCost: Number,
      },
    ],

    // Daily Summary
    dailySummary: {
      totalCalories: Number,
      totalProtein: Number,
      totalCarbs: Number,
      totalFats: Number,
      totalCost: Number,
    },

    status: {
      type: String,
      enum: ['active', 'completed', 'archived'],
      default: 'active',
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: Date,

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DietPlan', dietPlanSchema);
