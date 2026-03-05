function TaskItem({ task, onDelete, onToggle }) {
    return (
        <div className="flex justify-between items-center bg-white p-3 shadow rounded mb-2">
            <span 
            className={`cursor-pointer 
            ${task.completed ? "line-through text-gray-400" : ""}`} 
            onClick={() => onToggle(task)}>
                {task.title}
            </span>
            <button 
            onClick={() => onDelete(task._id)}
            className="text-red-500"
            >
                Delete
            </button>
        </div>
    );
}

export default TaskItem