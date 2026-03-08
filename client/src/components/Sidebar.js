import { useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-60 bg-blue-600 text-white min-h-screen p-5">

      <h2 className="text-xl font-bold mb-6">
        Team Task Manager
      </h2>

      <div className="flex flex-col gap-4">

        <button
          onClick={() => navigate("/dashboard")}
          className="text-left hover:bg-blue-500 p-2 rounded"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/teams")}
          className="text-left hover:bg-blue-500 p-2 rounded"
        >
          Teams
        </button>

        <button
          onClick={() => navigate("/about")}
          className="text-left hover:bg-blue-500 p-2 rounded"
        >
          About
        </button>

        <button
          onClick={logout}
          className="text-left hover:bg-red-500 p-2 rounded"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;