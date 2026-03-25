import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

function Header({ setShowLogoutModal }) {
    const { currentUser, getUserName, profileImageUrl, profileInitial,idForProfileImg } = useUser();
    const [showDropdown, setShowDropdown] = useState(false);

    const name = getUserName();
    useEffect(() => {
        const handleClickOutside = (e) => {
            const userProfileWrapper = document.querySelector('.user-profile-wrapper');
            if (userProfileWrapper && !userProfileWrapper.contains(e.target)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <header className="app-header">
            <div className="header-container">
                <div className="brand-logo">
                    <img src="/LOGO1.png" alt="Logo" className="brand-image" />
                </div>

                <div className="header-right">
                    <div className="notification-wrapper">
                        <button className="notification-btn">
                            <span className="notification-icon">🔔</span>
                            <span className="notification-badge">3</span>
                        </button>
                    </div>

                    <div className="messages-wrapper">
                        <button className="messages-btn">
                            <span className="messages-icon">💬</span>
                            <span className="messages-badge">2</span>
                        </button>
                    </div>

                    <div className="user-profile-wrapper">
                        <button className="user-profile-btn" onClick={() => setShowDropdown(!showDropdown)}>
                            <div className="user-avatar-container">
                                <img
                                    src={profileImageUrl}
                                    alt="Profile"
                                    className="user-avatar-img"
                                />
                                <span className="user-status-dot"></span>
                            </div>
                            <div className="user-info">
                                <span className="user-display-name">{name}</span>
                                <span className="user-status-text">Online</span>
                            </div>
                            <span className="dropdown-arrow">▼</span>
                        </button>

                        <div className={`user-dropdown-menu ${!showDropdown ? 'hidden' : ''}`}>
                            <div className="dropdown-header">
                                <img
                                    src={`https://i.pravatar.cc/150?img=${idForProfileImg}`}
                                    alt="Profile"
                                    className="dropdown-avatar"
                                />
                                <div className="dropdown-user-info">
                                    <div className="dropdown-name">{name}</div>
                                    <div className="dropdown-email">{currentUser?.email}</div>
                                </div>
                            </div>

                            <div className="dropdown-divider"></div>

                            <Link to="info" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                                <span className="dropdown-icon">👤</span>
                                <span>My Profile</span>
                            </Link>
                            <Link to="/terms" className="dropdown-item">
                                <span className="dropdown-icon">📄</span>
                                <span>Terms of Service</span>
                            </Link>
                            <button className="dropdown-item logout-item" onClick={() => { setShowLogoutModal(true); setShowDropdown(false); }}>
                                <span className="dropdown-icon">⏚</span>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;