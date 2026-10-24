import React, { useState, useMemo } from 'react';
import FoodTruckCard from './FoodTruckCard';

function FoodTruckList({
  trucks,
  isLoading,
  error,
  onRefresh,
  onDeleteClick,
  onToggleOperating,
  onNavigateAdd,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL', 'OPERATING', 'CLOSED'
  const [sortBy, setSortBy] = useState('ID_DESC');
  const [viewMode, setViewMode] = useState('GRID'); // 'GRID' or 'TABLE'

  // Filtered & sorted trucks
  const processedTrucks = useMemo(() => {
    let list = [...trucks];

    // Search query
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (t) =>
          (t.truckName && t.truckName.toLowerCase().includes(q)) ||
          (t.cuisine && t.cuisine.toLowerCase().includes(q)) ||
          (t.id && String(t.id).includes(q))
      );
    }

    // Status filter
    if (filterStatus === 'OPERATING') {
      list = list.filter((t) => t.operating);
    } else if (filterStatus === 'CLOSED') {
      list = list.filter((t) => !t.operating);
    }

    // Sorting
    list.sort((a, b) => {
      switch (sortBy) {
        case 'ID_DESC':
          return (b.id || 0) - (a.id || 0);
        case 'ID_ASC':
          return (a.id || 0) - (b.id || 0);
        case 'SALES_DESC':
          return (b.dailySales || 0) - (a.dailySales || 0);
        case 'SALES_ASC':
          return (a.dailySales || 0) - (b.dailySales || 0);
        case 'NAME_ASC':
          return (a.truckName || '').localeCompare(b.truckName || '');
        default:
          return 0;
      }
    });

    return list;
  }, [trucks, searchTerm, filterStatus, sortBy]);

  const operatingCount = trucks.filter((t) => t.operating).length;
  const closedCount = trucks.length - operatingCount;

  return (
    <div className="animate-fade-in mb-5">
      {/* Controls Bar */}
      <div className="glass-panel p-3 p-md-4 mb-4">
        <div className="row g-3 align-items-center">
          {/* Search Box */}
          <div className="col-12 col-md-4">
            <div className="search-wrapper">
              <i className="bi bi-search"></i>
              <input
                type="text"
                className="form-control custom-form-control"
                id="search-trucks-input"
                placeholder="Search truck name, cuisine, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="btn btn-sm text-secondary position-absolute top-50 end-0 translate-middle-y me-2 border-0 bg-transparent"
                  onClick={() => setSearchTerm('')}
                >
                  <i className="bi bi-x-circle-fill"></i>
                </button>
              )}
            </div>
          </div>

          {/* Filter Status Tabs */}
          <div className="col-12 col-md-5">
            <div className="d-flex flex-wrap gap-1 bg-dark bg-opacity-50 p-1 rounded-3 border border-secondary border-opacity-25">
              <button
                type="button"
                id="filter-all-btn"
                className={`btn btn-sm px-3 rounded-2 ${
                  filterStatus === 'ALL'
                    ? 'btn-accent'
                    : 'btn-outline-custom border-0 text-secondary'
                }`}
                onClick={() => setFilterStatus('ALL')}
              >
                All ({trucks.length})
              </button>
              <button
                type="button"
                id="filter-operating-btn"
                className={`btn btn-sm px-3 rounded-2 ${
                  filterStatus === 'OPERATING'
                    ? 'btn-accent'
                    : 'btn-outline-custom border-0 text-secondary'
                }`}
                onClick={() => setFilterStatus('OPERATING')}
              >
                Operating ({operatingCount})
              </button>
              <button
                type="button"
                id="filter-closed-btn"
                className={`btn btn-sm px-3 rounded-2 ${
                  filterStatus === 'CLOSED'
                    ? 'btn-accent'
                    : 'btn-outline-custom border-0 text-secondary'
                }`}
                onClick={() => setFilterStatus('CLOSED')}
              >
                Closed ({closedCount})
              </button>
            </div>
          </div>

          {/* Sort & View Mode */}
          <div className="col-12 col-md-3 d-flex justify-content-md-end gap-2 align-items-center">
            <select
              className="form-select form-select-sm custom-form-select"
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="ID_DESC">Newest First</option>
              <option value="ID_ASC">Oldest First</option>
              <option value="SALES_DESC">Sales: High to Low</option>
              <option value="SALES_ASC">Sales: Low to High</option>
              <option value="NAME_ASC">Name: A to Z</option>
            </select>

            {/* View Mode Toggle */}
            <div className="btn-group btn-group-sm">
              <button
                type="button"
                id="view-grid-btn"
                className={`btn ${viewMode === 'GRID' ? 'btn-warning text-dark' : 'btn-outline-custom'}`}
                onClick={() => setViewMode('GRID')}
                title="Grid Card View"
              >
                <i className="bi bi-grid-3x3-gap-fill"></i>
              </button>
              <button
                type="button"
                id="view-table-btn"
                className={`btn ${viewMode === 'TABLE' ? 'btn-warning text-dark' : 'btn-outline-custom'}`}
                onClick={() => setViewMode('TABLE')}
                title="Table View"
              >
                <i className="bi bi-table"></i>
              </button>
            </div>

            <button
              type="button"
              id="refresh-fleet-btn"
              className="btn btn-sm btn-outline-custom"
              onClick={onRefresh}
              disabled={isLoading}
              title="Refresh Data from Server"
            >
              <i className={`bi bi-arrow-repeat ${isLoading ? 'spin-animation' : ''}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger d-flex align-items-center justify-content-between p-3 rounded-3 mb-4">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-exclamation-octagon-fill fs-5"></i>
            <div>
              <strong>Error Loading Data:</strong> {error.message || 'Could not fetch records from backend.'}
            </div>
          </div>
          <button type="button" className="btn btn-sm btn-outline-danger" onClick={onRefresh}>
            Retry Request
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && trucks.length === 0 && (
        <div className="text-center py-5 glass-panel">
          <div className="spinner-border text-warning mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading food trucks...</span>
          </div>
          <h5 className="text-white fw-bold">Connecting to Spring Boot Backend...</h5>
          <p className="text-secondary small">Querying /displayall endpoint from PostgreSQL</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && processedTrucks.length === 0 && (
        <div className="glass-panel text-center py-5 px-3">
          <div 
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(245, 158, 11, 0.1)',
              color: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              margin: '0 auto 20px auto'
            }}
          >
            🚚
          </div>
          <h4 className="brand-font fw-bold text-white mb-2">No Food Trucks Found</h4>
          <p className="text-secondary small mb-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
            {searchTerm || filterStatus !== 'ALL'
              ? 'No trucks matched your search or filter criteria. Try resetting filters.'
              : 'Your fleet database currently has no records. Register your first food truck now!'}
          </p>

          {searchTerm || filterStatus !== 'ALL' ? (
            <button
              type="button"
              className="btn btn-sm btn-outline-custom"
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('ALL');
              }}
            >
              Reset Filters
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-accent"
              onClick={onNavigateAdd}
            >
              <i className="bi bi-plus-lg me-1"></i> Register New Food Truck
            </button>
          )}
        </div>
      )}

      {/* Content: Grid or Table View */}
      {processedTrucks.length > 0 && viewMode === 'GRID' && (
        <div className="row g-4" id="truck-cards-container">
          {processedTrucks.map((truck) => (
            <FoodTruckCard
              key={truck.id}
              truck={truck}
              onDeleteClick={onDeleteClick}
              onToggleOperating={onToggleOperating}
            />
          ))}
        </div>
      )}

      {processedTrucks.length > 0 && viewMode === 'TABLE' && (
        <div className="glass-panel p-2 p-md-3 table-responsive">
          <table className="table custom-table align-middle mb-0" id="truck-records-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>ID</th>
                <th>Truck Name</th>
                <th>Cuisine</th>
                <th>Daily Sales</th>
                <th>Status</th>
                <th style={{ width: '120px' }} className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {processedTrucks.map((truck) => {
                const isOp = Boolean(truck.operating);
                return (
                  <tr key={truck.id} id={`truck-row-${truck.id}`}>
                    <td>
                      <span className="badge bg-secondary bg-opacity-50 text-white font-monospace">
                        #{truck.id}
                      </span>
                    </td>
                    <td>
                      <div className="fw-bold text-white">{truck.truckName}</div>
                    </td>
                    <td>
                      <span className="cuisine-pill">{truck.cuisine}</span>
                    </td>
                    <td>
                      <span className="fw-semibold text-warning">
                        ${Number(truck.dailySales || 0).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </td>
                    <td>
                      <div className={isOp ? 'badge-operating' : 'badge-inactive'}>
                        <span className={`status-dot ${isOp ? 'status-dot-active' : 'status-dot-inactive'}`}></span>
                        <span>{isOp ? 'Operating' : 'Closed'}</span>
                      </div>
                    </td>
                    <td className="text-end">
                      <button
                        type="button"
                        id={`table-delete-btn-${truck.id}`}
                        className="btn btn-sm btn-outline-danger py-1 px-2 rounded-2"
                        onClick={() => onDeleteClick(truck)}
                        title="Delete Food Truck"
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FoodTruckList;
