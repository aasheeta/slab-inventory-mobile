import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './LoginPage.css';
import API from "../api"

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
  e.preventDefault();
  try {
    const { data } = await API.post(
      '/api/auth/login', 
      { username, password }
    );
    login(data);       // from AuthContext
    navigate('/');
  } catch (err) {
    alert('Login failed: ' + err.response?.data?.error);
  }
};
  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Granite Inventory Login</h2>
        <div className="form-group">
          <label>Username</label>
          <input 
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-login">Log In</button>
      </form>
    </div>
  );
}
