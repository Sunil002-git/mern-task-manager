import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await API.post("/auth/login", {
                email,
                password
            });
            localStorage.setItem("token", res.data.token);
            navigate("/teams");
        }catch (error) {
            console.log(error);

  if (error.response && error.response.data) {
    alert(error.response.data.message || "Registration failed");
  } else {
    alert("Server error");
  }
        }
    };

    return(
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Login
                </h2>
                <input type="email" placeholder="Email" className="w-full border p-2 mb-4" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" className="w-full border p-2 mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin} className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
                <p className="text-center mt-4">
                    Don't have an account?
                    <a href="/register" classsName="text-blue-500 ml-1 mx-2">Register</a>
                </p>
            </div>
        </div>
    );

}

export default Login;