import React from 'react';

function StatsCards({ trucks }) {
  const total = trucks.length;
  const operating = trucks.filter((t) => t.operating).length;
  const inactive = total - operating;
  const totalDailySales = trucks.reduce((sum, t) => sum + (Number(t.dailySales) || 0), 0);
  const avgDailySales = total > 0 ? (totalDailySales / total) : 0;

  const stats = [
    {
      id: 'stat-total-trucks',
      title: 'Total Food Trucks',
      value: total,
      subtext: 'Fleet capacity',
      icon: 'bi-truck',
      color: '#38bdf8',
      bg: 'rgba(56, 189, 248, 0.12)',
    },
    {
      id: 'stat-operating-trucks',
      title: 'Actively Operating',
      value: operating,
      subtext: `${total > 0 ? Math.round((operating / total) * 100) : 0}% fleet active`,
      icon: 'bi-broadcast',
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.12)',
      activeDot: true,
    },
    {
      id: 'stat-inactive-trucks',
      title: 'Temporarily Closed',
      value: inactive,
      subtext: 'Maintenance / Closed',
      icon: 'bi-slash-circle',
      color: '#f43f5e',
      bg: 'rgba(244, 63, 94, 0.12)',
    },
    {
      id: 'stat-total-sales',
      title: 'Fleet Daily Revenue',
      value: `$${totalDailySales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtext: `Avg: $${avgDailySales.toFixed(2)} / truck`,
      icon: 'bi-cash-coin',
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.12)',
    },
  ];

  return (
    <div className="row g-3 mb-4 animate-fade-in">
      {stats.map((item) => (
        <div key={item.id} className="col-12 col-sm-6 col-xl-3">
          <div className="glass-panel stat-card h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-secondary small fw-semibold text-uppercase tracking-wider">
                {item.title}
              </span>
              <div
                className="stat-icon"
                style={{ background: item.bg, color: item.color }}
              >
                <i className={`bi ${item.icon}`}></i>
              </div>
            </div>

            <div className="d-flex align-items-baseline gap-2">
              <h3 className="brand-font fw-bold text-white mb-0 fs-2" id={`${item.id}-value`}>
                {item.value}
              </h3>
              {item.activeDot && operating > 0 && (
                <span className="status-dot status-dot-active mb-1"></span>
              )}
            </div>

            <p className="text-secondary small mt-1 mb-0">
              {item.subtext}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
