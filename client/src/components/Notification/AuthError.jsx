
import "../../styles/AuthError.css";

function AuthError({ message }) {
    return (
        <div className="auth-error">
            <span className="error-icon">⚠️</span>
            {message}
        </div>
    );
}

export default AuthError;