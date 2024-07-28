const express = require('express');
const router = new express.Router();
const db = require('../db');
const Quote = require('../models/quotes');

router.post("/", async function(req, res, next) {
  const {
    frontWindowsUpstairs,
    frontWindowsDownstairs,
    sideWindowsUpstairs,
    sideWindowsDownstairs,
    backWindowsUpstairs,
    backWindowsDownstairs,
    slidingDoors,
    stories,
    quoteAmount,
    createdAt
  } = req.body;
  console.log(req.body);

  try {
    const newQuote = new Quote({
      frontWindowsUpstairs,
      frontWindowsDownstairs,
      sideWindowsUpstairs,
      sideWindowsDownstairs,
      backWindowsUpstairs,
      backWindowsDownstairs,
      slidingDoors,
      stories,
      quoteAmount,
      createdAt
    });
    await newQuote.save();
    res.status(201).json({ message: 'Quote created successfully', quoteId: newQuote.id  });
  } catch (error) {
    console.error('Error creating quote:', error);
    res.status(500).json({ error: 'Failed to create quote' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM quotes WHERE id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    return res.json(result.rows[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
