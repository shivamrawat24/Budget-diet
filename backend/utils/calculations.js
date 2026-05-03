/**
 * CALCULATION UTILITIES FOR DIET PLANNING
 * - BMI Calculation
 * - Daily Calorie Needs (Mifflin-St Jeor Equation)
 * - Adjusted Calories Based on Goal
 */

// Calculate BMI
const calculateBMI = (weight, height) => {
  // weight in kg, height in cm
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return parseFloat(bmi.toFixed(1));
};

// Categorize BMI
const categorizeBMI = (bmi) => {
  if (bmi < 18.5) return 'underweight';
  if (bmi >= 18.5 && bmi < 25) return 'normal';
  if (bmi >= 25 && bmi < 30) return 'overweight';
  return 'obese';
};

// Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
const calculateBMR = (weight, height, age, gender) => {
  // weight in kg, height in cm, age in years
  let bmr;

  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  return Math.round(bmr);
};

// Activity Factor Multipliers
const activityFactors = {
  sedentary: 1.2, // little or no exercise
  light: 1.375, // 1-3 days per week
  moderate: 1.55, // 3-5 days per week
  active: 1.725, // 6-7 days per week
  veryActive: 1.9, // physical job or training
};

// Calculate Daily Calorie Needs (TDEE - Total Daily Energy Expenditure)
const calculateDailyCalories = (weight, height, age, gender, activityLevel) => {
  const bmr = calculateBMR(weight, height, age, gender);
  const factor = activityFactors[activityLevel] || activityFactors.moderate;
  const tdee = Math.round(bmr * factor);
  return tdee;
};

// Calculate Target Calories Based on Goal
const calculateTargetCalories = (dailyCalories, goal) => {
  switch (goal) {
    case 'weightLoss':
      return Math.round(dailyCalories * 0.85); // 15% deficit
    case 'weightGain':
      return Math.round(dailyCalories * 1.15); // 15% surplus
    case 'maintenance':
    default:
      return dailyCalories;
  }
};

// Macronutrient Distribution (% of calories)
// Standard: 40% carbs, 30% protein, 30% fats
const calculateMacroTargets = (calories) => {
  return {
    carbs: Math.round((calories * 0.4) / 4), // 4 cal per gram
    protein: Math.round((calories * 0.3) / 4), // 4 cal per gram
    fats: Math.round((calories * 0.3) / 9), // 9 cal per gram
  };
};

module.exports = {
  calculateBMI,
  categorizeBMI,
  calculateBMR,
  calculateDailyCalories,
  calculateTargetCalories,
  calculateMacroTargets,
  activityFactors,
};
