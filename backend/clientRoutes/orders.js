const express = require('express');
const router = express.Router();
const Order = require('../models/orders');
const isAdmin = require('../middleware/admin');
const db = require('../db');

// GET all orders (admin only)
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get('/find', async (req, res) => {
  const { email } = req.query;

  try {
    if (!email) {
      throw new Error('Email parameter is required');
    }

    const result = await db.query('SELECT * FROM orders WHERE email = $1', [email]);
    res.json(result.rows); // Return the detailed order history
  } catch (error) {
    console.error('Error fetching order history:', error.message);
    res.status(500).json({ error: `Error fetching order history: ${error.message}` });
  }
});

router.get('/loyalty-status', async (req, res) => {
  const { email } = req.query;
  try {
    const result = await db.query('SELECT COUNT(*) AS order_count FROM orders WHERE email = $1', [email]);
    const orderCount = parseInt(result.rows[0].order_count, 10);
    const freeServices = Math.floor(orderCount / 4);
    let status = '';
    if (freeServices >= 1 ){
      status = `Congratulations! You have earned ${freeServices} free service${freeServices !== 1 ? 's' : ''}.`;
    }
    res.json({ status, freeServices });
  } catch (error) {
      console.error('Error fetching loyalty status:', error);
      res.status(500).json({ error: error.message });
  }
});

router.post('/redeem', async (req, res) => {
  const { email, day, time } = req.body;

  try {
    // Get the current order count
    const result = await db.query('SELECT COUNT(*) AS order_count FROM orders WHERE email = $1', [email]);
    const orderCount = parseInt(result.rows[0].order_count, 10);

    if (orderCount >= 4) {
      // Subtract 4 from the order count (assumed logic to be handled on the frontend or another way)
      const newOrder = await db.query(
        'INSERT INTO orders (email, quote_id, name, address, day, time, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING *',
        [email,null,null,null,day,time,new Date(), new Date()]
      );

      res.json({ message: 'Free service redeemed and order placed successfully', order: newOrder.rows[0] });
    } else {
      res.status(400).json({ message: 'No free services available to redeem' });
    }
  } catch (error) {
    console.error('Error redeeming free service:', error);
    res.status(500).json({ error: error.message });
  }
});


// POST create a new order
router.post('/', async (req, res, next) => {
  try {
    const { quoteId,day, time , name, email, address} = req.body;
    const newOrder = await Order.create( quoteId, day, time, name , email, address );
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

// PUT update an existing order (admin only)
router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const { quoteId,day, time , name, email, address} = req.body;
    const updatedOrder = await Order.update(req.params.id, { quoteId, day, time, name , email, address });
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
});

// DELETE delete an order (admin only)
router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const deletedOrder = await Order.delete(req.params.id);
    res.json(deletedOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
