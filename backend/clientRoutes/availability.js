const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const { day } = req.query;  // Pass the date as a query parameter

    if (!day) {
        return res.status(400).json({ error: 'Day is required' });
    }

    try {
        // Fetch all time slots for the given day
        const allSlots = [
            '08:00', '10:00', '12:00', '14:00', 
            '16:00', '18:00', 
        ];

        // Fetch booked slots for the given day
        const result = await db.query('SELECT daytime FROM availability WHERE day = $1 AND isBooked = TRUE', [day]);
        
        const bookedSlots = result.rows.map(row => row.daytime); // Corrected the key to 'daytime'

        // Determine available slots by filtering out booked slots
        const availableSlots = bookedSlots.length > 0 
            ? allSlots.filter(slot => !bookedSlots.includes(slot))
            : allSlots; // If no booked slots, all slots are available

        res.json({ availableSlots });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Book an appointment
router.post('/', async (req, res) => {
    const { day, daytime } = req.body; // Correctly extract 'day' and 'daytime' from the request body

    console.log('Received data:', { day, daytime }); // Log the incoming data
    
    if (!day || !daytime) {
        return res.status(400).json({ error: 'Day and daytime are required' });
    }

    try {
        // Insert the new appointment
        const result = await db.query(
            'INSERT INTO availability (day, daytime, isBooked) VALUES ($1, $2, TRUE) RETURNING *',
            [day, daytime]
        );
        console.log('Database result:', result); // Log the result for debugging
        res.status(201).json(result.rows[0]); // Send the newly created row as the response
    } catch (error) {
        console.error('Error creating appointment:', error); // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;