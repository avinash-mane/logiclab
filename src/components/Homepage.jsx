import React from 'react';
import './Homepage.css';

const jsLogo = "https://raw.githubusercontent.com/github/explore/main/topics/javascript/javascript.png";
const reactLogo = "https://raw.githubusercontent.com/github/explore/main/topics/react/react.png";
const nodeLogo = "https://raw.githubusercontent.com/github/explore/main/topics/nodejs/nodejs.png";
const dbLogo = "https://raw.githubusercontent.com/github/explore/main/topics/postgresql/postgresql.png";
const htmlLogo = "https://raw.githubusercontent.com/github/explore/main/topics/html/html.png";
const cssLogo = "https://raw.githubusercontent.com/github/explore/main/topics/css/css.png";
const logicLogo = "https://cdn-icons-png.flaticon.com/512/3107/3107734.png"; // Brain icon
const dsLogo = "https://cdn-icons-png.flaticon.com/512/5995/5995578.png";
const nextjsLogo = "https://raw.githubusercontent.com/github/explore/main/topics/nextjs/nextjs.png";

const courses = [
  { name: 'Logic Building', icon: <img src={logicLogo} alt="Logic Building" style={{height:48, width:48}} /> },
  { name: 'Data Structure', icon: <img src={dsLogo} alt="Data Structure" style={{height:48, width:48}} /> },
  { name: 'JavaScript', icon: <img src={jsLogo} alt="JavaScript" style={{height:48, width:48}} /> },
  { name: 'React', icon: <img src={reactLogo} alt="React" style={{height:48, width:48}} /> },
  { name: 'Next.js', icon: <img src={nextjsLogo} alt="Next.js" style={{height:48, width:48}} /> },
  { name: 'Node.js', icon: <img src={nodeLogo} alt="Node.js" style={{height:48, width:48}} /> },
  { name: 'Database', icon: <img src={dbLogo} alt="Database" style={{height:48, width:48}} /> },
  { name: 'HTML', icon: <img src={htmlLogo} alt="HTML" style={{height:48, width:48}} /> },
  { name: 'CSS', icon: <img src={cssLogo} alt="CSS" style={{height:48, width:48}} /> }
];

function Homepage({ onRegisterClick, onAdminClick }) {
  return (
    <div className="homepage">
      <div className="admin-link-container">
        <button className="admin-link-button" onClick={onAdminClick}>
          Login
        </button>
      </div>
      <header className="hero-section">
        <div className="container">
          <div className="logo-container">
            <h1 className="institute-name">LogicLab Institute</h1>
          </div>
          <h1 className="hero-title">Your 4 Years Loss <span className="highlight-text">Recovered</span> in 4 Months</h1>
          <p className="hero-subtitle">
            <span>
              Once a member, always a member.<br/> Lifetime access for <span style={{fontWeight: 700, color: '#27ae60'}}><b>₹12,000</b></span> only, limited time offer!
              <br/> Starting from 1st January 2026.
            </span>
          </p>
          <div>
          <button className="cta-button" onClick={onRegisterClick}>
            Book Your Demo Class Now
          </button>
          </div>
        </div>
      </header>

      <section className="courses-section">
        <div className="container">
          <h2 className="section-title">What package includes?</h2>
          <div className="courses-grid">
            {courses.map((course, index) => (
              <div key={index} className="course-card">
                <div className="course-icon">{course.icon}</div>
                <h3 className="course-name">{course.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                {/* Icon: Project Guide */}
                <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
                  <rect x="12" y="10" width="40" height="44" rx="7" fill="#34ace0"/>
                  <rect x="20" y="18" width="24" height="4" rx="2" fill="#fff"/>
                  <rect x="20" y="28" width="16" height="4" rx="2" fill="#fff"/>
                  <rect x="20" y="38" width="12" height="4" rx="2" fill="#fff"/>
                </svg>
              </div>
              <h3>End-to-End Complete Project Guide</h3>
              <p>Step-by-step guidance to build real-world projects from scratch to deployment.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                {/* Icon: Interview (two users facing each other) */}
                <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
                  {/* Left person */}
                  <circle cx="20" cy="24" r="8" fill="#4F8EF7"/>
                  <rect x="12" y="32" width="16" height="10" rx="5" fill="#cfd9f9"/>
                  {/* Right person */}
                  <circle cx="44" cy="24" r="8" fill="#ffb300"/>
                  <rect x="36" y="32" width="16" height="10" rx="5" fill="#fbe491"/>
                  {/* Table */}
                  <rect x="16" y="40" width="32" height="4" rx="2" fill="#e6e6e6"/>
                </svg>
              </div>
              <h3>Mock Interview with Industry Experts</h3>
              <p>Practice real interview scenarios with professionals to boost your confidence and skill.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Learn the skills that companies wants</h2>
          <p>Book a free demo class and see what we have to offer</p>
          <button className="cta-button-secondary" onClick={onRegisterClick}>
            Register Now
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 LogicLab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;

