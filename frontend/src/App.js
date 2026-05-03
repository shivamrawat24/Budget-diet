import React, { useState } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { DietProvider } from './context/DietContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthProvider>
      <DietProvider>
        <div className="app">
          {isAuthenticated ? (
            <DashboardPage onLogout={handleLogout} />
          ) : (
            <LoginPage onLoginSuccess={handleLoginSuccess} />
          )}
        </div>
      </DietProvider>
    </AuthProvider>
  );
}

export default App;
