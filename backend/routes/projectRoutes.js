const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// POST /api/projects — anyone can create a project (no auth, no userId needed)
router.post('/', async (req, res) => {
  try {
    const {
      projectName,
      description,
      location,
      startDate,
      targetTrees,
      budget,
      teamSize
    } = req.body;

    const newProject = new Project({
      projectName,
      description,
      location,
      startDate,
      targetTrees,
      budget,
      teamSize,
      plantedTrees: 0,
      status: 'planning',
      budgetSpent: 0,
      teamMembers: [], // no user linked
    });

    const savedProject = await newProject.save();

    res.status(201).json(savedProject);
  } catch (error) {
    console.error('❌ Server error in POST /api/projects:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/projects — public, get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

module.exports = router;
