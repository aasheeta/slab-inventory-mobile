import React, { useEffect, useState } from 'react';
import './OrderRegister.css';
import { FiPlus, FiArrowLeft } from 'react-icons/fi';
import API from '../api';

const OrderRegister = () => {
  const [order, setOrder] = useState({
    customerName: '',
    orderDate: '',
    bundles: [],
    notes: '',
    status: 'available'
  });

  const [bundleOptions, setBundleOptions] = useState([]);

  useEffect(() => {
    API.get('/api/bundles')
      .then((res) => {
        const availableBundles = res.data.filter(b => b.status === 'available');
      setBundleOptions(availableBundles);
      })
      .catch((err) => {
        console.error('Failed to load bundles:', err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBundleSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setOrder((prev) => ({
      ...prev,
      bundles: selectedOptions,
    }));
  };

  const handleSave = () => {
    API.post('/api/orders', order)
      .then((res) => alert('Order saved successfully!'))
      .catch((err) => console.error('Failed to save order:', err));
  };

  return (
    <div className="order-register-container">
      <div className="header">
        <h2>Register Order</h2>
        <div className="header-buttons">
          <button className="btn btn-secondary">
            <FiArrowLeft /> To go back
          </button>
          <button className="btn btn-primary">
            <FiPlus /> New
          </button>
          <button className="btn btn-success" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>

      <div className="form-section">
        <div className="form-grid">
          <div className="form-group">
            <label>Customer Name *</label>
            <input
              type="text"
              name="customerName"
              value={order.customerName}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter customer name"
            />
          </div>

          <div className="form-group">
            <label>Order Date *</label>
            <input
              type="date"
              name="orderDate"
              value={order.orderDate}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

              <div className="form-group">
                  <label>Status *</label>
                  <select
                      name="status"
                      value={order.status}
                      onChange={handleChange}
                      className="form-control"
                  >
                      <option value="available">Available</option>
                      <option value="sold">Sold</option>
                  </select>
              </div>


        <div className="form-group">
          <label>Select Bundles *</label>
          <select
            name="bundles"
            multiple
            value={order.bundles}
            onChange={handleBundleSelect}
            className="form-control multi-select"
          >
            {bundleOptions.map((bundle) => (
              <option key={bundle._id} value={bundle._id}>
                {bundle.material} - Block {bundle.block} - Bundle {bundle.bundle}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            rows="4"
            value={order.notes}
            onChange={handleChange}
            className="form-control"
            placeholder="Any special instructions"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderRegister;
