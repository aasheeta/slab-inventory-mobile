import React, { useState } from 'react';
import {  FiEdit2, FiTrash2, FiPlus, FiSearch, FiFilter } from 'react-icons/fi';
import './MaterialList.css';

const MaterialList = () => {
  const [materials] = useState([
    {
      id: 1,
      name: 'Honey brown',
      classification: 'Basic',
      composition: 'Granite',
      color: 'Brown'
    },
    {
      id: 2,
      name: 'white',
      classification: 'Exotic',
      composition: 'Marble',
      color: ''
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bill-of-materials">
      <div className="header">
        <h2>Bill of Materials</h2>
        <button className="btn btn-primary">
          <FiPlus /> New
        </button>
      </div>

      <div className="filters">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button className="btn btn-primary">Apply Filter</button>
        <button className="btn btn-secondary">To clean</button>
        <button className="btn-filter">
          <FiFilter /> More Filters
        </button>
      </div>

      <div className="table-container">
        <table className="materials-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Classification</th>
              <th>Composition</th>
              <th>Color</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material.id}>
                <td>{material.name}</td>
                <td>{material.classification}</td>
                <td>{material.composition}</td>
                <td>{material.color}</td>
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
  );
};

export default MaterialList;