import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Navbar() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const res = await API.get("/auth/me");
    setUser(res.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between">

      <h1 className="font-bold text-lg">
        
      </h1>

      <div className="flex gap-4 items-center">

        <span>
          {user?.name}
        </span>

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;