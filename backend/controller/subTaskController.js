const SubTasks = require("../models/SubTasks");

const mongoose = require("mongoose");
const Tasks = require("../models/Tasks");

/*********************
 *  get all tasks
 **********************/

const getSubTasks = async (req, res) => {
  try {
    const tasks = await SubTasks.find();

    res.json({
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const getSubTask = async (req, res) => {
  try {
    // const { id } = req.prams;

    const { id } = req.params;

    const subTask = await SubTasks.findById(id);
    console.log(subTask);
    // console.log('hell');
    // console.log(subTask, id);

    res.status(200).json({
      subTask,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
/*********************
 *  create
 **********************/

const createSubTasks = async (req, res) => {
  try {
    const { taskId } = req.params;

    const { name, completed } = req.body;
    const task = await Tasks.findById(taskId);

    const subTasks = await SubTasks.create({ name, completed });
    // console.log(subTasks);

    task.subTask.push(subTasks);

    // console.log(subTask, 'subtask');

    await task.save();
    console.log(task);

    res.json({
      task,

      msg: "Sub task creeated successfully",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const deleteSubTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const subTask = await SubTasks.findById(id);

    await subTask.deleteOne();

    res.status(200).json({
      msg: "Sub task deleted",
      subTask,
    });
  } catch (error) {
    console.log("error in deleteSub task route");
    res.status(500).json({
      error,
    });
  }
};
const updateSubTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, completed } = req.body;

    const subTask = await SubTasks.findByIdAndUpdate(id, { name, completed });

    res.status(200).json({
      msg: "Sub task updated",
      subTask,
    });
  } catch (error) {
    console.log("error in deleteSub task route");
    res.status(500).json({
      error,
    });
  }
};

module.exports = {
  getSubTasks,
  getSubTask,
  createSubTasks,
  updateSubTasks,
  deleteSubTasks,
};
