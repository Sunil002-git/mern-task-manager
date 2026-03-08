const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createTask,
  getTeamTasks,
  getAssignedTasks,
  getCreatedTasks,
  completeTask, getTasks, updateTask, deleteTask, getCompletedTasks
} = require("../controllers/taskController");

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
router.get("/team/:teamId", authMiddleware, getTeamTasks);
router.get("/assigned", authMiddleware, getAssignedTasks);

router.get("/created", authMiddleware, getCreatedTasks);
router.put("/:id/complete", authMiddleware, completeTask);
router.get("/completed", authMiddleware, getCompletedTasks);
module.exports = router;