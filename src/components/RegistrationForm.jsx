import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import './RegistrationForm.css';

function RegistrationForm({ onBackClick }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    timing: '',
    topic: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear message when user starts typing
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Insert directly into Supabase
      const { data, error } = await supabase
        .from('students')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            timing: formData.timing,
            topic: formData.topic
          }
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        setMessage({ type: 'error', text: error.message || 'Registration failed. Please try again.' });
      } else {
        setMessage({ type: 'success', text: 'Registration successful! We will contact you soon.' });
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          timing: '',
          topic: ''
        });
        // Clear success message after 5 seconds
        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'Network error. Please check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-page">
      <div className="container">
        <button className="back-button" onClick={onBackClick}>
          ← Back to Home
        </button>

        <div className="form-container">
          <div className="form-header">
            <h1>Book Your Demo Class</h1>
            <p>Fill in your details and we'll get back to you soon</p>
          </div>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="timing">Preferred Timing *</label>
              <select
                id="timing"
                name="timing"
                value={formData.timing}
                onChange={handleChange}
                required
              >
                <option value="">Select timing</option>
                <option value="Weekend">Weekend</option>
                <option value="Weekdays">Weekdays</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="topic">Topic for demo class *</label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                required
                placeholder="e.g., React, JavaScript, Node.js, etc."
              />
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Registration'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;

