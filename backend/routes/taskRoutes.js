import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import {
  createTask,
  deleteTask,
  getSingleTask,
  getTasks,
  markTaskAsCompleted,
  markTaskAsNotCompleted,
  updateTask,
} from "../controller/task.controller.js";
const router = express.Router();

router.route("/tasks").post(isLoggedIn, createTask).get(isLoggedIn, getTasks);

router.route("/tasks/:id").get(isLoggedIn, getSingleTask).put(isLoggedIn, updateTask).delete(deleteTask)

router.route("/tasks/:id/completed").put(isLoggedIn, markTaskAsCompleted)
router.route("/tasks/:id/notcompleted").put(isLoggedIn, markTaskAsNotCompleted)

export default router;
