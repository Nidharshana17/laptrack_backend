const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    laptopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Laptop', required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    status: { type: String, enum: ['open', 'resolved'], default: 'open' },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    reportedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Issue', issueSchema);
