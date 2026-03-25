import { Link, useLocation } from "react-router-dom";
import { useState } from "react"; 
import LogoutModal from "./Notification/LogoutModal.jsx";      

function SideBar() {
    const location = useLocation();
    const isActive = (path) => location.pathname.includes(path);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    return (
        <div className="sidebar">
            <aside className="app-sidebar">
                <nav className="sidebar-nav">
                    <Link to="todos" className={`nav-item ${isActive('todos') ? 'active' : ''}`}>
                        <span className="nav-icon todos-icon"></span>
                        <span className="nav-text">Todos</span>
                    </Link>
                    <Link to="posts" className={`nav-item ${isActive('posts') ? 'active' : ''}`}>
                        <span className="nav-icon posts-icon"></span>
                        <span className="nav-text">Posts</span>
                    </Link>
                    <Link to="albums" className={`nav-item ${isActive('albums') ? 'active' : ''}`}>
                        <span className="nav-icon albums-icon"></span>
                        <span className="nav-text">Albums</span>
                    </Link>
                    <button onClick={() => setShowLogoutModal(true)} className="nav-item logout" style={{ border: 'none', width: '100%', background: 'transparent' }}>
                        <span className="nav-icon logout-icon"></span>
                        <span className="nav-text">Logout</span>
                    </button>
                </nav>
            </aside>
            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
            />
        </div>
    );
}

export default SideBar;