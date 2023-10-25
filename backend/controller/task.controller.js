import Task from "../models/tasks.schema.js";
import asyncHandler from "../services/asyncHandler.js";

/************************************************************************
 * @route http://localhost:4000/api/v1/tasks
 * @description Create a new tasks
 * @method POST
 * @params {title, description, priority, subTasks}
 * @returns Task object
 *************************************************************************/

export const createTask = asyncHandler(async (req, res, next) => {
  const { title, description, priority, subTasks } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }
  const existingTask = await Task.findOne({ title });
  if (existingTask) {
    res.status(400);
    throw new Error("Task already exists");
  }
  console.log(req.user, "usser");

  const task = await Task.create({
    title,
    description,
    priority,
    subTasks,
    user: req.user.id,
  });

  res.status(201).json({
    length: task.length,
    data: task,
    success: true,
    message: "Task created successfully",
  });
});

/************************************************************************
 * @route http://localhost:4000/api/v1/tasks
 * @description Get all tasks
 * @method GET
 * @params {title, description, priority, subTasks}
 * @returns Task object
 *************************************************************************/

export const getTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find();

  res.status(200).json({
    length: tasks.length,
    data: tasks,
    success: true,
    message: "Tasks fetched successfully",
  });
});

/************************************************************************
 * @route http://localhost:4000/api/v1/tasks/:id
 * @description Get single tasks
 * @method GET
 * @params
 * @returns Task object
 *************************************************************************/

export const getSingleTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.status(200).json({
    data: task,
    success: true,
    message: "Task fetched successfully",
  });
});

/************************************************************************
 * @route http://localhost:4000/api/v1/tasks/:id
 * @description Update single tasks
 * @method PUT
 * @params title, description, priority, subTasks
 * @returns Task object
 *************************************************************************/

export const updateTask = asyncHandler(async (req, res, next) => {
  const { title, description, priority, subTasks } = req.body;

  const taskId = await Task.findById(req.params.id);
  if (!taskId) {
    res.status(404);
    throw new Error("Task not found");
  }

  const task = await Task.findByIdAndUpdate(
    taskId,
    { title, description, priority },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    data: task,
    success: true,
    message: "Task updated successfully",
  });
});

/************************************************************************
 * @route http://localhost:4000/api/v1/tasks/:id
 * @description Delete single tasks
 * @method DELETE
 * @params
 * @returns
 *************************************************************************/

export const deleteTask = asyncHandler(async (req, res, next) => {
  const taskId = await Task.findById(req.params.id);
  if (!taskId) {
    res.status(404);
    throw new Error("Task not found");
  }

  await Task.findByIdAndDelete(taskId);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});
