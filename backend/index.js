require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const quotesRoutes = require('./clientRoutes/quotes');
const usersRoute = require('./clientRoutes/users');
const ordersRoute = require('./clientRoutes/orders');
const paymentsRoute = require('./clientRoutes/payments');
const availabilityRoute = require('./clientRoutes/availability');

const app = express();


// CORS Configuration
const allowedOrigins = ['https://capstone-frontend-jade.vercel.app'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.set('view engine', 'ejs');
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('tiny')); // Logging middleware
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Routes
app.use('/quotes', quotesRoutes);
app.use('/users', usersRoute);
app.use('/orders', ordersRoute);
app.use('/payments', paymentsRoute);
app.use('/availability', availabilityRoute);

// Error handling middleware
app.use(function(err, req, res, next) {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: { message, status }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



