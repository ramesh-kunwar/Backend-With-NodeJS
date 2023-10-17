const express = require("express")
const { getTasks } = require("../controller/taskController")
const router = express.Router()



router.route("/tasks").get(getTasks)

module.exports = router