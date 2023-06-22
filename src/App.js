import './App.css';
import './index.css';
import { useState } from 'react';
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
      if(currentSelection === 'all' || currentSelection === 'active'){
        const currentRenderedTasks = renderedTasks;
        setRenderedTasks([...currentRenderedTasks,
        {
          name: taskName,
          id: taskCounter,
          completed: false
        }]);
      }

      const currentActiveTasks = activeTasks;
      setActiveTasks([...currentActiveTasks,
      {
        name: taskName,
        id: taskCounter,
        completed: false
      }]);
      
      setTaskName('');
      setTaskCounter(taskCounter + 1);
    }
  }

  function handleRemoveTask(taskId) {
    const newTaskList = renderedTasks.filter(t => t.id !== taskId);
    setRenderedTasks(newTaskList);

    const newCompletedList = completedTasks.filter(t => t.id !== taskId);
    setCompletedTasks(newCompletedList);

    const newActiveList = activeTasks.filter(t => t.id !== taskId);
    setActiveTasks(newActiveList);
  }

  function handleTaskChange (task) {
      let currentCompleted = completedTasks;
      let currentActive = activeTasks;
      const newTaskList = renderedTasks.map(t => {
        if(t.id === task.id){
          t.completed = !t.completed;
          if(t.completed){
            currentCompleted.push(task);
            currentActive = currentActive.filter(t => t.id !== task.id)
          } else {
            currentActive.push(task);
            currentCompleted = currentCompleted.filter(t => t.id !== task.id)
          }
        }
        return t
      });
      setRenderedTasks(newTaskList);
      setCompletedTasks(currentCompleted);
      setActiveTasks(currentActive);
  }

  const handleFilterActive = () => {
    setCurrentSelection('active')
    setRenderedTasks(activeTasks);
  } 

  const handleNoFilter = () => {
    setCurrentSelection('all')
    const newTasks = activeTasks.concat(completedTasks);
    setRenderedTasks(newTasks);
  }

  const handleFilterCompleted = () => {
    setCurrentSelection('completed')
    setRenderedTasks(completedTasks);
  }

  const handleClearCompleted = () => {
    const newTasks = renderedTasks.filter(task => !task?.completed);
    setRenderedTasks(newTasks);
    setCompletedTasks([]);
  }

  return (
    <div className="App">
      <h1>todos</h1>
      <input
        type='text'
        placeholder='What needs to be done?'
        className='app_input__text'
        value={taskName}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <TaskList
        tasks={renderedTasks} 
        removeTask={handleRemoveTask}
        changeTaskStatus={handleTaskChange} 
      />
      <div>
        {activeTasks.length} items left
        <button onClick={handleNoFilter}>
          All
        </button>
        <button onClick={handleFilterActive}>
          Active
        </button>
        <button onClick={handleFilterCompleted}>
          Completed
        </button>
        <button onClick={handleClearCompleted}>
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default App;
