import React, { useState, useMemo } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import CategorySlider from './components/CategorySlider';
import { Task, TaskFormData, CATEGORIES } from './types';
import useTasks from './hooks/useTasks';
import './styles.css';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Task['category']>('To Do');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { tasks, loading, error, addTask, editTask, removeTask, toggleComplete } = useTasks();

  // Compute task counts per category for the category badge
  const taskCounts = useMemo(() => {
    return CATEGORIES.reduce((acc, cat) => {
      acc[cat] = tasks.filter((t) => t.category === cat).length;
      return acc;
    }, {} as Record<string, number>);
  }, [tasks]);

  const handleFormSubmit = async (data: TaskFormData) => {
    if (editingTask) {
      await editTask(editingTask.id, data);
      setEditingTask(null);
    } else {
      await addTask(data);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1>📋 Task Manager</h1>
        <p className="app-subtitle">
          {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
          {' · '}
          {tasks.filter((t) => t.isCompleted).length} completed
        </p>
      </header>

      <main className="container">
        {/* Error banner */}
        {error && (
          <div className="error-banner">
            ⚠️ {error}
          </div>
        )}

        {/* Task Form */}
        <TaskForm
          onSubmit={handleFormSubmit}
          editingTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        {/* Category Tabs */}
        <CategorySlider
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          taskCounts={taskCounts}
        />

        {/* Task List */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading tasks...</p>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            selectedCategory={selectedCategory}
            onEdit={handleEdit}
            onDelete={removeTask}
            onToggleComplete={toggleComplete}
          />
        )}
      </main>
    </div>
  );
};

export default App;
