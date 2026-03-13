import React, { useState } from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children, userRole = 'faculty' }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
        userRole={userRole}
      />
      
      <main
        className={`main-content ${
          isSidebarCollapsed ? 'sidebar-collapsed' : ''
        } min-h-screen p-6 lg:p-8`}
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;