import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/QuoteForm.css'
import { useNavigate } from 'react-router-dom';


const QuoteForm = ({ setIsAllowed }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    frontWindowsUpstairs: '',
    frontWindowsDownstairs: '',
    sideWindowsUpstairs: '',
    sideWindowsDownstairs: '',
    backWindowsUpstairs: '',
    backWindowsDownstairs: '',
    slidingDoors: '',
    stories: ''
  });
  const [setQuote] = useState(null);

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

      const response = await axios.post('http://localhost:5000/quotes', formData);
      const { quoteId } = response.data;
      setQuote(response.data);
      setIsAllowed(true);
      navigate(`/quote-details/${quoteId}`)
    } catch (error) {
      console.error('Error submitting the form:', error);
      // Handle errors, e.g., display an error message
    }
  };

  return (
    <div id="background-image" className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-75">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Request a Quote</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="frontWindowsUpstairs">Number of Front Windows Upstairs:</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    id="frontWindowsUpstairs"
                    name="frontWindowsUpstairs"
                    value={formData.frontWindowsUpstairs}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="frontWindowsDownstairs">Number of Front Windows Downstairs:</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    id="frontWindowsDownstairs"
                    name="frontWindowsDownstairs"
                    value={formData.frontWindowsDownstairs}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="sideWindowsUpstairs">Number of Side Windows Upstairs:</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    id="sideWindowsUpstairs"
                    name="sideWindowsUpstairs"
                    value={formData.sideWindowsUpstairs}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="sideWindowsDownstairs">Number of Side Windows Downstairs:</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    id="sideWindowsDownstairs"
                    name="sideWindowsDownstairs"
                    value={formData.sideWindowsDownstairs}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="backWindowsUpstairs">Number of Back Windows Upstairs:</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    id="backWindowsUpstairs"
                    name="backWindowsUpstairs"
                    value={formData.backWindowsUpstairs}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="backWindowsDownstairs">Number of Back Windows Downstairs:</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    id="backWindowsDownstairs"
                    name="backWindowsDownstairs"
                    value={formData.backWindowsDownstairs}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="slidingDoors">Number of Sliding Doors:</label>
              <input
                type="number"
                min="0"
                className="form-control"
                id="slidingDoors"
                name="slidingDoors"
                value={formData.slidingDoors}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="stories">Number of Stories:</label>
              <select
                className="form-control"
                id="stories"
                name="stories"
                value={formData.stories}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            <button type="submit" className="btn-btn-primary-btn-block">Get Quote</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;

