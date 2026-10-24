import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import FoodTruckList from './components/FoodTruckList';
import FoodTruckForm from './components/FoodTruckForm';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import ToastNotification from './components/ToastNotification';
import { foodTruckService } from './services/foodTruckService';

function App() {
  const [trucks, setTrucks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'add'
  const [backendStatus, setBackendStatus] = useState({ online: false, message: '' });
  const [truckToDelete, setTruckToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  // Fetch all food trucks
  const fetchTrucks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await foodTruckService.getAllFoodTrucks();
      setTrucks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err);
      showToast('error', err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Health check ping
  const checkHealth = useCallback(async () => {
    const status = await foodTruckService.checkHealth();
    setBackendStatus(status);
  }, []);

  // Initial load
  useEffect(() => {
    fetchTrucks();
    checkHealth();

    // Health poll every 15s
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, [fetchTrucks, checkHealth]);

  // Handle Add Truck
  const handleTruckAdded = async (formData) => {
    const newTruck = await foodTruckService.addFoodTruck(formData);
    setTrucks((prev) => [newTruck, ...prev]);
    showToast('success', `Food Truck "${newTruck.truckName}" added successfully with auto-generated ID #${newTruck.id}!`);
    setActiveTab('list');
    checkHealth();
  };

  // Handle Delete Truck
  const handleConfirmDelete = async (id) => {
    setIsDeleting(true);
    try {
      await foodTruckService.deleteFoodTruck(id);
      setTrucks((prev) => prev.filter((t) => t.id !== id));
      showToast('success', `Food Truck #${id} was deleted successfully.`);
      setTruckToDelete(null);
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Quick toggle operating status
  const handleToggleOperating = async (truck) => {
    try {
      const updated = await foodTruckService.updateFoodTruck(truck.id, {
        ...truck,
        operating: !truck.operating,
      });
      setTrucks((prev) => prev.map((t) => (t.id === truck.id ? updated : t)));
      showToast(
        'success',
        `"${truck.truckName}" is now marked as ${updated.operating ? 'OPERATING' : 'CLOSED'}.`
      );
    } catch (err) {
      showToast('error', `Failed to update status: ${err.message}`);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <Navbar
        backendStatus={backendStatus}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-grow-1 container-fluid px-lg-5 py-4">
        {/* Hero Section */}
        <div className="glass-panel p-4 p-md-5 mb-4 position-relative overflow-hidden">
          <div className="row align-items-center">
            <div className="col-12 col-lg-8">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-warning bg-opacity-10 border border-warning border-opacity-25 text-warning small fw-bold mb-3">
                <i className="bi bi-cpu-fill"></i>
                <span>SOA Cloud Exam • com.klef.soa.docker</span>
              </div>
              <h1 className="brand-font fw-extrabold text-white display-6 mb-2">
                Food Truck Operations & Fleet Portal
              </h1>
              <p className="text-secondary lead fs-6 mb-3" style={{ maxWidth: '640px' }}>
                Full-stack management dashboard with automated identity generation, PostgreSQL persistence, and Spring Boot REST integration.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <button
                  type="button"
                  id="hero-view-fleet-btn"
                  className={`btn ${activeTab === 'list' ? 'btn-accent' : 'btn-outline-custom'}`}
                  onClick={() => setActiveTab('list')}
                >
                  <i className="bi bi-collection-fill me-2"></i>
                  View Fleet Directory ({trucks.length})
                </button>
                <button
                  type="button"
                  id="hero-add-truck-btn"
                  className={`btn ${activeTab === 'add' ? 'btn-accent' : 'btn-outline-custom'}`}
                  onClick={() => setActiveTab('add')}
                >
                  <i className="bi bi-plus-circle-fill me-2"></i>
                  Register Food Truck
                </button>
                <a
                  href="http://localhost:8081/swagger-ui/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-custom"
                >
                  <i className="bi bi-box-arrow-up-right me-2"></i>
                  Swagger Docs
                </a>
              </div>
            </div>

            {/* Quick Hero Indicator */}
            <div className="col-12 col-lg-4 mt-4 mt-lg-0 text-lg-end">
              <div 
                className="d-inline-block p-4 rounded-4 text-start"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  minWidth: '240px'
                }}
              >
                <div className="text-secondary small fw-semibold text-uppercase tracking-wider mb-1">
                  Active Fleet Ratio
                </div>
                <div className="d-flex align-items-baseline gap-2">
                  <h2 className="brand-font text-white fw-bold mb-0">
                    {trucks.filter(t => t.operating).length}
                  </h2>
                  <span className="text-secondary fs-5">/ {trucks.length} trucks</span>
                </div>
                <div className="progress mt-2" style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)' }}>
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{
                      width: `${trucks.length > 0 ? (trucks.filter(t => t.operating).length / trucks.length) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Metrics Cards */}
        <StatsCards trucks={trucks} />

        {/* View Switching */}
        {activeTab === 'add' ? (
          <FoodTruckForm
            onTruckAdded={handleTruckAdded}
            onCancel={() => setActiveTab('list')}
          />
        ) : (
          <FoodTruckList
            trucks={trucks}
            isLoading={isLoading}
            error={error}
            onRefresh={fetchTrucks}
            onDeleteClick={(truck) => setTruckToDelete(truck)}
            onToggleOperating={handleToggleOperating}
            onNavigateAdd={() => setActiveTab('add')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 border-top border-secondary border-opacity-25 mt-auto" style={{ background: 'rgba(11, 15, 25, 0.9)' }}>
        <div className="container-fluid px-lg-5 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 small text-secondary">
          <div>
            <span>Food Truck CRUD Assignment &copy; {new Date().getFullYear()} • </span>
            <span className="text-warning font-monospace">com.klef.soa.docker</span>
          </div>
          <div className="d-flex gap-3">
            <span>Spring Boot 4.x / Java 21</span>
            <span>•</span>
            <span>PostgreSQL 16</span>
            <span>•</span>
            <span>React + Bootstrap 5</span>
          </div>
        </div>
      </footer>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        truck={truckToDelete}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setTruckToDelete(null)}
      />

      {/* Floating Toast Notification */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;
