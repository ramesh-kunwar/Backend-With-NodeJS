import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import {
  createTask,
  deleteTask,
  getSingleTask,
  getTasks,
  updateTask,
} from "../controller/task.controller.js";
const router = express.Router();

router.route("/tasks").post(isLoggedIn, createTask).get(isLoggedIn, getTasks);

router.route("/tasks/:id").get(isLoggedIn, getSingleTask).put(isLoggedIn, updateTask).delete(deleteTask)

export default router;
