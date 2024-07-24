import React, { useState, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/Login.css';
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
    <div className="login-page">
      <div className="row">
        <div className="col-lg-6"></div>
        <div className="col-lg-6 d-flex align-items-center justify-content-center right-side">
          <div className="form-2-wrapper">
            <div className="logo text-center">
              <h2>Logo</h2>
            </div>
            <h2 className="text-center mb-4">Sign Into Your Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-box">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
             
              <button type="submit" className="btn btn-outline-secondary login-btn w-100 mb-3">Login</button>
            </form>
            <p className="text-center register-test mt-3">Don't have an account? <a href="register-3.html" className="text-decoration-none">Register here</a></p>
          </div>
        </div>
      </div>
      <div id="picture">
        <img alt="hi" src='https://media.istockphoto.com/vectors/child-cleaning-window-vector-id627038840?k=6&m=627038840&s=170667a&w=0&h=d74vuOkRdrSoPTJpm5FrhA4PEbLkb1l0AjHGudlHC1w='/>
        </div>
    </div>
    
  );
};

export default Login;
