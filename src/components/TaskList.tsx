import TaskItem from './TaskItem';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
  createdAt: Date;
}

interface Props {
  tasks: Task[];
  deleteTask: (id: number) => void;
  updateTask: (id: number, title: string) => void;
  toggleComplete: (id: number) => void;
}

export default function TaskList({ tasks, deleteTask, updateTask, toggleComplete }: Props) {
  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);

  return (
    <div className="task-list-container">
      {incompleteTasks.length > 0 && (
        <>
          <h3 className="task-list-title">Tâches en cours ({incompleteTasks.length})</h3>
          <ul className="task-list">
            {incompleteTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
                toggleComplete={toggleComplete}
              />
            ))}
          </ul>
        </>
      )}
      
      {completedTasks.length > 0 && (
        <>
          <h3 className="task-list-title">Tâches terminées ({completedTasks.length})</h3>
          <ul className="task-list completed">
            {completedTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
                toggleComplete={toggleComplete}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
