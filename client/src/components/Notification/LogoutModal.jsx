import { useNavigate } from "react-router-dom";
import "../../styles/Modal.css";
import { useUser } from "../../context/UserContext";

function LogoutModal({ isOpen, onClose }) {
    const navigate = useNavigate();
    const { logout } = useUser();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Logout</h2>
                <p className="modal-message">Are you sure you want to logout?</p>
                <div className="modal-buttons">
                    <button onClick={handleLogout} className="logout-btn confirm">
                        Yes, Logout
                    </button>
                    <button onClick={onClose} className="logout-btn cancel">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LogoutModal;