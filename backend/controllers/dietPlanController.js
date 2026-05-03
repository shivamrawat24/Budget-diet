const DietPlan = require('../models/DietPlan');
const Food = require('../models/Food');
const User = require('../models/User');
const { calculateMacroTargets } = require('../utils/calculations');

/**
 * BUDGET-BASED DIET PLAN GENERATOR
 * Algorithm:
 * 1. Get user's budget and calorie target
 * 2. Find cheapest foods matching diet preference
 * 3. Combine foods to match target calories and budget
 * 4. Distribute across meals (breakfast, lunch, dinner, snacks)
 */

// @route   POST /api/diet-plans/generate
// @desc    Generate a budget-friendly diet plan
// @access  Private
const generateDietPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { duration = '1week', goalType } = req.body;

    // Get user data
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate budget based on duration
    const daysInPlan = duration === '1week' ? 7 : duration === '2weeks' ? 14 : 30;
    const totalBudget = user.dailyBudget * daysInPlan;
    const dailyBudget = user.dailyBudget;
    const targetCalories = user.targetCalories;
    const macroTargets = calculateMacroTargets(targetCalories);

    // Get cheapest foods matching user's diet preference
    const filter = {
      active: true,
      dietType: user.dietPreference,
    };

    const availableFoods = await Food.find(filter).sort({ costPer100g: 1 });

    if (availableFoods.length === 0) {
      return res.status(400).json({
        message: 'No foods available for your diet preference',
      });
    }

    // Generate meals distribution
    // Breakfast: 25%, Lunch: 35%, Dinner: 30%, Snacks: 10%
    const mealDistribution = {
      breakfast: targetCalories * 0.25,
      lunch: targetCalories * 0.35,
      dinner: targetCalories * 0.3,
      snack: targetCalories * 0.1,
    };

    const meals = [];
    let totalCost = 0;
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    // Generate meals
    for (const [mealType, targetMealCalories] of Object.entries(mealDistribution)) {
      const mealFoods = [];
      let mealCalories = 0;
      let mealCost = 0;
      let mealProtein = 0;
      let mealCarbs = 0;
      let mealFats = 0;

      // Use cheapest foods to fill the meal
      for (const food of availableFoods) {
        if (
          mealCalories >= targetMealCalories * 0.95 &&
          mealCalories <= targetMealCalories * 1.05
        ) {
          break;
        }

        if (mealCalories < targetMealCalories) {
          // Calculate quantity needed
          const caloriesNeeded = targetMealCalories - mealCalories;
          const quantity = Math.round(
            (caloriesNeeded / (food.nutrition.calories || 100)) * 100
          );

          const calories = (food.nutrition.calories / 100) * quantity;
          const protein = (food.nutrition.protein / 100) * quantity;
          const carbs = (food.nutrition.carbohydrates / 100) * quantity;
          const fats = (food.nutrition.fats / 100) * quantity;
          const cost = (food.costPer100g / 100) * quantity;

          if (cost <= dailyBudget * 0.1) {
            // Allow max 10% of daily budget per item
            mealFoods.push({
              foodId: food._id,
              quantity,
              calories: Math.round(calories),
              protein: Math.round(protein),
              carbs: Math.round(carbs),
              fats: Math.round(fats),
              cost: parseFloat(cost.toFixed(2)),
            });

            mealCalories += calories;
            mealCost += cost;
            mealProtein += protein;
            mealCarbs += carbs;
            mealFats += fats;
          }
        }
      }

      // If meal is too empty, add at least one food
      if (mealFoods.length === 0 && availableFoods.length > 0) {
        const defaultFood = availableFoods[0];
        const quantity = Math.round(
          (targetMealCalories / (defaultFood.nutrition.calories || 100)) * 100
        );

        const calories = (defaultFood.nutrition.calories / 100) * quantity;
        const protein = (defaultFood.nutrition.protein / 100) * quantity;
        const carbs = (defaultFood.nutrition.carbohydrates / 100) * quantity;
        const fats = (defaultFood.nutrition.fats / 100) * quantity;
        const cost = (defaultFood.costPer100g / 100) * quantity;

        mealFoods.push({
          foodId: defaultFood._id,
          quantity,
          calories: Math.round(calories),
          protein: Math.round(protein),
          carbs: Math.round(carbs),
          fats: Math.round(fats),
          cost: parseFloat(cost.toFixed(2)),
        });

        mealCalories = calories;
        mealCost = cost;
        mealProtein = protein;
        mealCarbs = carbs;
        mealFats = fats;
      }

      meals.push({
        mealType,
        foods: mealFoods,
        totalCalories: Math.round(mealCalories),
        totalProtein: Math.round(mealProtein),
        totalCarbs: Math.round(mealCarbs),
        totalFats: Math.round(mealFats),
        totalCost: parseFloat(mealCost.toFixed(2)),
      });

      totalCost += mealCost;
      totalCalories += mealCalories;
      totalProtein += mealProtein;
      totalCarbs += mealCarbs;
      totalFats += mealFats;
    }

    // Create diet plan
    const dietPlan = new DietPlan({
      userId,
      goalType,
      targetCalories,
      duration,
      totalBudget,
      meals,
      dailySummary: {
        totalCalories: Math.round(totalCalories),
        totalProtein: Math.round(totalProtein),
        totalCarbs: Math.round(totalCarbs),
        totalFats: Math.round(totalFats),
        totalCost: parseFloat(totalCost.toFixed(2)),
      },
      startDate: new Date(),
      endDate: new Date(Date.now() + daysInPlan * 24 * 60 * 60 * 1000),
    });

    await dietPlan.save();

    res.status(201).json({
      success: true,
      message: 'Diet plan generated successfully',
      dietPlan,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/diet-plans
// @desc    Get all diet plans for user
// @access  Private
const getDietPlans = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status = 'active' } = req.query;

    let filter = { userId };
    if (status) filter.status = status;

    const dietPlans = await DietPlan.find(filter)
      .populate('meals.foods.foodId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: dietPlans.length,
      dietPlans,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/diet-plans/:id
// @desc    Get single diet plan
// @access  Private
const getDietPlan = async (req, res) => {
  try {
    const dietPlan = await DietPlan.findById(req.params.id)
      .populate('meals.foods.foodId')
      .populate('userId');

    if (!dietPlan) {
      return res.status(404).json({ message: 'Diet plan not found' });
    }

    // Check authorization
    if (dietPlan.userId._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.status(200).json({
      success: true,
      dietPlan,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  generateDietPlan,
  getDietPlans,
  getDietPlan,
};
