import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from '../services/api';

function TeamTasks() {
    const { id } = useParams();

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [members, setMembers] = useState([]);
    const [assignedTo, setAssignedTo] = useState("");

    const fetchTasks = async () => {
        const res = await API.get(`/tasks/team/${id}`);
        setTasks(res.data)
    };
    const fetchMembers = async () => {
        const res = await API.get(`/teams/${id}/members`);
        setMembers(res.data);
    }
    useEffect(() => {
        fetchTasks();
        fetchMembers();
    }, []);

    const handleCreateTask = async () => {
        if(!title.trim()) return;

        await API.post("/tasks", {
            title, 
            teamId: id,
            assignedTo
        });

        setTitle("");
        setAssignedTo("");
        fetchTasks();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-6">Team Tasks</h1>
                <div className="flex gap-2 mb-6">
                   <select 
                   className="border p-2"
                   value={assignedTo}
                   onChange={(e) => setAssignedTo(e.target.value)}
                   >
                    <option value="">Assign member</option>
                    {members.map((member) => (
                        <option key={member._id} value={member.user._id}>
                            {member.user.name}
                        </option>
                    ))}
                   </select>
                    <input 
                    className="border p-2 flex-1"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />

                    <button
                    onClick={handleCreateTask}
                    className="bg-green-500 text-white px-4 rounded"
                    >Add
                    </button>
                </div>
                {tasks.map((task) => (

          <div key={task._id} className="p-3 border mb-2">

            <div className={task.completed ? "line-through" : ""}>
              {task.title}
            </div>

            <div className="text-sm text-gray-500">
              Assigned to: {task.assignedTo?.name}
            </div>

          </div>

        ))}
            </div>
        </div>
    );
}

export default TeamTasks;