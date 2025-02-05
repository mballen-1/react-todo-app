import './App.css';
import './index.css';
import { useState, useEffect } from 'react';
import TaskList from './components/molecules/TaskList';

function App() {

  const [taskName, setTaskName] = useState('');
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [renderedTasks, setRenderedTasks] = useState([]);
  const [taskCounter, setTaskCounter] = useState(0);
  const [currentSelection, setCurrentSelection] = useState('all');

  const handleInputChange = (e) => {
    setTaskName(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && taskName) {
      const currentActiveTasks = activeTasks;
      const newActiveTasks = [...currentActiveTasks,
      {
        name: taskName,
        id: taskCounter,
        completed: false
      }
      ]
      setActiveTasks(newActiveTasks);
      setTaskName('');
      setTaskCounter(taskCounter + 1);
    }
  }

  useEffect(() => {
    const mp = {
      'all': completedTasks.concat(activeTasks),
      'active': activeTasks,
      'completed': completedTasks
    }
    const newRenderedTasks = mp[currentSelection].sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
    setRenderedTasks(newRenderedTasks);
  }, [activeTasks, completedTasks, currentSelection]);

  const handleRemoveTask = (taskId) => {
    const newCompletedList = completedTasks.filter(t => t.id !== taskId);
    setCompletedTasks(newCompletedList);

    const newActiveList = activeTasks.filter(t => t.id !== taskId);
    setActiveTasks(newActiveList);
  }

  const handleTaskChange = (task) => {
    let currentCompleted = completedTasks;
    let currentActive = activeTasks;

    task.completed = !task.completed;
    if (currentActive.includes(task)) {
      currentCompleted = [...currentCompleted, task];
      currentActive = currentActive.filter(t => t.id !== task.id)
    } else {
      currentActive = [...currentActive, task];
      currentCompleted = currentCompleted.filter(t => t.id !== task.id)
    }
    setCompletedTasks(currentCompleted);
    setActiveTasks(currentActive);
  }

  const handleEditTaskName = (e, task) => {
    const newTask = { ...task, name: e.target.value };
    const currentlyActiveTask = activeTasks.find(t => t.id === task.id);
    if (currentlyActiveTask) {
      let newActiveTasks = activeTasks.filter(t => t.id !== task.id);
      newActiveTasks.push(newTask);
      setActiveTasks(newActiveTasks);
    } else {
      let newCompletedTasks = completedTasks.filter(t => t.id !== task.id);
      newCompletedTasks.push(newTask);
      setCompletedTasks(newCompletedTasks);
    }
  }

  const toggleTaskStatus = () => {
    if (activeTasks.length) {
      const newCompletedTasks = completedTasks.concat(activeTasks.map((t) => {
        t.completed = true;
        return t;
      }));
      setCompletedTasks(newCompletedTasks);
      setActiveTasks([]);
    } else {
      const newActiveTasks = activeTasks.concat(
        completedTasks.map((t) => {
          t.completed = false
          return t;
        }));
      setActiveTasks(newActiveTasks);
      setCompletedTasks([]);
    }
  }

  return (
    <div className="App">
      <h1>todos</h1>
      <div>
        <button onClick={toggleTaskStatus}>
          Magic
        </button>
        <input
          type='text'
          placeholder='What needs to be done?'
          className='app_input__text'
          value={taskName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          name="taskNameEditor"
        />
      </div>

      <TaskList
        tasks={renderedTasks}
        removeTask={handleRemoveTask}
        changeTaskStatus={handleTaskChange}
        changeTaskName={handleEditTaskName}
      />
      <div>
        <span>
          {activeTasks.length} items left
        </span>
        <button onClick={() => setCurrentSelection('all')}>
          All
        </button>
        <button onClick={() => setCurrentSelection('active')}>
          Active
        </button>
        <button onClick={() => setCurrentSelection('completed')}>
          Completed
        </button>
        <button onClick={() => setCompletedTasks([])}>
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default App;
