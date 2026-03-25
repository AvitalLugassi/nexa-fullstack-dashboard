import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import LogoutModal from "../components/Notification/LogoutModal.jsx";
import "../styles/Home.css";
import SideBar from "../components/SideBar.jsx";
import Header from "../components/Header.jsx";
import { useUser } from "../context/UserContext";

function Home() {
    const { currentUser, getUserName } = useUser();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const location = useLocation();

    return (
        <div className="home-wrapper">
            <Header setShowLogoutModal={setShowLogoutModal} />

            <div className="home-main-layout">
                <SideBar />

                <main className="home-content">
                    {location.pathname.split("/").length === 3 ? (
                        <div className="main-content">
                            <div className="content-container">
                                <div className="create-post-card">
                                    <div className="create-post-header">
                                        <img
                                            src={`https://i.pravatar.cc/150?img=${currentUser?.id}`}
                                            alt="Profile"
                                            className="create-post-avatar"
                                        />
                                        <input
                                            type="text"
                                            placeholder="What's on your mind?"
                                            className="create-post-input"
                                        />
                                    </div>
                                    <div className="create-post-actions">
                                        <button className="action-btn">📷 Photo</button>
                                        <button className="action-btn">📹 Video</button>
                                        <button className="action-btn">😊 Feeling</button>
                                        <button className="post-submit-btn">Share</button>
                                    </div>
                                </div>

                                <div className="stats-card">
                                    <h3 className="stats-title">Your Activity</h3>
                                    <div className="stats-grid">
                                        <div className="stat-item">
                                            <div className="stat-icon">✓</div>
                                            <div className="stat-info">
                                                <div className="stat-number">12</div>
                                                <div className="stat-label">Active Todos</div>
                                            </div>
                                        </div>
                                        <div className="stat-item">
                                            <div className="stat-icon">✎</div>
                                            <div className="stat-info">
                                                <div className="stat-number">24</div>
                                                <div className="stat-label">Posts</div>
                                            </div>
                                        </div>
                                        <div className="stat-item">
                                            <div className="stat-icon">🖼</div>
                                            <div className="stat-info">
                                                <div className="stat-number">8</div>
                                                <div className="stat-label">Albums</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="feed-section">
                                    <h3 className="feed-title">Latest Updates</h3>

                                    <div className="post-card">
                                        <div className="post-header">
                                            <img
                                                src="https://i.pravatar.cc/150?img=2"
                                                alt="User"
                                                className="post-avatar"
                                            />
                                            <div className="post-user-info">
                                                <div className="post-user-name">Nicolas Runolfsson</div>
                                                <div className="post-time">2 hours ago</div>
                                            </div>
                                            <button className="post-menu-btn">⋮</button>
                                        </div>
                                        <div className="post-content">
                                            <h4 className="post-title">Amazing Day at the Beach</h4>
                                            <p className="post-text">
                                                Just finished an amazing day at the beach! The weather
                                                was perfect and the views were breathtaking. Can't wait
                                                to go back next weekend.
                                            </p>
                                        </div>
                                        <div className="post-actions">
                                            <button className="post-action-btn">
                                                <span>👍</span>
                                                <span>Like</span>
                                            </button>
                                            <button className="post-action-btn">
                                                <span>💬</span>
                                                <span>Comment</span>
                                            </button>
                                            <button className="post-action-btn">
                                                <span>🔗</span>
                                                <span>Share</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="post-card">
                                        <div className="post-header">
                                            <img
                                                src="https://i.pravatar.cc/150?img=3"
                                                alt="User"
                                                className="post-avatar"
                                            />
                                            <div className="post-user-info">
                                                <div className="post-user-name">Chelsey Dietrich</div>
                                                <div className="post-time">5 hours ago</div>
                                            </div>
                                            <button className="post-menu-btn">⋮</button>
                                        </div>
                                        <div className="post-content">
                                            <h4 className="post-title">New Project Launch</h4>
                                            <p className="post-text">
                                                Excited to announce the launch of our new project! After
                                                months of hard work and dedication, we finally brought
                                                our vision to life. Thanks to everyone who supported us
                                                along the way!
                                            </p>
                                        </div>
                                        <div className="post-actions">
                                            <button className="post-action-btn">
                                                <span>👍</span>
                                                <span>Like</span>
                                            </button>
                                            <button className="post-action-btn">
                                                <span>💬</span>
                                                <span>Comment</span>
                                            </button>
                                            <button className="post-action-btn">
                                                <span>🔗</span>
                                                <span>Share</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Outlet />
                    )}
                </main>
            </div>

            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
            />
        </div>
    );
}
export default Home;


