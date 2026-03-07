import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Teams() {
    const [teams, setTeams] = useState([]);
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const fetchTeams = async () => {
        const res = await API.get("/teams");
        setTeams(res.data);
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleCreateTeam = async () => {
        if (!name.trim()) return;

        await API.post("/teams", { name });
        setName("");
        fetchTeams();
    };
    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <div class="max-w-xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold-mb">Your Teams</h1>
                <div className="flex gap-2 mb-6">
                    <input 
                    className="border p-2 flex-1"
                    placeholder="Team Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={handleCreateTeam} className="bg-blue-500 text-white px-4 rounded">Create</button>
                </div>
                {teams.map((team) => (
                    <div 
                    key={team._id}
                    className="p-3 border mb-2 cursor-pointer hover:bg-gray-50"    
                    onClick={() => navigate(`/teams/${team._id}`)}
                    >
                        {team.name}
                    </div>
                ))}
                
            </div>
        </div>
    );
}

export default Teams;