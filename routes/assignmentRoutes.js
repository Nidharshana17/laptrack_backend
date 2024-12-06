const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const Laptop = require('../models/Laptop');
const Employee = require('../models/Employee');

// Assign a laptop to an employee
router.post('/', async (req, res) => {
    try {
        const { laptopId, employeeId } = req.body;

        // Check if laptop and employee exist
        const laptop = await Laptop.findById(laptopId);
        const employee = await Employee.findById(employeeId);

        if (!laptop || !employee) {
            return res.status(404).json({ message: 'Laptop or Employee not found' });
        }

        // Check if the laptop is available
        if (laptop.status !== 'available') {
            return res.status(400).json({ message: 'Laptop is not available' });
        }

        // Create assignment
        const assignment = new Assignment({ laptopId, employeeId });
        await assignment.save();

        // Update laptop status
        laptop.status = 'assigned';
        await laptop.save();

        res.status(201).json(assignment);
    } catch (err) {
        res.status(500).json({ message: 'Error assigning laptop', error: err.message });
    }
});

module.exports = router;
