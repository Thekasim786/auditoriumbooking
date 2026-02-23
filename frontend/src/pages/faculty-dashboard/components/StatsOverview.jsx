import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    fetch("http://localhost:8080/api/bookings/dashboard", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(data => setDashboardData(data))
      .catch(err => console.error("Dashboard error:", err));
  }, []);

  const stats = [
    {
      label: 'Total Requests',
      value: dashboardData?.totalRequests ?? 0,
      icon: 'FileText',
      bgColor: 'bg-primary/10',
      iconColor: 'var(--color-primary)'
    },
    {
      label: 'Approved',
      value: dashboardData?.approved ?? 0,
      icon: 'CheckCircle',
      bgColor: 'bg-success/10',
      iconColor: 'var(--color-success)'
    },
    {
      label: 'Pending',
      value: dashboardData?.pending ?? 0,
      icon: 'Clock',
      bgColor: 'bg-warning/10',
      iconColor: 'var(--color-warning)'
    },
    {
      label: 'Upcoming Events',
      value: dashboardData?.upcoming ?? 0,
      icon: 'Calendar',
      bgColor: 'bg-secondary/10',
      iconColor: 'var(--color-secondary)'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card rounded-xl border border-border shadow-elevation-1 p-4 md:p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <Icon name={stat.icon} size={24} color={stat.iconColor} />
            </div>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground mb-1">
            {stat.label}
          </p>
          <p className="text-2xl md:text-3xl font-bold text-foreground">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;