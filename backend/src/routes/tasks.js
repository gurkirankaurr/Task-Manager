const express = require('express');
const router = express.Router();
const TaskStore = require('../models/taskStore');

// GET /api/tasks - Retrieve all tasks (optionally filter by category)
router.get('/', (req, res) => {
  try {
    let tasks = TaskStore.getAll();
    const { category } = req.query;
    if (category) {
      tasks = tasks.filter((t) => t.category === category);
    }
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

// GET /api/tasks/:id - Retrieve a single task
router.get('/:id', (req, res) => {
  try {
    const task = TaskStore.getById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
});

// POST /api/tasks - Create a new task
router.post('/', (req, res) => {
  try {
    const { title, description, category, priority, dueDate } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Task title is required' });
    }
    const task = TaskStore.create({ title, description, category, priority, dueDate });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT /api/tasks/:id - Update a task
router.put('/:id', (req, res) => {
  try {
    const allowedFields = ['title', 'description', 'category', 'priority', 'isCompleted', 'dueDate'];
    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }
    const task = TaskStore.update(req.params.id, updates);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', (req, res) => {
  try {
    const deleted = TaskStore.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
