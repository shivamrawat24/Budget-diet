import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { DietContext } from '../context/DietContext';
import Navbar from '../components/Navbar';
import IntakeTracker from '../components/IntakeTracker';
import DietPlanGenerator from '../components/DietPlanGenerator';
import FoodBrowser from '../components/FoodBrowser';
import '../styles/pages.css';

const DashboardPage = ({ onLogout }) => {
  const { user, getProfile } = useContext(AuthContext);
  const { fetchFoods } = useContext(DietContext);
  const [activeTab, setActiveTab] = useState('intake');
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await getProfile();
      await fetchFoods();
      setUserLoading(false);
    };
    loadData();
  }, [getProfile, fetchFoods]);

  if (userLoading || !user) {
    return <div className="loading">Loading dashboard...</div>;
  }

  const tabs = [
    { id: 'intake', label: '📊 Daily Intake', icon: '📊' },
    { id: 'plan', label: '🍽️ Generate Plan', icon: '🍽️' },
    { id: 'foods', label: '🥕 Food Database', icon: '🥕' },
    { id: 'profile', label: '👤 Profile', icon: '👤' },
  ];

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={onLogout} />

      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <div className="user-card">
            <h3>{user.name}</h3>
            <p className="user-email">{user.email}</p>
            <div className="user-stats">
              <div className="stat">
                <span className="stat-label">BMI</span>
                <span className="stat-value">{user.bmi}</span>
                <span className="stat-desc">{user.bmiCategory}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Daily Calories</span>
                <span className="stat-value">{user.targetCalories}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Daily Budget</span>
                <span className="stat-value">₹{user.dailyBudget}</span>
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`nav-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="dashboard-main">
          {activeTab === 'intake' && <IntakeTracker targetCalories={user.targetCalories} />}

          {activeTab === 'plan' && <DietPlanGenerator user={user} />}

          {activeTab === 'foods' && <FoodBrowser />}

          {activeTab === 'profile' && (
            <div className="profile-tab">
              <h2>Your Profile</h2>
              <div className="profile-details">
                <div className="detail-row">
                  <span className="label">Name:</span>
                  <span className="value">{user.name}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Email:</span>
                  <span className="value">{user.email}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Age:</span>
                  <span className="value">{user.age} years</span>
                </div>
                <div className="detail-row">
                  <span className="label">Height / Weight:</span>
                  <span className="value">
                    {user.height} cm / {user.weight} kg
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">BMI:</span>
                  <span className="value">
                    {user.bmi} ({user.bmiCategory})
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">Activity Level:</span>
                  <span className="value">{user.activityLevel}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Daily Calorie Need:</span>
                  <span className="value">{user.dailyCalorieNeed} kcal</span>
                </div>
                <div className="detail-row">
                  <span className="label">Goal:</span>
                  <span className="value">{user.goal}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Diet Preference:</span>
                  <span className="value">{user.dietPreference}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Daily Budget:</span>
                  <span className="value">₹{user.dailyBudget}</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
