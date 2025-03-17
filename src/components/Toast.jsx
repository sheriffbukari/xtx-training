import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
};

const Toast = ({ message, type = TOAST_TYPES.INFO, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose && onClose();
      }, 300); // Wait for the fade-out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case TOAST_TYPES.ERROR:
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case TOAST_TYPES.INFO:
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return 'bg-green-100 border-green-400 text-green-800';
      case TOAST_TYPES.ERROR:
        return 'bg-red-100 border-red-400 text-red-800';
      case TOAST_TYPES.INFO:
      default:
        return 'bg-blue-100 border-blue-400 text-blue-800';
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center p-4 mb-4 rounded-lg border ${getBackgroundColor()} transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 mr-2">
        {getIcon()}
      </div>
      <div className="ml-2 text-sm font-medium">{message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 hover:bg-gray-200"
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => {
            onClose && onClose();
          }, 300);
        }}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = TOAST_TYPES.INFO, duration = 3000) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
    return id;
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const success = (message, duration) => addToast(message, TOAST_TYPES.SUCCESS, duration);
  const error = (message, duration) => addToast(message, TOAST_TYPES.ERROR, duration);
  const info = (message, duration) => addToast(message, TOAST_TYPES.INFO, duration);

  const ToastContainer = () => (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );

  return {
    addToast,
    removeToast,
    success,
    error,
    info,
    ToastContainer,
  };
};

export default Toast; 