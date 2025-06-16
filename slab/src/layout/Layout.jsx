// Layout.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './Layout.css';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <header className="mobile-header">
        <button className="hamburger" onClick={toggleSidebar}>
          &#9776;
        </button>
        <h1 className="mobile-title">Granite Inventory</h1>
      </header>

      <div className={`sidebar-wrapper ${isSidebarOpen ? 'open' : ''}`}>
        <Sidebar closeSidebar={closeSidebar} />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}
    </>
  );
};

export default Layout;
