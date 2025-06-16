import React from 'react';
import '../styles/Topbar.css';
import { FaEnvelope, FaBell, FaUserCircle, FaQuestionCircle } from 'react-icons/fa';

const Topbar = () => {
  return (
    <div className="topbar">
      <h1 className="logo">SlabWare</h1>
      <div className="topbar-icons">
        <FaEnvelope className="icon" />
        <FaBell className="icon" />
        <FaQuestionCircle className="icon" />
        <FaUserCircle className="icon" />
      </div>
    </div>
  );
};

export default Topbar;