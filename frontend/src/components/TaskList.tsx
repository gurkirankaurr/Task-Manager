import React, { useState } from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  selectedCategory: Task['category'];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  selectedCategory,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const [sortBy, setSortBy] = useState<'createdAt' | 'priority' | 'dueDate'>('createdAt');

  const priorityOrder: Record<Task['priority'], number> = { High: 0, Medium: 1, Low: 2 };

  const filtered = tasks.filter((t) => t.category === selectedCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'priority') {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>{selectedCategory} Tasks ({filtered.length})</h2>
        {filtered.length > 1 && (
          <div className="sort-controls">
            <label>Sort by: </label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
              <option value="createdAt">Date Created</option>
              <option value="priority">Priority</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>
        )}
      </div>

      {sorted.length === 0 ? (
        <div className="empty-state">
          <p>No tasks in <strong>{selectedCategory}</strong>.</p>
          <p>Add a task using the form above.</p>
        </div>
      ) : (
        <div className="task-list">
          {sorted.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
