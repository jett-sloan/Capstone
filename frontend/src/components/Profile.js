import React, { useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loyaltyStatus, setLoyaltyStatus] = useState('');

  const fetchOrderHistory = useCallback(async () => {
    try {
      const response = await axios.get(https://capstone-backend-self.vercel.app/orders/find?email=${user.email}`);
      setOrderHistory(response.data);
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  }, [user.email]);

  const fetchLoyaltyStatus = useCallback(async () => {
    try {
      const response = await axios.get(`https://capstone-backend-self.vercel.app/orders/loyalty-status?email=${user.email}`);
      setLoyaltyStatus(response.data.status); // Assuming response.data.status is the loyalty status message
    } catch (error) {
      console.error('Error fetching loyalty status:', error);
    }
  }, [user.email]);

  useEffect(() => {
    if (user) {
      fetchOrderHistory();
      fetchLoyaltyStatus();
    }
  }, [user, fetchOrderHistory, fetchLoyaltyStatus]);

  const handleRedeem = async () => {
    try {
      const response = await axios.post('https://capstone-backend-self.vercel.app/orders/redeem', { email: user.email });
      console.log('Free service redeemed:', response.data);

      // Refetch loyalty status and order history after redemption
      fetchLoyaltyStatus();
      fetchOrderHistory();
    } catch (error) {
      console.error('Error redeeming free service:', error.message);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="mt-5">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-4">My Profile</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item><strong>Email:</strong> {user.email}</ListGroup.Item>
            <ListGroup.Item><strong>First Name:</strong> {user.firstname}</ListGroup.Item>
            <ListGroup.Item><strong>Last Name:</strong> {user.lastname}</ListGroup.Item>
          </ListGroup>
          <hr />
          <Card.Title className="mb-4">Order History</Card.Title>
          <ListGroup>
            {orderHistory && Array.isArray(orderHistory) && orderHistory.length > 0 ? (
              orderHistory.map((order, index) => (
                <ListGroup.Item key={index}>
                  Order #{order.order_id} - Created at: {new Date(order.created_at).toLocaleString()} - Name: {order.name} - Address: {order.address} - Day: {order.day} - Time: {order.time}
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>No orders found.</ListGroup.Item>
            )}
          </ListGroup>
          <hr />
          <Card.Title className="mb-4">Loyalty Program</Card.Title>
          <p>{loyaltyStatus}</p>
          {loyaltyStatus && (
            <Button onClick={handleRedeem} variant="primary">
              Redeem Free Service
            </Button>
          )}
          <hr />
          <Link to="/quote">
            <Button variant="primary">Request a Quote</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
