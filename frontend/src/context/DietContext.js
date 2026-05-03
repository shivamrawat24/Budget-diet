import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const DietContext = createContext();

export const DietProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [dietPlans, setDietPlans] = useState([]);
  const [intakeLog, setIntakeLog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Get all foods
  const fetchFoods = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/foods`, { params: filters });
      setFoods(response.data.foods);
      return response.data.foods;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch foods');
      return [];
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // Get cheapest foods
  const fetchCheapestFoods = useCallback(async (dietType) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/foods/cheap`, {
        params: { dietType },
      });
      return response.data.foods;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch foods');
      return [];
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // Generate diet plan
  const generateDietPlan = useCallback(
    async (duration = '1week', goalType = 'maintenance') => {
      setLoading(true);
      try {
        const response = await axios.post(`${API_URL}/diet-plans/generate`, {
          duration,
          goalType,
        });
        setDietPlans([...dietPlans, response.data.dietPlan]);
        return { success: true, data: response.data.dietPlan };
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to generate diet plan';
        setError(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    [API_URL, dietPlans]
  );

  // Get diet plans
  const fetchDietPlans = useCallback(
    async (status = 'active') => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/diet-plans`, {
          params: { status },
        });
        setDietPlans(response.data.dietPlans);
        return response.data.dietPlans;
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch diet plans');
        return [];
      } finally {
        setLoading(false);
      }
    },
    [API_URL]
  );

  // Log food intake
  const logIntake = useCallback(
    async (foodId, quantity, mealType) => {
      setLoading(true);
      try {
        const response = await axios.post(`${API_URL}/intake/log`, {
          foodId,
          quantity,
          mealType,
        });
        setIntakeLog(response.data.intakeLog);
        return { success: true, data: response.data.intakeLog };
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to log intake';
        setError(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    [API_URL]
  );

  // Get today's intake
  const fetchTodayIntake = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/intake/today`);
      setIntakeLog(response.data.intakeLog);
      return response.data.intakeLog;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch intake');
      return null;
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // Remove intake entry
  const removeIntakeEntry = useCallback(
    async (entryId) => {
      try {
        const response = await axios.delete(`${API_URL}/intake/${entryId}`);
        setIntakeLog(response.data.intakeLog);
        return { success: true, data: response.data.intakeLog };
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to remove entry';
        setError(message);
        return { success: false, error: message };
      }
    },
    [API_URL]
  );

  const value = {
    foods,
    dietPlans,
    intakeLog,
    loading,
    error,
    fetchFoods,
    fetchCheapestFoods,
    generateDietPlan,
    fetchDietPlans,
    logIntake,
    fetchTodayIntake,
    removeIntakeEntry,
  };

  return <DietContext.Provider value={value}>{children}</DietContext.Provider>;
};
