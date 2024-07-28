import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from "emailjs-com";
import { Container, Form, Button } from 'react-bootstrap';
import CalendarComponent from "./CalendarComponent";

const SERVICE_ID = 'service_8bg5p2h';
const TEMPLATE_ID = 'template_yd0ntoa';
const USER_ID = 'jI838wWnY4sBYZrpf';

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

  const sendEmail = async (emailData, recipientEmail) => {
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, { ...emailData, to_email: recipientEmail }, USER_ID);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Failed to send email', error.text);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quoteId = id;
    const day = localStorage.getItem('selectedate');
    const time = localStorage.getItem('selectedtime');

    const orderData = {
      ...formData,
      quoteId,
      day,
      time
    };

    try {
      await axios.post('https://capstone-sigma-three.vercel.app/availability', { day, daytime: time });
      await axios.post('https://capstone-sigma-three.vercel.app/orders', orderData);

      const emailData = {
        user_name: formData.name,
        user_email: formData.email,
        user_address: formData.address,
        user_day: day,
        user_time: time,
      };

      // Send email to yourself
      await sendEmail(emailData, 'jettsloansloan@gmail.com'); // Replace with your email

      // Send confirmation email to the user
      await sendEmail(emailData, formData.email);

      setIsAllowed(true);
      navigate('/thank-you');
    } catch (error) {
      console.error('Failed to place order', error);
    }
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
        <CalendarComponent />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default OrderForm;
