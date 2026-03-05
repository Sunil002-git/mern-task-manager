import { useState } from "react";

function TaskForm({ onAdd }) {
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAdd(title);
        setTitle("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-9">
            <input
            className="border p-2 flex-1"
            placeholder="Enter task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <button className="bg-blue-500 text-white px-4 rounded">Add</button>
        </form>
    );
}
export default TaskForm;