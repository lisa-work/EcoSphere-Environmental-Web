require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");

const app = express();
const authRoutes = require("./routes/authRoutes");

// Middleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect Database
connectDB();

// Middleware
app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use("/api/auth", authRoutes);

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));