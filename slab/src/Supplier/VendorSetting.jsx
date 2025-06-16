import React, { useState } from 'react';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import './VendorSettings.css';

const VendorSettings = () => {
  const [vendorTypes, setVendorTypes] = useState([]);

  const handleGoBack = () => {
    console.log('Going back');
  };

  const handleAddNew = () => {
    console.log('Adding new vendor type');
  };

  return (
    <div className="vendor-settings-container">
      <div className="header">
        <div className="header-left">
          <h1 className="page-title">Vendor Settings</h1>
        </div>
        <div className="header-right">
          <button className="btn-secondary" onClick={handleGoBack}>
            <FiArrowLeft className="btn-icon" />
            To go back
          </button>
        </div>
      </div>

      <div className="content">
        <div className="settings-section">
          <div className="section-header">
            <div className="section-title-container">
              <h2 className="section-title">Type</h2>
              <span className="total-count">Total 0</span>
            </div>
            <button className="btn-primary" onClick={handleAddNew}>
              <FiPlus className="btn-icon" />
              New
            </button>
          </div>
          
          <div className="content-area">
            <div className="empty-state">
              <p>No record found.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSettings;