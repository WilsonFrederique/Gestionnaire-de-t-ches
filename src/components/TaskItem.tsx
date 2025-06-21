import { useState, useEffect, useRef } from 'react';
import { FiCheck, FiEdit2, FiTrash2, FiFlag, FiClock } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
  createdAt: Date;
}

interface Props {
  task: Task;
  updateTask: (id: number, title: string) => void;
  deleteTask: (id: number) => void;
  toggleComplete: (id: number) => void;
}

export default function TaskItem({ task, updateTask, deleteTask, toggleComplete }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.title);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editing]);

  const handleUpdate = () => {
    if (value.trim()) {
      updateTask(task.id, value);
      setEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUpdate();
    } else if (e.key === 'Escape') {
      setValue(task.title);
      setEditing(false);
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return 'transparent';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        {editing ? (
          <div className="edit-mode">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleUpdate}
              onKeyDown={handleKeyDown}
              className="edit-input"
              ref={editInputRef}
              aria-label="Modifier la tâche"
            />
            <button 
              onClick={handleUpdate} 
              className="confirm-btn"
              aria-label="Confirmer la modification"
            >
              <FiCheck />
            </button>
          </div>
        ) : (
          <>
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="task-checkbox"
                id={`task-${task.id}`}
                aria-label={task.completed ? 'Marquer comme non complétée' : 'Marquer comme complétée'}
              />
              <label htmlFor={`task-${task.id}`} className="checkmark"></label>
            </div>
            
            <div className="task-details">
              <span 
                className="task-title" 
                onClick={() => toggleComplete(task.id)}
              >
                {task.title}
              </span>
              
              <div className="task-meta">
                {task.priority && (
                  <span className="task-priority">
                    <FiFlag color={getPriorityColor()} />
                    {task.priority === 'high' && 'Haute'}
                    {task.priority === 'medium' && 'Moyenne'}
                    {task.priority === 'low' && 'Basse'}
                  </span>
                )}
                
                <span className="task-date">
                  <FiClock />
                  {formatDate(task.createdAt)}
                </span>
              </div>
            </div>
            
            <div className="task-actions">
              <button 
                onClick={() => setEditing(true)} 
                className="edit-btn"
                aria-label="Modifier la tâche"
              >
                <FiEdit2 />
              </button>
              <button 
                onClick={() => deleteTask(task.id)} 
                className="delete-btn"
                aria-label="Supprimer la tâche"
              >
                <FiTrash2 />
              </button>
            </div>
          </>
        )}
      </div>
    </li>
  );
}
