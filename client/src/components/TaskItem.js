import { useState } from "react";

function TaskItem({ task, onDelete, onToggle, onEdit }) {

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleSave = () => {
    onEdit(task._id, title);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center bg-white p-3 shadow rounded mb-2">

      {isEditing ? (
        <input
          className="border p-1 flex-1 mr-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <span
          className={`flex-1 cursor-pointer ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
          onClick={() => onToggle(task)}
        >
          {task.title}
        </span>
      )}

      <div className="flex gap-2">

        {isEditing ? (
          <button
            onClick={handleSave}
            className="text-green-500"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskItem;