import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import './BundleList.css';
import { Search, Tag, Monitor, Gift, Box, Camera, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const BundleList = () => {
    const { token, logout, user } = useAuth();
  const navigate = useNavigate();
  const [materialValue, setMaterialValue] = useState('');
  const [blockValue, setBlockValue] = useState('');
  const [bundleValue, setBundleValue] = useState('');
  const [bundles, setBundles] = useState([]); // ← State to store fetched bundles

//   useEffect(() => {
//     fetchBundles();
//   }, []);

//   const fetchBundles = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/bundles');
//       setBundles(res.data);
//     } catch (error) {
//       console.error('Failed to fetch bundles:', error);
//     }
//   };


  useEffect(() => {
    API
      .get('/api/bundles', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setBundles(res.data))
      .catch(() => logout());
  }, [token]);

  const handleApplyFilter = () => {
    // You can later add filter logic here
    console.log('Applying filters...');
  };

  const handleClear = () => {
    setMaterialValue('');
    setBlockValue('');
    setBundleValue('');
  };

  const handleClickRegister = () => {
    navigate('/bundle-register');
  };

  
  return (
    <div className="bundle-list-container">
      <div className="bundle-list-header">
        <h2>Bundle List</h2>
        <button onClick={handleClickRegister} className="new-button">
          <span>+</span> New
        </button>
      </div>
      
      <div className="filter-container">
        <div className="filter-row">
          <div className="filter-item">
            <label>Material</label>
            <select 
              value={materialValue} 
              onChange={(e) => setMaterialValue(e.target.value)}
            >
              <option value="">Select</option>
              <option value="marble">Marble</option>
              <option value="granite">Granite</option>
              <option value="quartz">Quartz</option>
            </select>
          </div>
          
          <div className="filter-item">
            <label>Block</label>
            <input 
              type="text" 
              placeholder="(Example: 332145564345)" 
              value={blockValue} 
              onChange={(e) => setBlockValue(e.target.value)}
            />
          </div>
          
          <div className="filter-item">
            <label>Bundle</label>
            <input 
              type="text" 
              placeholder="(Example: 332145564345)" 
              value={bundleValue} 
              onChange={(e) => setBundleValue(e.target.value)}
            />
          </div>
          
          <button className="apply-filter-button" onClick={handleApplyFilter}>
            Apply Filter
          </button>
          
          <button className="clear-button" onClick={handleClear}>
            To clean
          </button>
          
          <button className="more-filters-button">
            <span>≡</span> More Filters
          </button>
        </div>
      </div>
      
      <div className="reports-section">
        <div className="reports-dropdown">
          <button className="reports-button">
            Reports <span className="caret">▼</span>
          </button>
        </div>
        
        <div className="highlights">
          <span className="highlight-label">Highlights:</span>
          <div className="highlight-tags">
            <div className="highlight-tag">
              <Monitor size={16} /> TV Home
            </div>
            <div className="highlight-tag recommended">
              <span className="star">★</span> Recommended
            </div>
            <div className="highlight-tag offer">
              <Tag size={16} /> Offer
            </div>
            <div className="highlight-tag new-arrivals">
              <Box size={16} /> New Arrivals
            </div>
            <div className="highlight-tag photo">
              <Camera size={16} /> Photo
            </div>
            <div className="highlight-tag pre-booking">
              <Calendar size={16} /> Pre-Booking
            </div>
          </div>
        </div>
        
        <div className="total-section">
          <div className="total-display">
            Total 0
          </div>
          <button className="settings-button">
            <span className="gear">⚙</span>
          </button>
        </div>
      </div>
      
      <div className="records-container">
  {bundles.length === 0 ? (
    <div className="no-records-message">
      <div className="dots">
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      <p>There is no record or no record was found.</p>
    </div>
  ) : (
    <div className="table-responsive">
    <table className="bundle-table">
      <thead>
        <tr>
          <th>Material</th>
          <th>Block</th>
          <th>Bundle</th>
          <th>Quality</th>
          <th>Thickness</th>
          <th>Finish</th>
        </tr>
      </thead>
      <tbody>
        {bundles.map((bundle) => (
          <tr key={bundle._id}>
            <td>{bundle.material}</td>
            <td>{bundle.block}</td>
            <td>{bundle.bundle}</td>
            <td>{bundle.quality}</td>
            <td>{bundle.thickness}</td>
            <td>{bundle.finish}</td>
          </tr>
        ))}
      </tbody>
    </table>
     </div>
  )}
</div>

    </div>
  );
};

export default BundleList;