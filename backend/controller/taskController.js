const SubTasks = require("../models/SubTasks");
const Tasks = require("../models/Tasks");

const mongoose = require("mongoose");

/*********************
 *  get all tasks
 **********************/

const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find().populate("subTask")

    res.json({
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

/*********************
 *  get single task
 **********************/

const getTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Tasks.findById(taskId).populate("subTask")
    console.log(task);

    if (!task) {
      res.status(404).json({
        msg: "Task not found",
      });
    }

    res.json({
      task,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

/*********************
 *  Create Task
 **********************/

const createTask = async (req, res) => {
  try {
    const { name, completed } = req.body;

    if (!name) {
      res.status(400).json({
        msg: "Name is required",
      });
    }

    const task = await Tasks.create({
      name,
      completed,
    });

    res.json({
      task,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

/*********************
 *  Update task
 **********************/

const updateTask = async (req, res) => {
  try {
    const { name, completed } = req.body;

    const { taskId } = req.params;

    const updatedData = {
      name,
      completed,
    };
    let task = await Tasks.findByIdAndUpdate(taskId, updatedData, {
      new: true,
    });

    res.status(201).json({
      task,
      msg: "UPdate",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

/*********************
 *  Delete task
 **********************/

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Tasks.findById(taskId);

    if (!task) {
      res.status(404).json({
        msg: "Task not found",
      });
    }

    await Tasks.findByIdAndDelete(taskId);

    res.json({
      msg: "delete task",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
