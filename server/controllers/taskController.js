const Task = require("../models/Task");

exports.createTask = async (req, res) => {

const task = await Task.create({
  title: req.body.title,
  team: req.body.teamId,
  assignedTo: req.body.assignedTo,
  createdBy: req.user.id
});

  res.json(task);
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({user: req.user.id});
        res.json(tasks);
    }catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req , res) => {
    try {
        const {title, completed} = req.body;
        const task = await Task.findByIdAndUpdate(
            {_id: req.params.id, user: req.user.id},
            {title, completed},
            {new: true}
        );

        if (!task) {
            return res.status(404).json({message: "Task Not Found"});
        }
        res.json(task);

    } catch(error) {
        res.status(500).json({error: error.message});
    }
};

exports.deleteTask = async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if(!task) {
            return res.status(404).json({message: "Task Not Found"});
        }

        res.json({message: "Task Deleted Successfully" });

    }catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTeamTasks = async (req, res) => {

  const tasks = await Task.find({
    team: req.params.teamId
  }).populate("assignedTo", "name");

  res.json(tasks);
};

// exports.completeTask = async (req, res) => {

//   const task = await Task.findById(req.params.id);

//   task.status = "Completed";
//   task.completedBy = req.user.id;
//   task.completedAt = new Date();

//   await task.save();

//   res.json(task);
// };

// Tasks assigned to logged user (Pending)
exports.getAssignedTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      assignedTo: req.user.id,
      status: "Pending"
    })
    .populate("team", "name")
    .populate("createdBy", "name");

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Tasks created by logged user
exports.getCreatedTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      createdBy: req.user.id
    })
    .populate("assignedTo", "name")
    .populate("team", "name");

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.completeTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // mark task completed
    task.status = "Completed";
    task.completedBy = req.user.id;
    task.completedAt = new Date();

    await task.save();

    res.json(task);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCompletedTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      assignedTo: req.user.id,
      status: "Completed"
    })
    .populate("team", "name")
    .populate("completedBy", "name");

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};