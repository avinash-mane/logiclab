import React, { useState, useEffect } from 'react';
import Homepage from './components/Homepage';
import RegistrationForm from './components/RegistrationForm';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Check if admin is already logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    const token = localStorage.getItem('adminToken');
    if (isLoggedIn && token) {
      setIsAdmin(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setShowLogin(false);
  };

  // Show admin dashboard if logged in
  if (isAdmin) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  // Show login page if login button clicked
  if (showLogin) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Show homepage or registration form
  return (
    <div className="app">
      {!showForm ? (
        <Homepage 
          onRegisterClick={() => setShowForm(true)}
          onAdminClick={() => setShowLogin(true)}
        />
      ) : (
        <RegistrationForm onBackClick={() => setShowForm(false)} />
      )}
    </div>
  );
}

export default App;

