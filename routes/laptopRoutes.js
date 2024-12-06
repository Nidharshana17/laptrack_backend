const express = require('express');
const router = express.Router();
const Laptop = require('../models/Laptop');

// Add a new laptop
router.post('/add', async (req, res) => {
    const { brand, model, serialNumber, purchaseDate } = req.body;
    try {
        const laptop = new Laptop({ brand, model, serialNumber, purchaseDate });
        await laptop.save();
        res.status(201).json({ message: 'Laptop added successfully', laptop });
    } catch (err) {
        res.status(500).json({ message: 'Error adding laptop', error: err.message });
    }
});

// Get all laptops
router.get('/', async (req, res) => {
    try {
        const laptops = await Laptop.find();
        res.status(200).json(laptops);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching laptops', error: err.message });
    }
});

// Other routes for update, delete, etc.

module.exports = router;
