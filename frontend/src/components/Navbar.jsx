import React from 'react';

function Navbar({ backendStatus, activeTab, setActiveTab, onOpenAddModal }) {
  return (
    <header className="app-navbar py-3">
      <div className="container-fluid px-lg-5">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
          {/* Brand */}
          <div className="d-flex align-items-center gap-2">
            <div 
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
                fontSize: '1.4rem'
              }}
            >
              🚚
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <span className="brand-font fw-bold fs-5 text-white">TruckFleet</span>
                <span className="brand-badge">SOA Cloud</span>
              </div>
              <small className="text-secondary" style={{ fontSize: '0.75rem' }}>
                com.klef.soa.docker
              </small>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="d-flex align-items-center gap-2">
            <button
              type="button"
              id="nav-view-trucks"
              className={`btn btn-sm px-3 py-2 rounded-3 ${
                activeTab === 'list'
                  ? 'btn-accent'
                  : 'btn-outline-custom'
              }`}
              onClick={() => setActiveTab('list')}
            >
              <i className="bi bi-grid-fill me-2"></i>
              Fleet Directory
            </button>

            <button
              type="button"
              id="nav-add-truck"
              className={`btn btn-sm px-3 py-2 rounded-3 ${
                activeTab === 'add'
                  ? 'btn-accent'
                  : 'btn-outline-custom'
              }`}
              onClick={() => setActiveTab('add')}
            >
              <i className="bi bi-plus-circle-fill me-2"></i>
              Register Truck
            </button>

            <a
              id="nav-swagger-link"
              href="http://localhost:8081/swagger-ui/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-custom px-3 py-2 rounded-3 text-decoration-none"
              title="Open Swagger OpenAPI Documentation"
            >
              <i className="bi bi-file-earmark-code-fill text-warning me-2"></i>
              Swagger UI
            </a>
          </nav>

          {/* Status Badge */}
          <div className="d-flex align-items-center gap-3">
            <div 
              className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill"
              style={{
                background: backendStatus.online ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: `1px solid ${backendStatus.online ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                fontSize: '0.825rem'
              }}
            >
              <span className={`status-dot ${backendStatus.online ? 'status-dot-active' : 'status-dot-inactive'}`}></span>
              <span className={backendStatus.online ? 'text-success fw-semibold' : 'text-danger fw-semibold'}>
                {backendStatus.online ? 'Backend: Port 8081' : 'Backend: Disconnected'}
              </span>
            </div>

            {activeTab !== 'add' && (
              <button
                type="button"
                id="btn-quick-add"
                className="btn btn-accent btn-sm d-none d-md-flex align-items-center gap-2"
                onClick={() => setActiveTab('add')}
              >
                <i className="bi bi-plus-lg"></i>
                <span>Add Truck</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
