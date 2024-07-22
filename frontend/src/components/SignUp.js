import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../css/SignUp.css'

const SignUp = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpassword: ''
  });

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
      if (formData.password !== formData.confirmpassword) {
        alert("Passwords do not match!");
        return;
      }

      // Assuming backend endpoint for registration
      const response = await axios.post('http://localhost:5000/users/register', formData);
      navigate('/login')
      // Optionally navigate to login page or show success message
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle errors, e.g., display an error message
    }
  };

  return (
    <div className='center-screen'>
    <div className="center-div">
    <div className="left-div">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="input-wrapper">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="input-field"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="input-field"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-field"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            className="input-field"
            value={formData.confirmpassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  </div>
</div>
  );
};

export default SignUp;