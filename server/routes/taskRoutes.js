const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { createTask, getTasks, updateTask, deleteTask, getTeamTasks } = require("../controllers/taskController");

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
router.get("/team/:teamId", authMiddleware, getTeamTasks);
module.exports = router;