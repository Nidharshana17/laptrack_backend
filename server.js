const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schemas and Models
const laptopSchema = new mongoose.Schema({
  brand: String,
  model: String,
  serialNumber: String,
  status: {
    type: String,
    enum: ["available", "assigned", "maintenance"],
    default: "available",
  },
  purchaseDate: Date,
});

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
});

const assignmentSchema = new mongoose.Schema({
  laptopId: mongoose.Schema.Types.ObjectId,
  employeeId: mongoose.Schema.Types.ObjectId,
  assignedAt: Date,
  returnedAt: Date,
});

const maintenanceSchema = new mongoose.Schema({
  laptopId: mongoose.Schema.Types.ObjectId,
  description: String,
  status: String,
  cost: Number,
  loggedAt: Date,
});

const issueSchema = new mongoose.Schema({
  laptopId: mongoose.Schema.Types.ObjectId,
  description: String,
  priority: { type: String, enum: ["Low", "Medium", "High"] },
  status: { type: String, default: "Open" },
  reportedBy: String,
  reportedAt: Date,
});

const Laptop = mongoose.model("Laptop", laptopSchema);
const Employee = mongoose.model("Employee", employeeSchema);
const Assignment = mongoose.model("Assignment", assignmentSchema);
const Maintenance = mongoose.model("Maintenance", maintenanceSchema);
const Issue = mongoose.model("Issue", issueSchema);

// Sample Hardcoded Authentication
const users = {
  admin: "admin123",
  employee: "employee123",
};

const authenticate = (req, res, next) => {
  const { role, password } = req.headers;
  if (users[role] && users[role] === password) {
    req.role = role;
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// APIs

// 1. Laptop Management
app.post("/api/laptops", authenticate, async (req, res) => {
  try {
    if (req.role !== "admin")
      return res.status(403).json({ message: "Access denied" });
    const laptop = new Laptop(req.body);
    await laptop.save();
    res.status(201).json(laptop);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding laptop", error: err.message });
  }
});

app.get("/api/laptops", authenticate, async (req, res) => {
  try {
    const laptops = await Laptop.find();
    res.json(laptops);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching laptops", error: err.message });
  }
});

app.put("/api/laptops/:id", authenticate, async (req, res) => {
  try {
    if (req.role !== "admin")
      return res.status(403).json({ message: "Access denied" });
    const updatedLaptop = await Laptop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedLaptop);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating laptop", error: err.message });
  }
});

app.delete("/api/laptops/:id", authenticate, async (req, res) => {
  try {
    if (req.role !== "admin")
      return res.status(403).json({ message: "Access denied" });
    await Laptop.findByIdAndDelete(req.params.id);
    res.json({ message: "Laptop deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting laptop", error: err.message });
  }
});

// 2. Employee Management
app.get("/api/employees", authenticate, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: err.message });
  }
});

app.post("/api/assign-laptop", authenticate, async (req, res) => {
  try {
    if (req.role !== "admin")
      return res.status(403).json({ message: "Access denied" });
    const assignment = new Assignment({ ...req.body, assignedAt: new Date() });
    await assignment.save();
    await Laptop.findByIdAndUpdate(req.body.laptopId, { status: "assigned" });
    res.status(201).json(assignment);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error assigning laptop", error: err.message });
  }
});

app.get("/api/employee-laptops/:employeeId", authenticate, async (req, res) => {
  try {
    const laptops = await Assignment.find({
      employeeId: req.params.employeeId,
    }).populate("laptopId");
    res.json(laptops);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching employee laptops", error: err.message });
  }
});

// 3. Maintenance and Issues
app.post("/api/maintenance", authenticate, async (req, res) => {
  try {
    if (req.role !== "admin")
      return res.status(403).json({ message: "Access denied" });
    const log = new Maintenance({ ...req.body, loggedAt: new Date() });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding maintenance log", error: err.message });
  }
});

app.get("/api/maintenance/:laptopId", authenticate, async (req, res) => {
  try {
    const logs = await Maintenance.find({ laptopId: req.params.laptopId });
    res.json(logs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching maintenance logs", error: err.message });
  }
});

app.post("/api/report-issue", authenticate, async (req, res) => {
  try {
    const issue = new Issue({ ...req.body, reportedAt: new Date() });
    await issue.save();
    res.status(201).json(issue);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error reporting issue", error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
