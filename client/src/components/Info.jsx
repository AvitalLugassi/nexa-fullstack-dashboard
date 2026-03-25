import { Link } from "react-router-dom";
import "../pages/Register.css";
function Info() {
    return (
        <div className="content-container">
            <div className="content-card">
                <Link to=".." className="back-button">← Back</Link>
                <div className="content-header">
                    <h1 className="content-title">ℹ️ Information</h1>
                    <p className="item-content">Learn more about our platform and features</p>
                </div>
                <div className="items-grid">
                    <div className="item-card">
                        <h3 className="item-title">🎆 About Us</h3>
                        <p className="item-content">We are dedicated to providing you with the best user experience. Our platform is designed to be intuitive, secure, and feature-rich.</p>
                    </div>
                    <div className="item-card">
                        <h3 className="item-title">🔒 Privacy & Security</h3>
                        <p className="item-content">Your privacy and security are our top priorities. We use industry-standard encryption and security measures to protect your data.</p>
                    </div>
                    <div className="item-card">
                        <h3 className="item-title">📞 Contact Support</h3>
                        <p className="item-content">Need help? Our support team is available 24/7 to assist you with any questions or issues you may have.</p>
                    </div>
                    <div className="item-card">
                        <h3 className="item-title">📜 Documentation</h3>
                        <p className="item-content">Access comprehensive guides and documentation to help you make the most of all available features and capabilities.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Info;