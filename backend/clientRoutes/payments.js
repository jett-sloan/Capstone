const express = require("express");
const isAdmin = require('../middleware/admin');

const Payment = require("../models/payment");
const router = new express.Router();

router.get('/', isAdmin, async (req, res, next) => {
    try {
      const payments = await Payment.findAll();
      res.json(payments);
    } catch (error) {
      next(error);
    }
  });
  
  // GET a single payment by ID (admin only)
  router.get('/:id', isAdmin, async (req, res, next) => {
    try {
      const payment = await Payment.findOne(req.params.id);
      res.json(payment);
    } catch (error) {
      next(error);
    }
  });
  
  // POST create a new payment
  router.post('/', async (req, res, next) => {
    try {
      const { orderId, paymentAmount, isPaid } = req.body;
      const newPayment = await Payment.create(orderId, paymentAmount, isPaid);
      res.status(201).json(newPayment);
    } catch (error) {
      next(error);
    }
  });
  
  // PUT update an existing payment (admin only)
  router.put('/:id', isAdmin, async (req, res, next) => {
    try {
      const { orderId, paymentAmount, isPaid } = req.body;
      const updatedPayment = await Payment.update(req.params.id, { orderId, paymentAmount, isPaid });
      res.json(updatedPayment);
    } catch (error) {
      next(error);
    }
  });
  
  // DELETE delete a payment (admin only)
  router.delete('/:id', isAdmin, async (req, res, next) => {
    try {
      const deletedPayment = await Payment.delete(req.params.id);
      res.json(deletedPayment);
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = router;