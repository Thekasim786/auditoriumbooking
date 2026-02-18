import React from 'react';
import MainLayout from '../../components/navigation/MainLayout';
import Breadcrumbs from '../../components/navigation/Breadcrumbs';
import StatusDashboard from './components/StatusDashboard';
import StatsOverview from './components/StatsOverview';

const FacultyDashboard = () => {
  React.useEffect(() => {
    sessionStorage.setItem('userRole', 'faculty');
  }, []);

  return (
    <MainLayout userRole="faculty">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs />
        
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Faculty Dashboard
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Welcome back, Prof. Priya Sharma! Manage your auditorium bookings.
          </p>
        </div>

        <StatsOverview />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">        
          {<div className="lg:col-span-3">
            <StatusDashboard />
          </div>}
        </div>
      </div>
    </MainLayout>
  );
};

export default FacultyDashboard;