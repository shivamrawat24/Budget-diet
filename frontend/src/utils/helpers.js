import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Calculation helper functions
export const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100;
  return (weight / (heightInMeters * heightInMeters)).toFixed(1);
};

export const categorizeBMI = (bmi) => {
  bmi = parseFloat(bmi);
  if (bmi < 18.5) return 'Underweight';
  if (bmi >= 18.5 && bmi < 25) return 'Normal';
  if (bmi >= 25 && bmi < 30) return 'Overweight';
  return 'Obese';
};

export const calculateRemainingCalories = (targetCalories, consumed) => {
  return Math.max(0, targetCalories - consumed);
};

export const formatCurrency = (amount) => {
  return `₹${amount.toFixed(2)}`;
};

// API helper functions
export const apiCall = async (method, endpoint, data = null) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const config = { headers };
    const url = `${API_URL}${endpoint}`;

    if (method === 'GET') {
      return await axios.get(url, config);
    } else if (method === 'POST') {
      return await axios.post(url, data, config);
    } else if (method === 'PUT') {
      return await axios.put(url, data, config);
    } else if (method === 'DELETE') {
      return await axios.delete(url, config);
    }
  } catch (error) {
    throw error;
  }
};
