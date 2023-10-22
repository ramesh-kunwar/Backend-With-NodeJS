const express = require("express");
const {
  getSubTasks,
  createSubTasks,
  getSubTask,
  deleteSubTasks,
  updateSubTasks,
} = require("../controller/subTaskController");
const router = express.Router();

// router.route("/tasks").get(getTasks).post(createTask)
router.route("/tasks/:taskId/subtasks").get(getSubTasks).post(createSubTasks);

router.route("/tasks/:taskId/subtasks/:id").get(getSubTask).delete(deleteSubTasks).put(updateSubTasks)

module.exports = router;
