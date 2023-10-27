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
  const { title, description, priority, subTasks, completed } = req.body;

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
    completed,
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

/************************************************************************
 * @route http://localhost:4000/api/v1/tasks/:id/completed
 * @description  Mark task as completed
 * @method PUT
 * @params
 * @returns
 *************************************************************************/

export const markTaskAsCompleted = asyncHandler(async (req, res, next) => {
  const { completed } = req.body;
  const taskId = await Task.findById(req.params.id);

  if (!taskId) {
    res.status(404);
    throw new Error("Task not found");
  }

  const task = await Task.findByIdAndUpdate(
    taskId,
    { completed: true },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    data: task,
    success: true,
    message: "Task updated successfully",
  });
});

/************************************************************************
 * @route http://localhost:4000/api/v1/tasks/:id/notcompleted
 * @description  Mark task as not completed
 * @method PUT
 * @params
 * @returns
 *************************************************************************/

export const markTaskAsNotCompleted = asyncHandler(async (req, res, next) => {
  const { completed } = req.body;
  const taskId = await Task.findById(req.params.id);

  if (!taskId) {
    res.status(404);
    throw new Error("Task not found");
  }

  const task = await Task.findByIdAndUpdate(
    taskId,
    { completed: false },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    data: task,
    success: true,
    message: "Task updated successfully",
  });
});

/************************************************************************
 * @route http://localhost:4000/api/v1/tasks/:id/subtasks
 * @description  Add subtasks to a task
 * @method POST
 * @params
 * @returns
 *************************************************************************/

export const addSubTasks = asyncHandler(async (req, res, next) => {
  const { title, completed } = req.body;

  const taskId = req.params.id;

  if (!taskId) {
    res.status(400);
    throw new Error("Task id is required");
  }

  const task = await Task.findById(taskId);

  task.subTasks.push({ title, completed });

  await task.save();

  if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }

  res.status(200).json({
    data: task,
    success: true,
    message: "Subtask added successfully",
  });
});

/************************************************************************
 * @route http://localhost:4000/api/v1/tasks/:id/subtasks/:subtaskId
 * @description  Get single subtasks from task
 * @method GET
 * @params
 * @returns
 *************************************************************************/

export const getSingleSubTask = asyncHandler(async (req, res, next) => {
  const { id, subTaskId } = req.params;

  if (!id) {
    res.status(400);
    throw new Error("Task not found");
  }

  if (!subTaskId) {
    res.status(400);
    throw new Error("Subtask not found");
  }

  const task = await Task.findById(id);

  const subtask = task.subTasks.id(subTaskId);

  res.status(200).json({
    data: subtask,
    success: true,
    message: "Subtask fetched successfully",
  });
});

/************************************************************************
 * @route http://localhost:4000/api/v1/tasks/:id/subtasks/
 * @description  Get all subtasks from task
 * @method GET
 * @params
 * @returns
 *************************************************************************/

export const getAllSubTasks = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Task not found");
  }

  const task = await Task.findById(id);

  const subTask = task.subTasks;

  res.status(200).json({
    data: subTask,
    success: true,
    message: "Subtask fetched successfully",
  });
});

/************************************************************************
 * @route http://localhost:4000/api/v1/tasks/:id/subtasks/:subtaskId
 * @description  Delete subtasks from task
 * @method DELETE
 * @params
 * @returns
 *************************************************************************/

export const deleteSubTask = asyncHandler(async (req, res, next) => {
  const { id, subTaskId } = req.params;

  if (!id) {
    res.status(400);
    throw new Error("Task not found");
  }

  if (!subTaskId) {
    res.status(400);
    throw new Error("Subtask not found");
  }

  const task = await Task.findById(id);

  task.subTasks = task.subTasks.filter((subtask) => {
    return subtask._id.toString() !== subTaskId.toString();
  });

  await task.save();
  res.status(400).json({
    noOfSubTask: task.subTasks.length,
    task,
  });
});

/************************************************************************
 * @route http://localhost:4000/api/v1/tasks/:id/subtasks/:subtaskId
 * @description  Update subtasks from task
 * @method PUT
 * @params
 * @returns
 *************************************************************************/

export const updateSubTask = asyncHandler(async (req, res, next) => {
  const { id, subTaskId } = req.params;
  const { title, completed } = req.body;

  if (!id) {
    res.status(400);
    throw new Error("Task not found");
  }

  if (!subTaskId) {
    res.status(400);
    throw new Error("Subtask not found");
  }

  const task = await Task.findById(id);

  const subTask = task.subTasks.id(subTaskId);

  if (title) {
    subTask.title = title;
  }
  if (completed) {
    subTask.completed = completed;
  }

  await task.save();

  res.status(200).json({
    task,

  });
});
