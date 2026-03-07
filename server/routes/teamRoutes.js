const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { createTeam, getTeams, addMember, getTeamMembers } = require("../controllers/teamController");

router.post("/", authMiddleware, createTeam);
router.get("/", authMiddleware, getTeams);
router.post("/:id/add-member", authMiddleware, addMember);
router.get("/:id/members", authMiddleware, getTeamMembers);

module.exports = router;