import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './AdminDashboard.css';

function AdminDashboard({ onLogout }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      // Use regular supabase client (anon key) with RLS policies
      const { data, error: fetchError } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });
  
      if (fetchError) {
        console.error('Supabase error:', fetchError);
        setError(fetchError.message || 'Failed to fetch students');
      } else {
        setStudents(data || []);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminLoggedIn');
    onLogout();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredStudents = students.filter(student => {
    const searchLower = searchTerm.toLowerCase();
    return (
      student.name?.toLowerCase().includes(searchLower) ||
      student.email?.toLowerCase().includes(searchLower) ||
      student.phone?.toLowerCase().includes(searchLower) ||
      student.topic?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="container">
          <div className="header-content">
            <h1>LogicLab Admin Dashboard</h1>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="admin-content">
        <div className="container">
          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <h3>Total Students</h3>
                <p>{students.length}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-info">
                <h3>This Month</h3>
                <p>
                  {students.filter(s => {
                    const date = new Date(s.created_at);
                    const now = new Date();
                    return date.getMonth() === now.getMonth() && 
                           date.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
            </div>
          </div>

          <div className="table-section">
            <div className="table-header">
              <h2>Student Registrations</h2>
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or topic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {loading ? (
              <div className="loading">Loading students...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : filteredStudents.length === 0 ? (
              <div className="no-data">
                {searchTerm ? 'No students found matching your search.' : 'No student registrations yet.'}
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="students-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Timing</th>
                      <th>Topic</th>
                      <th>Registered At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, index) => (
                      <tr key={student.id || index}>
                        <td>{index + 1}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.phone}</td>
                        <td>
                          <span className={`timing-badge ${student.timing.toLowerCase()}`}>
                            {student.timing}
                          </span>
                        </td>
                        <td>{student.topic}</td>
                        <td>{formatDate(student.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

