import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

interface Props {
  addTask: (title: string, priority?: 'low' | 'medium' | 'high') => void;
}

export default function TaskForm({ addTask }: Props) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | undefined>(undefined);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title, priority);
      setTitle('');
      setPriority(undefined);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`task-form ${isFocused ? 'focused' : ''}`}
    >
      <div className="input-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ajouter une nouvelle tâche..."
          className="form-input"
          aria-label="Nouvelle tâche"
        />
        <select
          value={priority || ''}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high' | undefined)}
          className="priority-select"
          aria-label="Priorité de la tâche"
        >
          <option value="">Priorité</option>
          <option value="low">Basse</option>
          <option value="medium">Moyenne</option>
          <option value="high">Haute</option>
        </select>
        <button 
          type="submit" 
          className="primary-btn"
          disabled={!title.trim()}
          aria-label="Ajouter la tâche"
        >
          <FiPlus />
          <span>Ajouter</span>
        </button>
      </div>
    </form>
  );
}
