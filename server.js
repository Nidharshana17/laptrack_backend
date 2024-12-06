const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON request bodies
app.use(cors()); // Enable CORS

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    // No need for useNewUrlParser or useCreateIndex in Mongoose 6.x.x
    autoIndex: true, // Automatically create indexes if defined in schemas
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Test MongoDB Connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
}).on('error', (err) => {
    console.error('MongoDB Connection Error:', err);
});

// Routes
const laptopRoutes = require('./routes/laptopRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const issueRoutes = require('./routes/issueRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes'); // Import Assignment routes

// Define API Endpoints
app.use('/api/laptops', laptopRoutes); // Laptop management routes
app.use('/api/employees', employeeRoutes); // Employee management routes
app.use('/api/issues', issueRoutes); // Issue reporting routes
app.use('/api/maintenance', maintenanceRoutes); // Maintenance logs routes
app.use('/api/assignments', assignmentRoutes); // Assignment routes

// Base Route
app.get('/', (req, res) => {
    res.send('Welcome to the Laptop Management System API');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
