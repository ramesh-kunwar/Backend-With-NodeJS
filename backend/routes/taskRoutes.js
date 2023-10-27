import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import {
  addSubTasks,
  createTask,
  deleteSubTask,
  deleteTask,
  getAllSubTasks,
  getSingleSubTask,
  getSingleTask,
  getTasks,
  markTaskAsCompleted,
  markTaskAsNotCompleted,
  updateSubTask,
  updateTask,
} from "../controller/task.controller.js";
const router = express.Router();

router.route("/tasks").post(isLoggedIn, createTask).get( getTasks);

router
  .route("/tasks/:id")
  .get(isLoggedIn, getSingleTask)
  .put(isLoggedIn, updateTask)
  .delete(deleteTask);

router.route("/tasks/:id/completed").put(isLoggedIn, markTaskAsCompleted);
router.route("/tasks/:id/notcompleted").put(isLoggedIn, markTaskAsNotCompleted);

// sub task routes
router.route("/tasks/:id/subtasks").post(addSubTasks).get(getAllSubTasks)
router.route("/tasks/:id/subtasks/:subTaskId").get(getSingleSubTask).delete(deleteSubTask).put(updateSubTask)

export default router;
