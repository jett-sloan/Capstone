const express = require('express');
const router = express.Router();
const Order = require('../models/orders');
const isAdmin = require('../middleware/admin');

// GET all orders (admin only)
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// GET a single order by ID (admin only)
router.get('/:id', isAdmin, async (req, res, next) => {
  try {
    const order = await Order.findOne(req.params.id);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// POST create a new order
router.post('/', async (req, res, next) => {
  try {
    const { userId, day, time } = req.body;
    const newOrder = await Order.create(userId, day, time);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

// PUT update an existing order (admin only)
router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const { userId, day, time } = req.body;
    const updatedOrder = await Order.update(req.params.id, { userId, day, time });
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
