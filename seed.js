const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://nidhu2004:gN7vqlWDodYexheb@wonder.tzjjc.mongodb.net/?retryWrites=true&w=majority&appName=wonder";

// Replace <username>, <password>, and <clustername> with your credentials.
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const laptopSchema = new mongoose.Schema({
  id: Number,
  brand: String,
  model: String,
  serialNumber: String,
  status: String,
  purchaseDate: String,
});

const employeeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  department: String,
});

const assignmentSchema = new mongoose.Schema({
  id: Number,
  laptopId: Number,
  employeeId: Number,
  assignedAt: String,
  returnedAt: String,
});

const maintenanceSchema = new mongoose.Schema({
  id: Number,
  laptopId: Number,
  description: String,
  status: String,
  cost: Number,
  loggedAt: String,
});

const issueSchema = new mongoose.Schema({
  id: Number,
  laptopId: Number,
  description: String,
  priority: String,
  status: String,
  reportedBy: String,
  reportedAt: String,
});

const Laptop = mongoose.model("Laptop", laptopSchema);
const Employee = mongoose.model("Employee", employeeSchema);
const Assignment = mongoose.model("Assignment", assignmentSchema);
const Maintenance = mongoose.model("Maintenance", maintenanceSchema);
const Issue = mongoose.model("Issue", issueSchema);

const laptops = [
  {
    id: 1,
    brand: "Dell",
    model: "XPS 13",
    serialNumber: "D12345",
    status: "available",
    purchaseDate: "2022-01-15",
  },
  {
    id: 2,
    brand: "HP",
    model: "Spectre x360",
    serialNumber: "H56789",
    status: "assigned",
    purchaseDate: "2023-03-12",
  },
  {
    id: 3,
    brand: "Apple",
    model: "MacBook Pro 14",
    serialNumber: "A98765",
    status: "maintenance",
    purchaseDate: "2021-06-20",
  },
  {
    id: 4,
    brand: "Lenovo",
    model: "ThinkPad X1",
    serialNumber: "L87654",
    status: "available",
    purchaseDate: "2022-09-25",
  },
  {
    id: 5,
    brand: "Acer",
    model: "Swift 3",
    serialNumber: "AC54321",
    status: "assigned",
    purchaseDate: "2023-01-10",
  },
  {
    id: 6,
    brand: "Asus",
    model: "ZenBook",
    serialNumber: "AS12345",
    status: "available",
    purchaseDate: "2022-05-17",
  },
  {
    id: 7,
    brand: "Microsoft",
    model: "Surface Laptop",
    serialNumber: "MS98765",
    status: "maintenance",
    purchaseDate: "2021-11-01",
  },
  {
    id: 8,
    brand: "Samsung",
    model: "Galaxy Book",
    serialNumber: "S54321",
    status: "available",
    purchaseDate: "2023-02-15",
  },
  {
    id: 9,
    brand: "Razer",
    model: "Blade 15",
    serialNumber: "R65432",
    status: "assigned",
    purchaseDate: "2022-08-09",
  },
  {
    id: 10,
    brand: "MSI",
    model: "Stealth 15",
    serialNumber: "MS12398",
    status: "available",
    purchaseDate: "2023-04-05",
  },
];

const employees = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", department: "IT" },

  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    department: "HR",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    department: "Finance",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob.brown@example.com",
    department: "Engineering",
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    department: "Sales",
  },
  {
    id: 6,
    name: "Emily Wilson",
    email: "emily.wilson@example.com",
    department: "Marketing",
  },
  {
    id: 7,
    name: "David Harris",
    email: "david.harris@example.com",
    department: "Operations",
  },
  {
    id: 8,
    name: "Sophia Miller",
    email: "sophia.miller@example.com",
    department: "Legal",
  },
  {
    id: 9,
    name: "Michael Evans",
    email: "michael.evans@example.com",
    department: "IT",
  },
  {
    id: 10,
    name: "Laura Clark",
    email: "laura.clark@example.com",
    department: "Engineering",
  },
];

const assignments = [
  {
    id: 1,
    laptopId: 2,
    employeeId: 1,
    assignedAt: "2023-07-01",
    returnedAt: null,
  },
  {
    id: 2,
    laptopId: 5,
    employeeId: 4,
    assignedAt: "2023-08-15",
    returnedAt: null,
  },
  {
    id: 3,
    laptopId: 9,
    employeeId: 6,
    assignedAt: "2023-06-10",
    returnedAt: "2023-09-20",
  },
  {
    id: 4,
    laptopId: 3,
    employeeId: 8,
    assignedAt: "2022-12-01",
    returnedAt: null,
  },
  {
    id: 5,
    laptopId: 7,
    employeeId: 3,
    assignedAt: "2023-03-05",
    returnedAt: null,
  },
];


const maintenanceLogs = [
  {
    id: 1,
    laptopId: 3,
    description: "Battery issue",
    status: "In Progress",
    cost: 100,
    loggedAt: "2023-09-15",
  },
  {
    id: 2,
    laptopId: 7,
    description: "Screen replacement",
    status: "Completed",
    cost: 250,
    loggedAt: "2023-05-22",
  },
];


const issues = [
  {
    id: 1,
    laptopId: 2,
    description: "Slow performance",
    priority: "Low",
    status: "Open",
    reportedBy: "John Doe",
    reportedAt: "2023-11-05",
  },
  {
    id: 2,
    laptopId: 5,
    description: "Overheating",
    priority: "High",
    status: "Resolved",
    reportedBy: "Alice Johnson",
    reportedAt: "2023-10-15",
  },
  {
    id: 3,
    laptopId: 8,
    description: "Wi-Fi not connecting",
    priority: "Medium",
    status: "In Progress",
    reportedBy: "Sophia Miller",
    reportedAt: "2023-11-20",
  },
];


async function seedDatabase() {
  try {
    await Laptop.insertMany(laptops);
    console.log("Laptops seeded successfully!");

    await Employee.insertMany(employees);
    console.log("Employees seeded successfully!");

    await Assignment.insertMany(assignments);
    console.log("Assignments seeded successfully!");

    await Maintenance.insertMany(maintenanceLogs);
    console.log("Maintenance logs seeded successfully!");

    await Issue.insertMany(issues);
    console.log("Issues seeded successfully!");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
    mongoose.connection.close();
  }
}

seedDatabase();
