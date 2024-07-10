import React, { useState, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/login', formData);
      const { token, user } = response.data;
      console.log('Login successful! Token:', token);
      console.log('RESPONSE DATA',response.data)

      // Store token and user info in local storage
      localStorage.setItem('token', token);
      login(user);

      // Redirect to profile page
      navigate('/profile');
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle errors, e.g., display an error message
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="card-title text-center mb-4">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
