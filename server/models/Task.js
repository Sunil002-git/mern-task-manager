const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    default: "Pending"
  },

  completedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  completedAt: Date

}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);