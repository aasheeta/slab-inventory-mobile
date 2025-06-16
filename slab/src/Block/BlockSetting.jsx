import React, { useState } from 'react';
import './BlockSettings.css';

const BlockSettings = ({ onBackClick }) => {
  const [standardCost, setStandardCost] = useState('');
  
  // Internship items
  const [internships] = useState([
    { id: 1, name: 'Transport', color: '294CFF' },
    { id: 2, name: 'In Production', color: 'FFF833' },
    { id: 3, name: 'Completed', color: '000000' }
  ]);
  
  // Cost items
  const [costs] = useState([
    { id: 1, name: 'origin cost', supplierType: '' },
    { id: 2, name: 'Freight', supplierType: '' },
    { id: 3, name: 'Total Cost', supplierType: '' },
    { id: 4, name: 'PriceList Cost', supplierType: '' },
    { id: 5, name: 'Block\'s Purchase Cost', supplierType: '' }
  ]);

  return (
    <div className="block-settings-page">
      <div className="block-settings-header">
        <h1>Block Settings</h1>
        <button className="back-button" onClick={onBackClick}>
          To go back
        </button>
      </div>

      <div className="standard-cost-container">
        <h2>Standard Cost</h2>
        
        <div className="cost-selection">
          <label>Standard Cost <span className="required">*</span></label>
          <select 
            className="cost-select" 
            value={standardCost} 
            onChange={(e) => setStandardCost(e.target.value)}
          >
            <option value="" disabled selected>(Select Cost)</option>
            <option value="cost1">Cost 1</option>
            <option value="cost2">Cost 2</option>
          </select>
        </div>

        <div className="save-container">
          <button className="save-button">Save</button>
        </div>
      </div>

      <div className="settings-sections">
        <div className="internship-container">
          <div className="section-header">
            <h2>Internship</h2>
            <div className="section-actions">
              <span className="total-badge">Total {internships.length}</span>
              <button className="new-section-button">+ New</button>
            </div>
          </div>

          <table className="settings-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Color</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {internships.map(internship => (
                <tr key={internship.id}>
                  <td>{internship.name}</td>
                  <td>
                    <div 
                      className="color-box" 
                      style={{ backgroundColor: `#${internship.color}` }}
                    >
                      {internship.color}
                    </div>
                  </td>
                  <td>
                    <div className="option-buttons">
                      <button className="edit-btn">✏️</button>
                      <button className="delete-btn">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cost-container">
          <div className="section-header">
            <h2>Cost</h2>
            <div className="section-actions">
              <span className="total-badge">Total {costs.length}</span>
              <button className="new-section-button">+ New</button>
            </div>
          </div>

          <table className="settings-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Supplier Type</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {costs.map(cost => (
                <tr key={cost.id}>
                  <td>{cost.name}</td>
                  <td>{cost.supplierType}</td>
                  <td>
                    <div className="option-buttons">
                      <button className="edit-btn">✏️</button>
                      <button className="delete-btn">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlockSettings;