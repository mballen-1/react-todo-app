function Tasks({tasks}){
    return(
        <ul> 
            {
                tasks.map( t => 
                        <li key={t.id}>
                            {t.name}
                        </li>)
            }
        </ul>
    );
}

export default Tasks;