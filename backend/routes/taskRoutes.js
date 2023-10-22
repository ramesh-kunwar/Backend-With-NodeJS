const express = require("express")
const { getTasks, createTask, getTask, updateTask, deleteTask } = require("../controller/taskController")
const router = express.Router()



router.route("/tasks").get(getTasks).post(createTask)
router.route("/tasks/:taskId").get(getTask).delete(deleteTask).put(updateTask)


module.exports = router