import { useState } from "react";
import { api } from "../API/APIService.js";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Auth.css";
import { useUser } from "../context/UserContext";
import AuthError from "../components/Notification/AuthError.jsx";

function CompleteProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();
  const [messageError, setMessageError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleGeoChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        geo: {
          ...prev.address.geo,
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("users", {
        ...formData,
        username: location.state.username,
        website: location.state.password,
      });
      const currentUser = { ...response.data, website: location.state.password };
      login(currentUser);
      navigate(`/users/${response.data.id}`, { replace: true });
    } catch (error) {
      setMessageError("Error submitting form:" + error);
    }
  };

  return (
    <div className="complete-profile-page">
      <div className="complete-profile-container">
        <div className="complete-profile-header">
          <h2 className="complete-profile-title">Complete Your Profile</h2>
          <p className="complete-profile-subtitle">Fill in your details to unlock the full experience</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="enhanced-form-section">
            <h3 className="enhanced-section-title">Personal Information</h3>
            
            <div className="enhanced-form-group">
              <label className="enhanced-form-label">Full Name</label>
              <div className="enhanced-input-wrapper">
                <span className="enhanced-input-icon">👤</span>
                <input
                  name="name"
                  type="text"
                  className="enhanced-form-input"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="enhanced-form-group">
              <label className="enhanced-form-label">Email Address</label>
              <div className="enhanced-input-wrapper">
                <span className="enhanced-input-icon">📧</span>
                <input
                  name="email"
                  type="email"
                  className="enhanced-form-input"
                  placeholder="Enter your email address"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="enhanced-form-group">
              <label className="enhanced-form-label">Phone Number</label>
              <div className="enhanced-input-wrapper">
                <span className="enhanced-input-icon">📱</span>
                <input
                  name="phone"
                  type="tel"
                  className="enhanced-form-input"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="enhanced-form-section">
            <h3 className="enhanced-section-title">Address Information</h3>
            
            <div className="enhanced-form-row">
              <div className="enhanced-form-group">
                <label className="enhanced-form-label">Street Address</label>
                <div className="enhanced-input-wrapper">
                  <span className="enhanced-input-icon">🏠</span>
                  <input
                    type="text"
                    className="enhanced-form-input"
                    placeholder="Street address"
                    onChange={(e) => handleNestedChange("address", "street", e.target.value)}
                  />
                </div>
              </div>

              <div className="enhanced-form-group">
                <label className="enhanced-form-label">Suite / Apartment</label>
                <div className="enhanced-input-wrapper">
                  <span className="enhanced-input-icon">🚪</span>
                  <input
                    type="text"
                    className="enhanced-form-input"
                    placeholder="Suite, apt, etc."
                    onChange={(e) => handleNestedChange("address", "suite", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="enhanced-form-row">
              <div className="enhanced-form-group">
                <label className="enhanced-form-label">City</label>
                <div className="enhanced-input-wrapper">
                  <span className="enhanced-input-icon">🏙️</span>
                  <input
                    type="text"
                    className="enhanced-form-input"
                    placeholder="City"
                    onChange={(e) => handleNestedChange("address", "city", e.target.value)}
                  />
                </div>
              </div>

              <div className="enhanced-form-group">
                <label className="enhanced-form-label">Zipcode</label>
                <div className="enhanced-input-wrapper">
                  <span className="enhanced-input-icon">📮</span>
                  <input
                    type="text"
                    className="enhanced-form-input"
                    placeholder="Postal code"
                    onChange={(e) => handleNestedChange("address", "zipcode", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="enhanced-form-section">
            <h3 className="enhanced-section-title">Company Information</h3>
            
            <div className="enhanced-form-group">
              <label className="enhanced-form-label">Company Name</label>
              <div className="enhanced-input-wrapper">
                <span className="enhanced-input-icon">🏢</span>
                <input
                  type="text"
                  className="enhanced-form-input"
                  placeholder="Your company name"
                  onChange={(e) => handleNestedChange("company", "name", e.target.value)}
                />
              </div>
            </div>

            <div className="enhanced-form-group">
              <label className="enhanced-form-label">Company Slogan</label>
              <div className="enhanced-input-wrapper">
                <span className="enhanced-input-icon">💡</span>
                <input
                  type="text"
                  className="enhanced-form-input"
                  placeholder="Your company's catch phrase"
                  onChange={(e) => handleNestedChange("company", "catchPhrase", e.target.value)}
                />
              </div>
            </div>

            <div className="enhanced-form-group">
              <label className="enhanced-form-label">Business Type</label>
              <div className="enhanced-input-wrapper">
                <span className="enhanced-input-icon">💼</span>
                <input
                  type="text"
                  className="enhanced-form-input"
                  placeholder="Type of business"
                  onChange={(e) => handleNestedChange("company", "bs", e.target.value)}
                />
              </div>
            </div>
          </div>

          {messageError && <AuthError message={messageError} />}

          <button type="submit" className="enhanced-submit-btn">
            <span className="btn-text">Complete Profile</span>
            <span className="enhanced-btn-icon">✨</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default CompleteProfile;
