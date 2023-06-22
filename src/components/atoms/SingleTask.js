import './SingleTask.css';
import { useState } from 'react';

function SingleTask({task, onRemoveTask, onTaskChange}) {
    if (task) {
        return (
            <li key={task.id} className={task.completed ? 'task_li__font-style' : ''}>
                <input type="checkbox" checked={task.completed} onChange={() => onTaskChange(task)}/>
                <span>
                    {task.name}
                </span>
                <button onClick={ () => onRemoveTask(task.id)}>x</button>
            </li>
        )
    }
}
    
export default SingleTask;