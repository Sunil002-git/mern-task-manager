const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body
        // check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({message: "User Already Exists"});
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create User
        const user = await User.create({
            name, email, password: hashedPassword
        });
        res.status(201).json({
            message: "User Registered Successfully", 
            user
        });
    } catch(error) {
        res.status(500).json({error: error.message});
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password"});
        }
        // compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({message: "Invalid Email or Password"});
        }
        // create JWT token
        const token = jwt.sign(
            {id : user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );
        res.json({
            message: "Login Successful",
            token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};