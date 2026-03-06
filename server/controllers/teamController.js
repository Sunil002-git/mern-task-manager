const Team = require("../models/Team");

exports.createTeam = async (req, res) => {
    try {
        const { name } = req.body;

        const team = await Team.create({
            name,
            owner: req.user.id
        });
        res.status(201).json(team);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

// get User Teams
exports.getTeams = async (req, res) => {
    try{
        const teams = await Team.find({
            owner: req.user.id
        });
        res.json(teams);
    }catch(error) {
        res.status(500).json({ error: error.message });
    }
};