import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try{
            await API.post("/auth/register", {
                name, email, password
            });
            alert("Registration Successful");
            navigate("/");
        } catch(error) {
            console.log(error);

  if (error.response && error.response.data) {
    alert(error.response.data.message || "Registration failed");
  } else {
    alert("Server error");
  }
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Register
                </h2>
                <input
                placeholder="Name"
                className="w-full border p-2 mb-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                 <input
                    placeholder="Email"
                    className="w-full border p-2 mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleRegister} className="w-full bg-green-500 text-white py-2 rounded">Register</button>
                    <p className="text-center mt-4">
                        Already have an account?
                        <a href="/" className="text-blue-500 ml-1">
                        Login
                        </a>
                    </p>
            
            </div>
        </div>
    );
}

export default Register;