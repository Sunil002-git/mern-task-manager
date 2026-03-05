require("dotenv").config();

const express = require("express");
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const authroutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authMiddleware = require("./middleware/authMiddleware");
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth/", authroutes);
app.use("/api/tasks", taskRoutes);
app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user
    });
});
app.get('/', (req, res) => {
    res.send("API RUnning");
});

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});