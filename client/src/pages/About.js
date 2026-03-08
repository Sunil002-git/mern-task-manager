import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function About() {

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-10 bg-gray-100 min-h-screen">

          <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">

            <h1 className="text-2xl font-bold mb-6">
              About Team Task Manager
            </h1>

            <p className="mb-4">
              This application is a collaborative task management system built using the MERN stack.
              Users can create teams, add members, assign tasks, and track task completion.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              Features
            </h2>

            <ul className="list-disc pl-5 space-y-2">
              <li>User authentication with JWT</li>
              <li>Create and manage teams</li>
              <li>Add members to teams</li>
              <li>Create tasks and assign them to members</li>
              <li>Dashboard showing assigned tasks and created tasks</li>
              <li>Task completion tracking</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              How To Use
            </h2>

            <ol className="list-decimal pl-5 space-y-2">

              <li>Register a new account.</li>

              <li>Login to access the dashboard.</li>

              <li>Create a team from the Teams section.</li>

              <li>Add members to the team.</li>

              <li>Create tasks inside the team and assign them to members.</li>

              <li>Assigned users can mark tasks as completed.</li>

              <li>The dashboard displays pending and completed tasks.</li>

            </ol>

          </div>

        </div>

      </div>

    </div>
  );
}

export default About;