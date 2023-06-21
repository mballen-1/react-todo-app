import {useState} from 'react';
import './SingleTask.css'

function SingleTask({task, onRemoveTask}) {
    const [checked, setChecked] = useState(false);
    function handleCheckChange() {
        const currentCheckState = checked;
        setChecked(!currentCheckState);
    }
    return (
        <li key={task.id} className={checked ? 'task_li__font-style' : ''}>
            <input type="checkbox" checked={checked} onChange={handleCheckChange}/>
            {task.name}
            <button onClick={ () => onRemoveTask(task.id)}>x</button>
        </li>
    )
}

export default SingleTask;