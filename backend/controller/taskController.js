const SubTasks = require("../models/SubTasks");
const Tasks = require("../models/Tasks");

const mongoose = require("mongoose");

/**
 *  get all tasks
 */

const getTasks = async (req, res) => {
  try {
    res.json({
      msg: "Get all task",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

module.exports = {
  getTasks,
};
