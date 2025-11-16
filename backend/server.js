const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');

const SERVER_PORT = process.env.PORT || 3000;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb+srv://luunguyenminhtriet021025_db_user:fellix021025@cluster0.7v6gqw3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Mount routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

app.route("/")
    .get((req, res) => {
        res.json({
            message: "Employee & User Management API",
            status: "Server is running",
            endpoints: {
                users: "/api/v1/user",
                employees: "/api/v1/emp"
            }
        })
    })

// Health check endpoint for Vercel
app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development"
    })
})

// Connect to MongoDB
mongoose.connect(DB_CONNECTION_STRING)
    .then(() => {
        console.log("Connected to the database")
    })
    .catch((err) => {
        console.log("Cannot connect to the database", err)
    })

// Export the app for Vercel
module.exports = app;

// Start server only in development (not on Vercel)
if (require.main === module) {
    app.listen(SERVER_PORT, () => {
        console.log(`Server running at http://localhost:${SERVER_PORT}/`)
    })
}
