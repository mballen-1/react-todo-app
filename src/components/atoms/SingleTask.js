import './SingleTask.css';
import { useState, useRef } from 'react';

function SingleTask({ task, onRemoveTask, onTaskChange, onNameChange }) {
    const [editorMode, setEditorMode] = useState(false);
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null)

    const handleClick = e => {
        setEditorMode(true);
    }

    const handleMouseEvent = (value) => {
        setHovered(value);
    }

    const liStyles = {
        textDecoration: task.completed ? 'line-through' : 'none',
        display: 'flex',
        justifyContent: 'space-between'
    }

    if (task) {
        return (
            <li
                key={task.id}
                ref={ref}
                onMouseEnter={() => handleMouseEvent(true)}
                onMouseLeave={() => handleMouseEvent(false)}
                style={liStyles}
            >
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onTaskChange(task)}
                />
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
                        <span onDoubleClick={handleClick} 
                                style={{
                                    width: '500px'
                                }}>
                            {task.name}
                        </span>
                }
                {
                    hovered ?
                        <button 
                            onClick={() => onRemoveTask(task.id)}
                            className='task_close_button__size'
                        >
                            x
                        </button>
                        :
                        <div className='task_close_button__size'/>
                }
            </li>
        )
    }
}

export default SingleTask;