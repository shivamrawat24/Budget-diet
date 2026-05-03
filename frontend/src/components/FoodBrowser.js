import React, { useState, useEffect, useContext } from 'react';
import { DietContext } from '../context/DietContext';
import '../styles/components.css';
import { formatCurrency } from '../utils/helpers';

const FoodBrowser = () => {
  const { foods, fetchFoods, fetchCheapestFoods, loading } = useContext(DietContext);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('cost');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (filter === 'cheapest') {
      fetchCheapestFoods();
    } else {
      const params = {};
      if (category) params.category = category;
      fetchFoods(params);
    }
  }, [filter, category, fetchFoods, fetchCheapestFoods]);

  const displayFoods = [...foods].sort((a, b) => {
    if (sortBy === 'cost') {
      return (a.costPer100g || 0) - (b.costPer100g || 0);
    } else if (sortBy === 'calories') {
      return (b.nutrition.calories || 0) - (a.nutrition.calories || 0);
    } else if (sortBy === 'protein') {
      return (b.nutrition.protein || 0) - (a.nutrition.protein || 0);
    }
    return 0;
  });

  const categories = [
    'grain',
    'legume',
    'protein',
    'vegetable',
    'fruit',
    'dairy',
    'oil',
    'spice',
  ];

  const getCostPerCalorie = (food) => {
    const cal = food.nutrition.calories || 1;
    const costPer100g = food.costPer100g || 0;
    return (costPer100g / cal).toFixed(2);
  };

  return (
    <div className="food-browser">
      <h2>Food Database</h2>

      <div className="filter-section">
        <div className="filter-row">
          <div className="form-group">
            <label>Show:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Foods</option>
              <option value="cheapest">Cheapest Foods</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Sort By:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="cost">Cost (Cheapest)</option>
              <option value="calories">Calories (Highest)</option>
              <option value="protein">Protein (Highest)</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="loading">Loading foods...</p>
      ) : (
        <div className="food-grid">
          {displayFoods.map((food) => (
            <div key={food._id} className="food-card">
              <div className="food-header">
                <h3>{food.name}</h3>
                <span className="category-badge">{food.category}</span>
              </div>

              <div className="food-nutrition">
                <div className="nutrient">
                  <span className="label">Calories</span>
                  <span className="value">{food.nutrition.calories}</span>
                </div>
                <div className="nutrient">
                  <span className="label">Protein</span>
                  <span className="value">{food.nutrition.protein}g</span>
                </div>
                <div className="nutrient">
                  <span className="label">Carbs</span>
                  <span className="value">{food.nutrition.carbohydrates}g</span>
                </div>
                <div className="nutrient">
                  <span className="label">Fats</span>
                  <span className="value">{food.nutrition.fats}g</span>
                </div>
              </div>

              <div className="food-cost">
                <p>
                  <strong>{formatCurrency(food.costPer100g)}/100g</strong>
                </p>
                <p className="unit">{food.costPerUnit} / {food.unitSize}</p>
                <p className="cost-ratio">
                  {formatCurrency(getCostPerCalorie(food))} per calorie
                </p>
              </div>

              <div className="food-meta">
                <span className="diet-type">{food.dietType.join(', ')}</span>
                {food.season !== 'year-round' && <span className="season">{food.season}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodBrowser;
