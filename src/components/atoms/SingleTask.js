import './SingleTask.css';
import { useState, useRef } from 'react';

function SingleTask({ task, onRemoveTask, onTaskChange, onNameChange }) {
    const [editorMode, setEditorMode] = useState(false);
    const ref = useRef(null)

    const handleClick = e => {
        setEditorMode(true);
    }

    if (task) {
        return (
            <li
                key={task.id}
                className={task.completed ? 'task_li__font-style' : ''}
                ref={ref}
            >
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onTaskChange(task)} />
                {
                    editorMode ?
                        <input 
                            type="text" 
                            value={task.name} 
                            onChange={(e) => onNameChange(e, task)}
                            onBlur={() => setEditorMode(false)} autoFocus
                            name="taskNameEditor"
                            />
                        :
                        <span onDoubleClick={handleClick}>
                            {task.name}
                        </span>
                }
                <button onClick={() => onRemoveTask(task.id)}>x</button>
            </li>
        )
    }
}

export default SingleTask;