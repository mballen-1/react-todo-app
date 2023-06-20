import logo from './logo.svg';
import './App.css';
import './index.css';
import { useState } from 'react';
import Tasks from './Tasks';

function App() {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([])

  const handleInputChange = (e) =>{
    setTaskName(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter'){
      const currentTasks = tasks;
      setTasks([...currentTasks, {name: taskName, id: tasks.length}])
      setTaskName('')
    }
  }

  return (
    <div className="App">
      <input 
        type='text' 
        placeholder='What needs to be done?' 
        className='app_input__text'
        value={taskName}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Tasks tasks={tasks}/>
    </div>
  );
}

export default App;
