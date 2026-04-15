import React from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (task: Task) => void;
}

const PRIORITY_COLORS: Record<Task['priority'], string> = {
  High: '#e74c3c',
  Medium: '#f39c12',
  Low: '#2ecc71',
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const handleDelete = () => {
    if (window.confirm(`Delete "${task.title}"?`)) {
      onDelete(task.id);
    }
  };

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  };

  const isOverdue =
    task.dueDate &&
    !task.isCompleted &&
    new Date(task.dueDate) < new Date();

  return (
    <div className={`task-item ${task.isCompleted ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-item-header">
        <div className="task-title-row">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => onToggleComplete(task)}
            title={task.isCompleted ? 'Mark as pending' : 'Mark as complete'}
          />
          <h3 className={task.isCompleted ? 'strikethrough' : ''}>{task.title}</h3>
          <span
            className="priority-badge"
            style={{ backgroundColor: PRIORITY_COLORS[task.priority] }}
          >
            {task.priority}
          </span>
        </div>
        <div className="task-actions">
          <button className="btn-edit" onClick={() => onEdit(task)} title="Edit task">
            ✏️
          </button>
          <button className="btn-delete" onClick={handleDelete} title="Delete task">
            🗑️
          </button>
        </div>
      </div>

      {task.description && <p className="task-description">{task.description}</p>}

      <div className="task-meta">
        <span className="task-status">
          {task.isCompleted ? '✅ Completed' : '⏳ Pending'}
        </span>
        {task.dueDate && (
          <span className={`task-due ${isOverdue ? 'overdue-text' : ''}`}>
            📅 Due: {formatDate(task.dueDate)}{isOverdue ? ' (Overdue)' : ''}
          </span>
        )}
        <span className="task-created">
          Created: {formatDate(task.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;
