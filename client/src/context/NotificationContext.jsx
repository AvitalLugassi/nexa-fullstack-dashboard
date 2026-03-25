import { createContext, useContext, useState } from 'react';
import '../styles/Notifications.css';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const showSuccess = (message) => addNotification(message, 'success');
  const showError = (message) => addNotification(message, 'error');
  const showWarning = (message) => addNotification(message, 'warning');
  const showInfo = (message) => addNotification(message, 'info');

  return (
    <NotificationContext.Provider value={{ showSuccess, showError, showWarning, showInfo }}>
      {children}
      <div className="notification-container">
        {notifications.map(notif => (
          <div key={notif.id} className={`notification ${notif.type}`} onClick={() => removeNotification(notif.id)}>
            <span className="notification-icon">
              {notif.type === 'success' && '✓'}
              {notif.type === 'error' && '✕'}
              {notif.type === 'warning' && '⚠'}
              {notif.type === 'info' && 'ℹ'}
            </span>
            <span className="notification-message">{notif.message}</span>
            <button className="notification-close" onClick={(e) => { e.stopPropagation(); removeNotification(notif.id); }}>×</button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
