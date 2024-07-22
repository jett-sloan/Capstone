// src/components/ThankYou.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <Container className="mt-5">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-4">Thank You</Card.Title>
          <Card.Text>
            Thank you for placing your order! We appreciate your business.
          </Card.Text>
          <Link to="/">
            <Button variant="primary">Home</Button>
          </Link>{' '}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ThankYou;
