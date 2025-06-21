import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './index.css';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [search, setSearch] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sauvegarder les tâches dans localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const addTask = (title: string, priority?: 'low' | 'medium' | 'high') => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      priority,
      createdAt: new Date()
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: number, title: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, title } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="app">
      <button 
        className="mobile-menu-toggle" 
        onClick={toggleMobileMenu}
        aria-label="Ouvrir le menu"
      >
        ☰
      </button>
      
      <Sidebar 
        search={search} 
        setSearch={setSearch} 
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={closeMobileMenu}
      />
      
      <div className="content-wrapper">
        <TaskForm addTask={addTask} />
        
        <main className="main-content">
          <div className="tasks-container">
            <div className="app-header">
              <h1>Mes Tâches</h1>
              <p className="task-count">
                {filteredTasks.filter(t => !t.completed).length} tâches restantes
              </p>
            </div>
            
            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <h3>Aucune tâche trouvée</h3>
                <p>{search ? 'Essayez une autre recherche' : 'Commencez par ajouter une nouvelle tâche'}</p>
              </div>
            ) : (
              <TaskList 
                tasks={filteredTasks} 
                deleteTask={deleteTask} 
                updateTask={updateTask} 
                toggleComplete={toggleComplete} 
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
