import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../API/APIService.js";
import "../styles/Auth.css";
import AuthError from "../components/Notification/AuthError.jsx";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageError, setMessageError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("weak");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const calculatePasswordStrength = (password) => {
    if (password.length < 6) return "weak";
    if (password.length >= 6 && password.length < 10) return "medium";
    if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return "strong";
    return "medium";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!agreeToTerms) {
      setMessageError("You must agree to the Terms of Service");
      return;
    }

    if (password !== confirmPassword) {
      setMessageError("Passwords do not match!");
      return;
    }

    try {
      const response = await api.get('users', { username: username });
      if (response.data.length > 0) {
        throw new Error("Username already exists");
      }
      navigate("/complete-profile", {
        state: { username: username, password: password }
      });

    } catch (error) {
      setMessageError(error.message || "Registration failed - please try again");
      setTimeout(() => {
        setMessageError("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      }, 2000);
    }
  };

  const handleSocialLogin = (provider) => {
    showNotificationMessage(`${provider} signup coming soon! Stay tuned 🚀`);
  };

  const getStrengthText = () => {
    switch (passwordStrength) {
      case "weak": return "Weak password";
      case "medium": return "Medium password";
      case "strong": return "Strong password";
      default: return "Weak password";
    }
  };

  return (
    <div className="auth-page">
      {showNotification && (
        <div className="notification-toast">
          <span className="notification-icon">ℹ️</span>
          <span className="notification-text">{notificationMessage}</span>
        </div>
      )}

      <div className="auth-container">
        <div className="auth-branding">
          <div className="branding-content">
            <div className="brand-logo">
              <img src="/LOGO1.png" alt="Logo" className="brand-image" />
            </div>
            <h2 className="brand-tagline">Join Us Today</h2>
            <p className="brand-description">
              Create a new account and start sharing your special moments
            </p>

            <div className="brand-features">
              <div className="feature-item">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 11a2 2 0 01-2 2H5l-3 3V4a2 2 0 012-2h9a2 2 0 012 2v7z" 
                    stroke="white" strokeWidth="1.5" fill="none"/>
                </svg>
                <span className="feature-text">Share Moments</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💬</span>
                <span className="feature-text">Connect with Friends</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📸</span>
                <span className="feature-text">Create Albums</span>
              </div>
            </div>
          </div>

          <div className="decorative-circle circle-1"></div>
          <div className="decorative-circle circle-2"></div>
          <div className="decorative-circle circle-3"></div>
        </div>

        <div className="auth-form-section">
          <div className="auth-form-container">
            <div className="form-header">
              <h2 className="form-title">Create Account</h2>
              <p className="form-subtitle">Sign up to get started with ConnectFlow</p>
            </div>

            <form className="auth-form" onSubmit={handleRegister}>
              <div className="form-group">
                <label className="form-label">Username</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div className={`strength-fill ${passwordStrength}`}></div>
                  </div>
                  <span className="strength-text">{getStrengthText()}</span>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-input"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <label className="checkbox-label terms-checkbox">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  required
                />
                <span className="checkbox-text">
                  I agree to the <Link to="/terms" className="terms-link">Terms of Service</Link> and Privacy Policy
                </span>
              </label>

              {messageError && <AuthError message={messageError} />}

              <button type="submit" className="submit-btn">
                <span className="btn-text">Create Account</span>
                <span className="btn-icon">→</span>
              </button>
            </form>

            <div className="form-divider">
              <span className="divider-line"></span>
              <span className="divider-text">or</span>
              <span className="divider-line"></span>
            </div>

            <div className="social-login">
              <button
                className="social-btn google-btn"
                type="button"
                onClick={() => handleSocialLogin('Google')}
              >
                <span className="social-icon">G</span>
                <span>Continue with Google</span>
              </button>
              <button
                className="social-btn facebook-btn"
                type="button"
                onClick={() => handleSocialLogin('Facebook')}
              >
                <span className="social-icon">f</span>
                <span>Continue with Facebook</span>
              </button>
            </div>

            <div className="auth-footer">
              <p className="footer-text">
                Already have an account?
                <Link to="/login" className="footer-link">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;