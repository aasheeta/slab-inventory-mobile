import React, { useState } from 'react';
import {  FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import './MaterialSetting.css';

const MaterialSetting = () => {
  const [classifications] = useState([
    { id: 1, name: 'Basic' },
    { id: 2, name: 'Basic' },
    { id: 3, name: 'Exotic' },
    { id: 4, name: 'Standard' },
    { id: 5, name: 'Super Exotic' }
  ]);

  const [compositions] = useState([
    { id: 1, name: 'Black Marble' },
    { id: 2, name: 'Crystal' },
    { id: 3, name: 'Dolomite Marble' },
    { id: 4, name: 'Granite' },
    { id: 5, name: 'Granite' },
    { id: 6, name: 'Granite-Schist' },
    { id: 7, name: 'Marble' }
  ]);

  const [colors] = useState([
    { id: 1, name: 'Black' },
    { id: 2, name: 'Black and White' }
  ]);

  return (
    <div className="material-settings">
      <div className="header">
        <h2>Material Settings</h2>
        <button className="btn btn-secondary">To go back</button>
      </div>

      <div className="settings-grid">
        <div className="settings-section">
          <div className="section-header">
            <h3>Classifications</h3>
            <div className="section-controls">
              <span className="total">Total 6</span>
              <button className="btn btn-primary">
                <FiPlus /> New
              </button>
            </div>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {classifications.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon">
                          <FiEdit2 />
                        </button>
                        <button className="btn-icon">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <h3>Compositions</h3>
            <div className="section-controls">
              <span className="total">Total 11</span>
              <button className="btn btn-primary">
                <FiPlus /> New
              </button>
            </div>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {compositions.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon">
                          <FiEdit2 />
                        </button>
                        <button className="btn-icon">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <span className="page-active">1</span>
              <span className="page">2</span>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-section full-width">
        <div className="section-header">
          <h3>Color</h3>
          <div className="section-controls">
            <span className="total">Total 20</span>
            <button className="btn btn-primary">
              <FiPlus /> New
            </button>
          </div>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {colors.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon">
                        <FiEdit2 />
                      </button>
                      <button className="btn-icon">
                        <FiTrash2 />
                      </button>
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

export default MaterialSetting