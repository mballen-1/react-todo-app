import './TaskList.css';
import SingleTask from '../atoms/SingleTask.js';

function TaskList({ tasks, removeTask, changeTaskStatus, changeTaskName }) {
    return (
        <ul>
            {
                tasks.map(t =>
                    <SingleTask 
                        task={t} 
                        onRemoveTask={removeTask} 
                        onTaskChange={changeTaskStatus}
                        onNameChange={changeTaskName}
                    />
                )
            }
        </ul>
    );
}

export default TaskList;