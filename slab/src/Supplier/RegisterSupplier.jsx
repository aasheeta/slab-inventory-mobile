import React, { useState } from 'react';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import './RegisterSupplier.css';
import API from '../api';

const RegisterSupplier = () => {
  const [formData, setFormData] = useState({
    enterprise: '',
    telephone: '',
    cnpj: '',
    address: '',
    supplierType: '',
    note: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSave = async () => {
  try {
    const res = await API.post('/api/suppliers', formData);
    alert('Supplier registered successfully!');
    console.log('Saved:', res.data);
  } catch (error) {
    console.error('Error saving supplier:', error);
    alert('Failed to register supplier.');
  }
};


  const handleGoBack = () => {
    console.log('Going back');
  };

  const handleAddContact = () => {
    console.log('Adding new contact');
  };

  const handleAddBanking = () => {
    console.log('Adding banking information');
  };

  return (
    <div className="register-supplier-container">
      <div className="header">
        <div className="header-left">
          <h1 className="page-title">Register Supplier</h1>
        </div>
        <div className="header-right">
          <button className="btn-secondary" onClick={handleGoBack}>
            <FiArrowLeft className="btn-icon" />
            To go back
          </button>
          <button className="btn-primary">
            <FiPlus className="btn-icon" />
            New
          </button>
          <button className="btn-success" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>

      <div className="content">
        <div className="form-section">
          <h2 className="section-title">Information</h2>
          <div className="form-grid-supplier">
            <div className="form-group">
              <label className="form-label required">
                Enterprise <span className="required-asterisk">*</span>
              </label>
              <input
                type="text"
                name="enterprise"
                value={formData.enterprise}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Telephone</label>
              <input
                type="text"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Supplier Type</label>
              <select
                name="supplierType"
                value={formData.supplierType}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">(Select Supplier Type)</option>
                <option value="manufacturer">Manufacturer</option>
                <option value="distributor">Distributor</option>
                <option value="retailer">Retailer</option>
                <option value="service">Service Provider</option>
              </select>
            </div>
          </div>
          
          <div className="form-grid-supplier">
            <div className="form-group">
              <label className="form-label">CNPJ</label>
              <input
                type="text"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group full-width-supplier">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Note:</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              className="form-textarea"
              rows="4"
            />
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">
            <h2 className="section-title">Contact List</h2>
            <button className="btn-primary btn-sm" onClick={handleAddContact}>
              <FiPlus className="btn-icon" />
              New
            </button>
          </div>
          <div className="empty-state">
            <p>There is no record or no record was found.</p>
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">
            <h2 className="section-title">Banking Information</h2>
            <button className="btn-primary btn-sm" onClick={handleAddBanking}>
              <FiPlus className="btn-icon" />
              New
            </button>
          </div>
          <div className="empty-state">
            <p>There is no record or no record was found.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSupplier;