const Team = require("../models/Team");
const TeamMember = require("../models/TeamMember");

exports.createTeam = async (req, res) => {

  const team = await Team.create({
    name: req.body.name,
    owner: req.user.id
  });

  await TeamMember.create({
    team: team._id,
    user: req.user.id,
    role: "owner"
  });

  res.json(team);
};

// get User Teams
exports.getTeams = async (req, res) => {

  const memberships = await TeamMember.find({
    user: req.user.id
  }).populate("team");

  const teams = memberships.map(m => m.team);

  res.json(teams);
};
exports.addMember = async (req, res) => {

  await TeamMember.create({
    team: req.params.id,
    user: req.body.userId
  });

  res.json({ message: "Member added" });
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