const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  role: {
    type: String,
    default: "member"
  }
});

module.exports = mongoose.model("TeamMember", teamMemberSchema);