// models/Project.js
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  targetTrees: { type: Number, required: true },
  plantedTrees: { type: Number, default: 0 },
  status: { type: String, enum: ["active", "completed", "planning", "paused"], default: "planning" },
  budget: { type: Number, required: true },
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  teamSize: { type: Number, default: 0 },
  budgetSpent: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
