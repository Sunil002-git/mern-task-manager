const Team = require("../models/Team");
const TeamMember = require("../models/TeamMember");

exports.createTeam = async (req, res) => {
    try {
        const { name } = req.body;

        const team = await Team.create({
            name,
            owner: req.user.id
        });
        // add owner as team member
        await TeamMember.create({
            team: team._id,
            user: req.user.id,
            role: "owner"
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

exports.addMember = async (req, res) => {
    try {
        const { userId } = req.body;
        const teamId = req.params.id;
        const member = await TeamMember.create({
            team: teamId,
            user: userId,
            role: "member"
        });
        res.status(201).json(member);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTeamMembers = async (req, res) => {
  try {

    const members = await TeamMember.find({
      team: req.params.id
    }).populate("user", "name email");

    res.json(members);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};