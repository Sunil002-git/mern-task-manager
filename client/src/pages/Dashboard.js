import { useEffect, useState } from "react";
import { createTask, getTasks, deleteTask, updateTask } from "../services/api";
import { useNavigate } from "react-router-dom";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (title) => {
    await createTask({ title });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleToggle = async (task) => {
    await updateTask(task._id, {
      completed: !task.completed,
      title: task.title
    });
    fetchTasks();
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleEdit = async (id, title) => {

  await updateTask(id, {
    title
  });

  fetchTasks();
};
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-10">
      <div className="max-w-xl mx-auto">

        <div className="flex justify-between items-center mb-6">

  <h1 className="text-3xl font-bold">
    Task Dashboard
  </h1>

  <button
    onClick={handleLogout}
    className="bg-red-500 text-white px-4 py-2 rounded"
  >
    Logout
  </button>

</div>

        <TaskForm onAdd={handleAdd} />

        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit}
        />

      </div>

    </div>
  );
}

export default Dashboard;