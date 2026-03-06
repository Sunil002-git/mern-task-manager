const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { createTeam, getTeams } = require("../controllers/teamController");

router.post("/", authMiddleware, createTeam);
router.get("/", authMiddleware, getTeams);

module.exports = router;