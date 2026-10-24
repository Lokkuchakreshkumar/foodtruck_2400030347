import React from 'react';

function FoodTruckCard({ truck, onDeleteClick, onToggleOperating }) {
  const isOperating = Boolean(truck.operating);

  return (
    <div className="col-12 col-md-6 col-lg-4 animate-fade-in">
      <div className="glass-panel glass-panel-interactive p-4 h-100 d-flex flex-column justify-content-between position-relative">
        {/* Top Badges */}
        <div>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <span
              className="badge px-2 py-1 rounded-2 text-uppercase fw-semibold"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#94a3b8',
                fontSize: '0.75rem',
                letterSpacing: '0.05em'
              }}
            >
              ID #{truck.id}
            </span>

            <div className={isOperating ? 'badge-operating' : 'badge-inactive'}>
              <span className={`status-dot ${isOperating ? 'status-dot-active' : 'status-dot-inactive'}`}></span>
              <span>{isOperating ? 'Operating' : 'Closed'}</span>
            </div>
          </div>

          {/* Truck Name & Cuisine */}
          <h4 className="brand-font fw-bold text-white mb-2 text-truncate" title={truck.truckName}>
            {truck.truckName}
          </h4>

          <div className="mb-3">
            <span className="cuisine-pill">
              <i className="bi bi-tag-fill me-1"></i>
              {truck.cuisine}
            </span>
          </div>
        </div>

        {/* Sales & Actions */}
        <div className="mt-4 pt-3 border-top border-secondary border-opacity-25">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <span className="text-secondary small d-block">Daily Sales</span>
              <span className="fw-bold fs-4 text-warning">
                ${Number(truck.dailySales || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {onToggleOperating && (
              <button
                type="button"
                className={`btn btn-sm ${isOperating ? 'btn-outline-warning' : 'btn-outline-success'} rounded-pill px-3 py-1`}
                onClick={() => onToggleOperating(truck)}
                title={isOperating ? 'Mark as Closed' : 'Mark as Operating'}
                style={{ fontSize: '0.75rem' }}
              >
                <i className={`bi ${isOperating ? 'bi-moon-stars' : 'bi-sun'} me-1`}></i>
                {isOperating ? 'Set Closed' : 'Set Active'}
              </button>
            )}
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-1 rounded-3 py-2"
              onClick={() => onDeleteClick(truck)}
              id={`delete-truck-btn-${truck.id}`}
            >
              <i className="bi bi-trash3"></i>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodTruckCard;
