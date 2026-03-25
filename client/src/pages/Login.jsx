import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../API/APIService.js";
import "../styles/Auth.css";
import AuthError from "../components/Notification/AuthError.jsx";
import { useUser } from "../context/UserContext";

function Login() {
  const navigate = useNavigate();
  const {
    login,
    getRememberedUsername,
    setRememberedUsername,
    clearRememberedUsername,
  } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageError, setMessageError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    const rememberedUser = getRememberedUsername();
    if (rememberedUser) {
      setUsername(rememberedUser);
      setRememberMe(true);
    }

    const preventBackNavigation = () => {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => {
        window.history.go(1);
      };
    };

    preventBackNavigation();
    return () => {
      window.onpopstate = null;
    };
  }, []);

  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const authenticateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get("users", { username: username });
      const user = response.data[0];
      if (user && user.website === password) {
        if (rememberMe) {
          setRememberedUsername(username);
        } else {
          clearRememberedUsername();
        }

        login(user);
        navigate(`/users/${user.id}`, { replace: true });
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      setMessageError(
        error.message || "Sign in failed - invalid username or password",
      );
      setTimeout(() => {
        setMessageError("");
        setUsername("");
        setPassword("");
      }, 3000);
    }
  };

  const handleSocialLogin = (provider) => {
    showNotificationMessage(
      `${provider} login coming soon. This feature will be implemented after learning OAuth.`,
    );
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
            <h2 className="brand-tagline">
              Connect to a World of Possibilities
            </h2>
            <p className="brand-description">
              Join our community and share your special moments with friends and
              family
            </p>

            <div className="brand-features">
              <div className="feature-item">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 11a2 2 0 01-2 2H5l-3 3V4a2 2 0 012-2h9a2 2 0 012 2v7z" 
                    stroke="white" strokeWidth="1.5" fill="none"/>
                </svg>
                <span className="feature-text">Share Comments</span>
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
              <h2 className="form-title">Welcome Back</h2>
              <p className="form-subtitle">
                Sign in to your account to continue
              </p>
            </div>

            <form className="auth-form" onSubmit={authenticateUser}>
              <div className="form-group">
                <label className="form-label">Username</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your username"
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkbox-text">Remember me</span>
                </label>
                <a
                  href="https://accounts.google.com/signin/recovery"
                  target="_blank"
                  className="forgot-password"
                >
                  Forgot password?
                </a>
              </div>

              {messageError && <AuthError message={messageError} />}

              <button type="submit" className="submit-btn">
                <span className="btn-text">Sign In</span>
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
                onClick={() => handleSocialLogin("Google")}
              >
                <span className="social-icon">G</span>
                <span>Continue with Google</span>
              </button>
              <button
                className="social-btn facebook-btn"
                type="button"
                onClick={() => handleSocialLogin("Facebook")}
              >
                <span className="social-icon">f</span>
                <span>Continue with Facebook</span>
              </button>
            </div>

            <div className="auth-footer">
              <p className="footer-text">
                Don't have an account?
                <Link to="/register" className="footer-link">
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
