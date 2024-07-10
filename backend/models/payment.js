const db = require('../db');

class Payment {
  constructor(paymentId, orderId, paymentAmount, isPaid) {
    this.paymentId = paymentId;
    this.orderId = orderId;
    this.paymentAmount = paymentAmount;
    this.isPaid = isPaid;
  }

  /** Find all payments */
  static async findAll() {
    const res = await db.query('SELECT * FROM payments');
    return res.rows.map(row => new Payment(
      row.payment_id,
      row.order_id,
      row.payment_amount,
      row.is_paid
    ));
  }

  /** Find a single payment by ID */
  static async findOne(id) {
    const res = await db.query('SELECT * FROM payments WHERE payment_id = $1', [id]);
    const payment = res.rows[0];
    if (!payment) {
      throw new Error(`No payment found with ID ${id}`);
    }
    return new Payment(
      payment.payment_id,
      payment.order_id,
      payment.payment_amount,
      payment.is_paid
    );
  }

  /** Create a new payment */
  static async create(orderId, paymentAmount, isPaid) {
    const res = await db.query(
      'INSERT INTO payments (order_id, payment_amount, is_paid) VALUES ($1, $2, $3) RETURNING *',
      [orderId, paymentAmount, isPaid]
    );
    const newPayment = res.rows[0];
    return new Payment(
      newPayment.payment_id,
      newPayment.order_id,
      newPayment.payment_amount,
      newPayment.is_paid
    );
  }

  /** Update an existing payment */
  static async update(id, updates) {
    const { orderId, paymentAmount, isPaid } = updates;
    const res = await db.query(
      'UPDATE payments SET order_id = $1, payment_amount = $2, is_paid = $3 WHERE payment_id = $4 RETURNING *',
      [orderId, paymentAmount, isPaid, id]
    );
    const updatedPayment = res.rows[0];
    if (!updatedPayment) {
      throw new Error(`No payment found with ID ${id}`);
    }
    return new Payment(
      updatedPayment.payment_id,
      updatedPayment.order_id,
      updatedPayment.payment_amount,
      updatedPayment.is_paid
    );
  }

  /** Delete a payment */
  static async delete(id) {
    const res = await db.query('DELETE FROM payments WHERE payment_id = $1 RETURNING *', [id]);
    const deletedPayment = res.rows[0];
    if (!deletedPayment) {
      throw new Error(`No payment found with ID ${id}`);
    }
    return new Payment(
      deletedPayment.payment_id,
      deletedPayment.order_id,
      deletedPayment.payment_amount,
      deletedPayment.is_paid
    );
  }
}

module.exports = Payment;
