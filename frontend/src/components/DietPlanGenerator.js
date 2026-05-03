import React, { useState, useContext } from 'react';
import { DietContext } from '../context/DietContext';
import '../styles/components.css';

const DietPlanGenerator = ({ user }) => {
  const { generateDietPlan, loading, dietPlans } = useContext(DietContext);
  const [duration, setDuration] = useState('1week');
  const [goalType, setGoalType] = useState(user?.goal || 'maintenance');
  const [success, setSuccess] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    const result = await generateDietPlan(duration, goalType);
    if (result.success) {
      setGeneratedPlan(result.data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  const durationDays = {
    '1week': 7,
    '2weeks': 14,
    '1month': 30,
  };

  return (
    <div className="diet-plan-generator">
      <h2>Generate Your Budget Diet Plan</h2>

      {success && (
        <div className="alert alert-success">
          ✓ Diet plan generated successfully! Check your plans list.
        </div>
      )}

      <form onSubmit={handleGenerate} className="generator-form">
        <div className="form-row">
          <div className="form-group">
            <label>Plan Duration *</label>
            <select value={duration} onChange={(e) => setDuration(e.target.value)}>
              <option value="1week">1 Week</option>
              <option value="2weeks">2 Weeks</option>
              <option value="1month">1 Month</option>
            </select>
            <small>You'll spend ₹{(user?.dailyBudget || 0) * durationDays[duration]} total</small>
          </div>

          <div className="form-group">
            <label>Goal Type *</label>
            <select value={goalType} onChange={(e) => setGoalType(e.target.value)}>
              <option value="weightLoss">Weight Loss (15% deficit)</option>
              <option value="maintenance">Maintenance</option>
              <option value="weightGain">Weight Gain (15% surplus)</option>
            </select>
          </div>
        </div>

        <div className="info-box">
          <h4>Plan Summary:</h4>
          <p>
            <strong>Target Calories:</strong>{' '}
            {goalType === 'weightLoss'
              ? Math.round(user?.dailyCalorieNeed * 0.85)
              : goalType === 'weightGain'
              ? Math.round(user?.dailyCalorieNeed * 1.15)
              : user?.dailyCalorieNeed}{' '}
            kcal/day
          </p>
          <p>
            <strong>Duration:</strong> {duration === '1week' ? '7 days' : duration === '2weeks' ? '14 days' : '30 days'}
          </p>
          <p>
            <strong>Total Budget:</strong> ₹{(user?.dailyBudget || 0) * durationDays[duration]}
          </p>
          <p>
            <strong>Daily Budget:</strong> ₹{user?.dailyBudget}
          </p>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>
      </form>

      {/* Display generated plan preview */}
      {generatedPlan && (
        <div className="plan-preview">
          <h3>Plan Preview</h3>
          <div className="meals-grid">
            {generatedPlan.meals.map((meal, idx) => (
              <div key={idx} className="meal-card">
                <h4>{meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)}</h4>
                <div className="meal-stats">
                  <p>Calories: <strong>{meal.totalCalories}</strong> kcal</p>
                  <p>Protein: <strong>{meal.totalProtein}</strong>g</p>
                  <p>Cost: <strong>₹{meal.totalCost}</strong></p>
                </div>
                <div className="meal-foods">
                  {meal.foods.map((food, fIdx) => (
                    <small key={fIdx}>• {food.quantity}g food</small>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="daily-totals">
            <h4>Daily Totals:</h4>
            <p>Calories: <strong>{generatedPlan.dailySummary.totalCalories}</strong> kcal</p>
            <p>Protein: <strong>{generatedPlan.dailySummary.totalProtein}</strong>g</p>
            <p>Cost: <strong>₹{generatedPlan.dailySummary.totalCost}</strong></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietPlanGenerator;
