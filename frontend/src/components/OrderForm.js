import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';
import CalendarComponent from "./CalendarComponent";

const OrderForm = ({ setIsAllowed }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    quoteId: ''
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
    formData.quoteId = id;
    formData.day = localStorage.getItem('selectedate');
    formData.time = localStorage.getItem('selectedtime');
    await axios.post('http://localhost:5000/availability', { day: formData.day, daytime: formData.time });
    const response = await axios.post('http://localhost:5000/orders', formData);
    setIsAllowed(true);
    navigate('/thank-you');
  };

  return (
    <Container className="mt-5">
      <h2>Place Order</h2>
      <Form method="POST" onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.name}
            name="name"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formAddress" className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={formData.address}
            name="address"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <CalendarComponent/>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default OrderForm;
