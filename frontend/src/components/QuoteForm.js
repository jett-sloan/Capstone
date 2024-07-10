import React, { useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/index.css'

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    numberOfWindows: '',
    address: ''
  });
  const [quote, setQuote] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/quotes', formData);
      setQuote(response.data.quote);  // Set the received quote
    } catch (error) {
      console.error('There was an error generating the quote!', error);

    }
  };

  return (
    <div id="background-image"
    className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Request a Quote</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="numberOfWindows">Number of Windows:</label>
              <input
                type="number"
                min="1"
                className="form-control"
                id="numberOfWindows"
                name="numberOfWindows"
                value={formData.numberOfWindows}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Get Quote</button>
          </form>
          {quote && (
            <div className="mt-4">
              <h4>Quote Amount: ${quote.quoteAmount}</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
