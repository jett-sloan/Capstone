import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap'; 

const QuoteDetails = ({ setIsAllowed }) => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [quote, setQuote] = useState(null); 

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get(`https://capstone-backend-self.vercel.app/quotes/${id}`);
        setQuote(response.data); 
      } catch (error) {
        console.error('Error fetching quote:', error);
        // Handle error fetching quote, e.g., display an error message
      }
    };

    if (id) {
      fetchQuote(); // Fetch quote details when id changes
    }
  }, [id]);

  if (!quote) {
    return <div className="text-center mt-5">Loading...</div>; // Optional loading state
  }
  const handleLinkClick = () => {
    setIsAllowed(true);
    navigate(`/order/${id}`);
  };
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title className="text-center">Quote Details</Card.Title>
          <Card.Text>
            <p>Front Windows Upstairs: {quote.frontwindowsupstairs}</p>
            <p>Front Windows Downstairs: {quote.frontwindowsdownstairs}</p>
            <p>Back Windows Upstairs: {quote.backwindowsupstairs}</p>
            <p>Back Windows Downstairs: {quote.backwindowsdownstairs}</p>
            <p>Side Windows Upstairs: {quote.sidewindowsupstairs}</p>
            <p>Side Windows Downstairs: {quote.sidewindowsdownstairs}</p>
            <p>Sliding Doors: {quote.slidingdoors}</p>
            <p>Amount: {quote.quotamount}</p>
          </Card.Text>
          <div className="text-center">
            <Button variant="primary" onClick={handleLinkClick} >Place Order</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default QuoteDetails;


