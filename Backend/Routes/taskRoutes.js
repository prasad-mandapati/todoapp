const express = require("express");
const router = express.Router();
const Task = require("../Models/taskModel");

// route to insert task into data base
router.post("/", async (req, res) => {
  const { task } = req.body;
  try {
    if (!task) {
      throw new Error("Please enter the task");
    }
    const newTask = await Task.create({
      task,
    });
    res.status(200).json(newTask);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// route to get all the tasks from the database
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({}).sort("-createdAt");
    if (!tasks) {
      throw new Error("Tasks Not found");
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

// route to delete a task from data base based on id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("task not found");
    }
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      throw new Error("task not deleted");
    }
    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// route to change status of a task based on id
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id });
    if (!id || !task) {
      throw new Error("task not exist");
    }
    const status = task.taskStatus ? "false" : "true";
    await Task.findByIdAndUpdate({ _id: id }, { taskStatus: status });
    res.status(200).json({
      message: "status changed",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

// route to edit task based on id
router.patch("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    const existTask = await Task.findOne({ _id: id });

    if (task === "" || !task) {
      throw new Error("Please enter the task");
    }

    if (!existTask) {
      throw new Error("task not exist");
    }

    await Task.findByIdAndUpdate({ _id: id }, { task: task });
    res.status(200).json({
      message: "task updated",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

module.exports = router;
