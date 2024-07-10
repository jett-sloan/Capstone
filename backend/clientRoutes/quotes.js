const express = require("express");
const adminMiddleware = require('../middleware/admin');

const Quote = require("../models/quotes");
const router = new express.Router();



router.post("/", async function(req, res, next) {
    try {
        console.log('Request Body:', req.body);
        const { numberOfWindows, address } = req.body;

        if (!numberOfWindows || !address) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Calculate the quote amount dynamically
        const quoteAmount = numberOfWindows * 10; // Example calculation

        // Create the quote
        const quote = await Quote.create(numberOfWindows, quoteAmount, new Date(), address);
        console.log('Created quote:', quote);
        return res.status(201).json({ quote });
    } catch (error) {
        console.error('Error creating quote:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Admin can view all quotes
router.get('/', adminMiddleware, async (req, res, next) => {
    try {
        const quotes = await Quote.getAll(); // Assuming getAll method is defined in Quote model
        return res.json({ quotes });
    } catch (error) {
        next(error);
    }
});

// Admin can update any quote
router.patch('/:id', adminMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { numberOfWindows, quoteAmount, address } = req.body;
        const quote = await Quote.update(id, numberOfWindows, quoteAmount, address); // Assuming update method is defined in Quote model
        return res.json({ quote });
    } catch (error) {
        next(error);
    }
});

// Admin can delete any quote
router.delete('/:id', adminMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        await Quote.delete(id); // Assuming delete method is defined in Quote model
        return res.json({ deleted: id });
    } catch (error) {
        next(error);
    }
});

module.exports = router;