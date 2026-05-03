import React, { useState } from 'react';
import '../styles/components.css';
import { calculateBMI, categorizeBMI } from '../utils/helpers';

const ProfileForm = ({ onSubmit, initialData = {}, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    password: initialData.password || '',
    age: initialData.age || '',
    gender: initialData.gender || 'male',
    height: initialData.height || '',
    weight: initialData.weight || '',
    activityLevel: initialData.activityLevel || 'moderate',
    dailyBudget: initialData.dailyBudget || '',
    dietPreference: initialData.dietPreference || 'non-vegetarian',
    goal: initialData.goal || 'maintenance',
  });

  const [bmiInfo, setBmiInfo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Calculate BMI dynamically
      if (name === 'height' || name === 'weight') {
        if (updated.height && updated.weight) {
          const bmi = calculateBMI(updated.weight, updated.height);
          const category = categorizeBMI(bmi);
          setBmiInfo({ bmi, category });
        }
      }

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const activityLevelDescriptions = {
    sedentary: 'Little or no exercise',
    light: '1-3 days/week',
    moderate: '3-5 days/week',
    active: '6-7 days/week',
    veryActive: 'Physical job or training',
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <h2>{initialData.name ? 'Update Profile' : 'Create Your Profile'}</h2>

      <div className="form-group">
        <label>Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your full name"
        />
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your@email.com"
          disabled={!!initialData.email}
        />
      </div>

      {!initialData.email && (
        <div className="form-group">
          <label>Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Minimum 6 characters"
          />
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label>Age (years) *</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="13"
            max="100"
          />
        </div>

        <div className="form-group">
          <label>Gender *</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Height (cm) *</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            min="100"
            max="250"
            placeholder="e.g., 170"
          />
        </div>

        <div className="form-group">
          <label>Weight (kg) *</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            min="30"
            max="300"
            placeholder="e.g., 70"
          />
        </div>
      </div>

      {bmiInfo && (
        <div className="bmi-info alert alert-info">
          <strong>BMI: {bmiInfo.bmi}</strong> ({bmiInfo.category})
        </div>
      )}

      <div className="form-group">
        <label>Activity Level *</label>
        <select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
          {Object.entries(activityLevelDescriptions).map(([key, desc]) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)} - {desc}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Daily Food Budget (₹) *</label>
          <input
            type="number"
            name="dailyBudget"
            value={formData.dailyBudget}
            onChange={handleChange}
            required
            min="50"
            step="10"
            placeholder="e.g., 200"
          />
        </div>

        <div className="form-group">
          <label>Diet Preference *</label>
          <select
            name="dietPreference"
            value={formData.dietPreference}
            onChange={handleChange}
          >
            <option value="vegetarian">Vegetarian</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Goal *</label>
        <select name="goal" value={formData.goal} onChange={handleChange}>
          <option value="weightLoss">Weight Loss</option>
          <option value="maintenance">Maintenance</option>
          <option value="weightGain">Weight Gain</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? 'Submitting...' : initialData.name ? 'Update Profile' : 'Create Profile'}
      </button>
    </form>
  );
};

export default ProfileForm;
