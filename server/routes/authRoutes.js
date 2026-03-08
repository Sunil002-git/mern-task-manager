const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getUsers, getCurrentUser } = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/users", authMiddleware, getUsers);
router.get("/me", authMiddleware, getCurrentUser);
module.exports = router;