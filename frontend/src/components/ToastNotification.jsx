import React, { useEffect } from 'react';

function ToastNotification({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div
      className="position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1090 }}
    >
      <div
        className="toast show align-items-center text-white border-0 shadow-lg"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{
          background: isSuccess
            ? 'linear-gradient(135deg, #059669, #10b981)'
            : 'linear-gradient(135deg, #dc2626, #ef4444)',
          borderRadius: '12px',
          minWidth: '320px',
          boxShadow: isSuccess
            ? '0 10px 30px rgba(16, 185, 129, 0.4)'
            : '0 10px 30px rgba(239, 68, 68, 0.4)',
        }}
      >
        <div className="d-flex p-3">
          <div className="fs-4 me-3 align-self-center">
            {isSuccess ? (
              <i className="bi bi-check-circle-fill"></i>
            ) : (
              <i className="bi bi-exclamation-circle-fill"></i>
            )}
          </div>
          <div className="toast-body p-0 flex-grow-1 align-self-center">
            <div className="fw-bold">{isSuccess ? 'Success' : 'Error'}</div>
            <div className="small text-white-50">{toast.message}</div>
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
}

export default ToastNotification;
