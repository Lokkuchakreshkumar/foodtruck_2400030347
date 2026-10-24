import React from 'react';

function DeleteConfirmModal({ truck, isDeleting, onConfirm, onCancel }) {
  if (!truck) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)' }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content custom-modal-content">
          <div className="modal-header border-secondary border-opacity-25 pb-3">
            <div className="d-flex align-items-center gap-2">
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  color: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem'
                }}
              >
                <i className="bi bi-trash3-fill"></i>
              </div>
              <h5 className="modal-title brand-font text-white fw-bold mb-0">Confirm Deletion</h5>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onCancel}
              disabled={isDeleting}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body py-4">
            <p className="text-secondary mb-3">
              Are you sure you want to delete this food truck from the database? This action permanent and cannot be undone.
            </p>

            {/* Truck Preview Card */}
            <div className="p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="badge bg-secondary text-uppercase fw-semibold" style={{ fontSize: '0.75rem' }}>
                  ID #{truck.id}
                </span>
                <span className={`badge ${truck.operating ? 'bg-success' : 'bg-danger'}`}>
                  {truck.operating ? 'Operating' : 'Closed'}
                </span>
              </div>
              <h5 className="text-white fw-bold mb-1">{truck.truckName}</h5>
              <div className="d-flex justify-content-between text-secondary small">
                <span>Cuisine: <strong className="text-white">{truck.cuisine}</strong></span>
                <span>Daily Sales: <strong className="text-warning">${Number(truck.dailySales).toFixed(2)}</strong></span>
              </div>
            </div>
          </div>

          <div className="modal-footer border-secondary border-opacity-25 pt-3">
            <button
              type="button"
              className="btn btn-outline-custom"
              onClick={onCancel}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              type="button"
              id="confirm-delete-button"
              className="btn btn-danger px-4 d-flex align-items-center gap-2"
              onClick={() => onConfirm(truck.id)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-trash3-fill"></i>
                  <span>Delete Record</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
