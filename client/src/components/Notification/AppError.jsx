import { useEffect, useState } from "react";
import "../../styles/AppError.css";

function AppError({ message, duration = 3000 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;

    setVisible(true);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(hideTimer);
  }, [message, duration]);

  if (!message) return null;

  return (
    <div className={`app-error ${visible ? "show" : "hide"}`}>
      <span className="error-icon">⚠️</span>
      <span>{message}</span>
    </div>
  );
}

export default AppError;
