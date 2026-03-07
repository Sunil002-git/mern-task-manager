const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,
        enum: ["owner", "member"],
        default: "member"
    }
}, { timestamps: true }
);

module.exports = mongoose.model("TeamMember", teamMemberSchema);