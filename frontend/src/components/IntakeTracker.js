import React, { useState, useContext, useEffect } from 'react';
import { DietContext } from '../context/DietContext';
import '../styles/components.css';
import { formatCurrency } from '../utils/helpers';

const IntakeTracker = ({ targetCalories = 2000 }) => {
  const { intakeLog, logIntake, removeIntakeEntry, fetchTodayIntake, foods, loading } =
    useContext(DietContext);
  const [selectedFood, setSelectedFood] = useState('');
  const [quantity, setQuantity] = useState('');
  const [mealType, setMealType] = useState('lunch');

  useEffect(() => {
    fetchTodayIntake();
  }, [fetchTodayIntake]);

  const handleLogIntake = async (e) => {
    e.preventDefault();
    if (selectedFood && quantity) {
      await logIntake(selectedFood, parseFloat(quantity), mealType);
      setSelectedFood('');
      setQuantity('');
      setMealType('lunch');
    }
  };

  const remainingCalories = intakeLog
    ? targetCalories - intakeLog.totalCalories
    : targetCalories;
  const consumedPercent = intakeLog
    ? (intakeLog.totalCalories / targetCalories) * 100
    : 0;

  const getMealColor = (type) => {
    switch (type) {
      case 'breakfast':
        return '#FFD700';
      case 'lunch':
        return '#FF6347';
      case 'dinner':
        return '#4169E1';
      case 'snack':
        return '#32CD32';
      default:
        return '#808080';
    }
  };

  return (
    <div className="intake-tracker">
      <h2>Daily Intake Tracker</h2>

      {/* Calorie Progress */}
      <div className="calorie-summary">
        <div className="calorie-box">
          <h3>Consumed</h3>
          <p className="calorie-value">{intakeLog?.totalCalories || 0} kcal</p>
        </div>
        <div className="calorie-box">
          <h3>Remaining</h3>
          <p className={`calorie-value ${remainingCalories < 0 ? 'over' : 'under'}`}>
            {Math.abs(remainingCalories)} kcal
          </p>
        </div>
        <div className="calorie-box">
          <h3>Target</h3>
          <p className="calorie-value">{targetCalories} kcal</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${Math.min(consumedPercent, 100)}%` }}
          ></div>
        </div>
        <p className="progress-text">{consumedPercent.toFixed(0)}% of daily goal</p>
      </div>

      {/* Macronutrients */}
      {intakeLog && (
        <div className="macronutrients">
          <div className="macro">
            <p className="macro-label">Protein</p>
            <p className="macro-value">{intakeLog.totalProtein}g</p>
          </div>
          <div className="macro">
            <p className="macro-label">Carbs</p>
            <p className="macro-value">{intakeLog.totalCarbs}g</p>
          </div>
          <div className="macro">
            <p className="macro-label">Fats</p>
            <p className="macro-value">{intakeLog.totalFats}g</p>
          </div>
        </div>
      )}

      {/* Log Food Form */}
      <form className="log-food-form" onSubmit={handleLogIntake}>
        <h3>Log Food</h3>

        <div className="form-row">
          <div className="form-group">
            <label>Select Food</label>
            <select
              value={selectedFood}
              onChange={(e) => setSelectedFood(e.target.value)}
              required
            >
              <option value="">-- Choose a food --</option>
              {foods.map((food) => (
                <option key={food._id} value={food._id}>
                  {food.name} ({Math.round((food.nutrition.calories / 100) * 100)}cal/100g)
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Quantity (grams)</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="100"
              required
              min="1"
              step="10"
            />
          </div>

          <div className="form-group">
            <label>Meal Type</label>
            <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Logging...' : 'Log Food'}
        </button>
      </form>

      {/* Today's Entries */}
      {intakeLog && intakeLog.entries && intakeLog.entries.length > 0 && (
        <div className="today-entries">
          <h3>Today's Entries</h3>
          {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => {
            const mealEntries = intakeLog.entries.filter((e) => e.mealType === mealType);
            if (mealEntries.length === 0) return null;

            return (
              <div key={mealType} className="meal-section">
                <h4 style={{ borderLeft: `4px solid ${getMealColor(mealType)}`, paddingLeft: '10px' }}>
                  {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                </h4>
                {mealEntries.map((entry) => (
                  <div key={entry._id} className="entry-item">
                    <div className="entry-info">
                      <p className="entry-name">{entry.foodName}</p>
                      <p className="entry-details">
                        {entry.quantity}g • {entry.calories} kcal • P:{entry.protein}g C:{entry.carbs}g F:{entry.fats}g
                      </p>
                    </div>
                    <button
                      className="btn-remove"
                      onClick={() => removeIntakeEntry(entry._id)}
                      title="Remove entry"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IntakeTracker;
