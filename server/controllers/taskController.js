const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {

    const { title } = req.body;

    const task = await Task.create({
      title,
      user: req.user.id
    });

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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