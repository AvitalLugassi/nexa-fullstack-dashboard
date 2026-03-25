import { useState, useEffect } from 'react';
import "../../styles/Modal.css"
let toastId = 0;
const toasts = [];
const listeners = [];

export const showToast = (message, type = 'success') => {
  const id = ++toastId;
  const toast = { id, message, type };
  toasts.push(toast);
  
  listeners.forEach(listener => listener([...toasts]));
  
  setTimeout(() => {
    const index = toasts.findIndex(t => t.id === id);
    if (index > -1) {
      toasts.splice(index, 1);
      listeners.forEach(listener => listener([...toasts]));
    }
  }, 3000);
};

export function Toast() {
  const [toastList, setToastList] = useState([]);

  useEffect(() => {
    listeners.push(setToastList);
    return () => {
      const index = listeners.indexOf(setToastList);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  const removeToast = (id) => {
    const index = toasts.findIndex(t => t.id === id);
    if (index > -1) {
      toasts.splice(index, 1);
      listeners.forEach(listener => listener([...toasts]));
    }
  };

  return (
    <div className="toast-container">
      {toastList.map(toast => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <span className="toast-message">{toast.message}</span>
          <button className="toast-close" onClick={() => removeToast(toast.id)}>×</button>
        </div>
      ))}
    </div>
  );
}

export function ConfirmModal({ isOpen, onConfirm, onCancel, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>⚠️ Confirm Action</h3>
        </div>
        <div className="modal-body">
          <p>{message || "Are you sure you want to delete this item?"}</p>
        </div>
        <div className="modal-actions">
          <button className="modal-btn modal-btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="modal-btn modal-btn-confirm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export function PromptModal({ isOpen, onConfirm, onCancel, message, defaultValue, label }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.input.value;
    onConfirm(value);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>✏️ {message || "Edit"}</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <label className="modal-label">{label || "Value"}</label>
            <input
              name="input"
              type="text"
              className="modal-input"
              defaultValue={defaultValue}
              autoFocus
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="modal-btn modal-btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="modal-btn modal-btn-confirm">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
