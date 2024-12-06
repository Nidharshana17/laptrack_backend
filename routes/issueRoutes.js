const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue'); // Make sure you have the Issue model

// Add a new issue
router.post('/', async (req, res) => {
    try {
        const { laptopId, description, priority, status, reportedBy } = req.body;
        const issue = new Issue({
            laptopId,
            description,
            priority,
            status,
            reportedBy,
            reportedAt: new Date(),
        });
        await issue.save();
        res.status(201).json(issue);
    } catch (err) {
        res.status(500).json({ message: 'Error creating issue', error: err.message });
    }
});

// Fetch all issues
router.get('/', async (req, res) => {
    try {
        const issues = await Issue.find();
        res.json(issues);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching issues', error: err.message });
    }
});

module.exports = router;
