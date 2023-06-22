import './TaskList.css';
import SingleTask from '../atoms/SingleTask.js';

function TaskList({ tasks, removeTask, changeTaskStatus }) {
    return (
        <ul>
            {
                tasks.map(t =>
                    <SingleTask 
                        task={t} 
                        onRemoveTask={removeTask} 
                        onTaskChange={changeTaskStatus}
                    />
                )
            }
        </ul>
    );
}

export default TaskList;