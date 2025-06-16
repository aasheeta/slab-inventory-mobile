import React, { useState } from 'react';
import './StockConference.css';

const StockConference = () => {
  const [form, setForm] = useState({
    material: '',
    thickness: '',
    quality: '',
    block: '',
    bundle: '',
    location: '',
    includeReserved: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <div className="stock-conference">
      <div className="page-header">
        <h1>Stock Conference</h1>
        <div className="button-group">
          <button className="btn-grey">To go back</button>
          <button className="btn-teal">Save</button>
        </div>
      </div>

      <div className="track-inventory">
        <div className="header-with-button">
          <h2>Track Inventory</h2>
          <button className="btn-blue">Start Stock Check</button>
        </div>
        <div className="instructions">
          {/* <p><strong>Here are the instructions using your SlabWare application to do a Stock Check.</strong></p>
          <p>First you need to check if your application is working properly. <a href="#">Click here</a> to check it.</p>
          <p>Then click on the "Stock Check" button to start the process.</p> */}
          <p>After that, you need to go to the slider menu and click on the “Stock Check” option.</p>
          <p>You can also do this check on your computer - just click on "Start Stock Check".</p>
        </div>
      </div>

      <div className="filter-section">
        <h2>Filter</h2>
        <div className="form-group">
          <label>Material</label>
          <select name="material" value={form.material} onChange={handleChange}>
            <option value="">(Select Material)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Thickness</label>
          <select name="thickness" value={form.thickness} onChange={handleChange}>
            <option value="">(Select Thickness)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Quality</label>
          <select name="quality" value={form.quality} onChange={handleChange}>
            <option value="">(Select Quality)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Block</label>
          <input type="text" name="block" value={form.block} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Bundle</label>
          <input type="text" name="bundle" value={form.bundle} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input type="text" name="location" value={form.location} onChange={handleChange} />
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            name="includeReserved"
            checked={form.includeReserved}
            onChange={handleChange}
          />
          <label>Include Reserved</label>
        </div>

        <div className="export-buttons">
          <button className="btn-excel">📄 Export to Excel</button>
          <button className="btn-excel">📄 Plates</button>
        </div>

        <div className="action-buttons">
          <button className="btn-blue">Filter</button>
          <button className="btn-grey">To clean</button>
        </div>
      </div>

      <div className="stock-details">
        <h2>Stock Details</h2>
        <div className="empty-result">No results found</div>
      </div>
    </div>
  );
};

export default StockConference;
