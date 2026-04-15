const { v4: uuidv4 } = require('uuid');

// In-memory data store (simulates a database)
let tasks = [
  {
    id: uuidv4(),
    title: 'Set up project structure',
    description: 'Initialize the React frontend and Express backend.',
    category: 'Done',
    priority: 'High',
    isCompleted: true,
    createdAt: new Date().toISOString(),
    dueDate: null,
  },
  {
    id: uuidv4(),
    title: 'Build Task API',
    description: 'Implement CRUD endpoints for task management.',
    category: 'In Progress',
    priority: 'High',
    isCompleted: false,
    createdAt: new Date().toISOString(),
    dueDate: null,
  },
  {
    id: uuidv4(),
    title: 'Design UI components',
    description: 'Create TaskForm, TaskItem, TaskList and CategorySlider components.',
    category: 'To Do',
    priority: 'Medium',
    isCompleted: false,
    createdAt: new Date().toISOString(),
    dueDate: null,
  },
];

const TaskStore = {
  getAll: () => [...tasks],

  getById: (id) => tasks.find((t) => t.id === id) || null,

  create: ({ title, description, category, priority, dueDate }) => {
    const task = {
      id: uuidv4(),
      title: title.trim(),
      description: (description || '').trim(),
      category: category || 'To Do',
      priority: priority || 'Medium',
      isCompleted: false,
      createdAt: new Date().toISOString(),
      dueDate: dueDate || null,
    };
    tasks.push(task);
    return task;
  },

  update: (id, updates) => {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...updates, id }; // id cannot be overwritten
    return tasks[index];
  },

  delete: (id) => {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },
};

module.exports = TaskStore;
