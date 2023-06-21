import './TaskList.css';
import SingleTask from '../atoms/SingleTask.js';

function TaskList({ tasks, removeTask }) {
    return (
        <ul>
            {
                tasks.map(t =>
                    <SingleTask task={t} onRemoveTask={removeTask}/>
                )
            }
        </ul>
    );
}

export default TaskList;