import './App.css';
import './index.css';
import { useState } from 'react';
import TaskList from './components/molecules/TaskList';

function App() {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([])
  const [taskCounter, setTaskCounter] = useState(0)

  const handleInputChange = (e) =>{
    setTaskName(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter'){
      const currentTasks = tasks;
      setTasks([...currentTasks, {name: taskName, id: taskCounter}])
      setTaskName('')
      setTaskCounter(taskCounter + 1)
    }
  }

  function handleRemoveTask(taskId) {
    const newTaskList = tasks.filter( t => t.id !== taskId)
    setTasks(newTaskList)
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
      <TaskList tasks={tasks} removeTask={handleRemoveTask}/>
      <div>
        {tasks.length} items left 
        <button>
          Active
        </button> 
        <button>
          Completed
        </button> 
      </div>
    </div>
  );
}

export default App;
