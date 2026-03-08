import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


function Dashboard() {

  const [assignedTasks, setAssignedTasks] = useState([]);
  const [createdTasks, setCreatedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const fetchAssignedTasks = async () => {
    const res = await API.get("/tasks/assigned");
    setAssignedTasks(res.data);
  };

  const fetchCreatedTasks = async () => {
    const res = await API.get("/tasks/created");
    setCreatedTasks(res.data);
  };

  const fetchCompletedTasks = async () => {
  const res = await API.get("/tasks/completed");
  setCompletedTasks(res.data);
  };
  const handleCompleteTask = async (taskId) => {

  await API.put(`/tasks/${taskId}/complete`);

  fetchAssignedTasks();
  fetchCompletedTasks();
  fetchCreatedTasks();
};
  useEffect(() => {
  fetchAssignedTasks();
  fetchCompletedTasks();
  fetchCreatedTasks();
}, []);

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-10 bg-gray-100 min-h-screen">

          <h1 className="text-2xl font-bold mb-6">
            Dashboard
          </h1>

          {/* Assigned Tasks */}

          <div className="mb-10">

            <h2 className="text-xl font-semibold mb-4">
              Tasks Assigned To Me
            </h2>

            {assignedTasks.map(task => (

              <div key={task._id} className="p-3 border mb-2 bg-white">

                <div>{task.title}</div>

                <div className="text-sm text-gray-500">
                  Team: {task.team?.name}
                </div>

                <div className="text-sm text-gray-500">
                  Created By: {task.createdBy?.name}
                </div>

                <button
                  onClick={() => handleCompleteTask(task._id)}
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                >
                  Complete Task
                </button>

              </div>

            ))}

          </div>


          {/* Created Tasks */}

          <div>

            <h2 className="text-xl font-semibold mb-4">
              Tasks I Created
            </h2>

            {createdTasks.map(task => (

              <div key={task._id} className="p-3 border mb-2 bg-white">

                <div>{task.title}</div>

                <div className="text-sm text-gray-500">
                  Assigned To: {task.assignedTo?.name}
                </div>

                <div className="text-sm text-gray-500">
                  Status: {task.status}
                </div>

                {task.completedBy && (

                  <div className="text-sm text-green-600">
                    Completed
                  </div>

                )}

              </div>

            ))}

          </div>

          <h2 className="text-xl font-semibold mb-4 mt-8">
Completed Tasks
</h2>

{completedTasks.map(task => (

  <div key={task._id} className="p-3 border mb-2 bg-green-50">

    <div>{task.title}</div>

    <div className="text-sm text-gray-500">
      Team: {task.team?.name}
    </div>

    <div className="text-sm text-gray-500">
      Completed By: {task.completedBy?.name}
    </div>

  </div>

))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;