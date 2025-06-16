import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Dashboard from '../components/Dashboard';
import '../styles/Dashboard.css';

const DashboardPage = () => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;