import config from "../config/index.js";
import User from "../models/user.schema.js";
import asyncHandler from "../services/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/************************************************************************
 * @route http://localhost:4000/api/v1/register
 * @description User register controller for creating a new user
 * @method POST
 * @params name, email, password
 * @returns User object
 *************************************************************************/

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide all the required fields");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // generate token
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "30d",
  });

  user.password = undefined;
  user.token = token;

  // send via a cookie
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.status(201).json({
    length: user.length,
    user,
    token,
    success: true,
    message: "User registered successfully",
    // data: await User.create(req.body),
  });
});

/************************************************************************
 * @route http://localhost:4000/api/v1/login
 * @description User login controller
 * @method POST
 * @params  email, password
 * @returns User object
 *************************************************************************/

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide all the required fields");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!user || !isMatch) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  if (user && isMatch) {
    // generate token
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "30d",
    });

    user.password = undefined;
    user.token = token;

    // send via a cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({
      length: user.length,
      user,
      token,
      success: true,
      message: "User logged in successfully",
    });
  }
});

/************************************************************************
 * @route http://localhost:4000/api/v1/users
 * @description Get all users
 * @method GET
 * @params
 * @returns User object
 *************************************************************************/

export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    length: users.length,
    users,
    success: true,
    message: "Users fetched successfully",
  });
});

/************************************************************************
 * @route http://localhost:4000/api/v1/users/:id
 * @description Get single users
 * @method GET
 * @params
 * @returns User object
 *************************************************************************/

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    length: user.length,
    user,
    success: true,
    message: "User fetched successfully",
  });
});

/************************************************************************
 * @route http://localhost:4000/api/v1/users/:id
 * @description Update single users
 * @params
 * @method PUT
 * @returns User object
 *************************************************************************/

export const updateUser = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;

  const userId = req.params.id;

  if (!userId) {
    res.status(400);
    throw new Error("User not found");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true }
  );

  res.status(200).json({
    length: user.length,
    user,
    success: true,
    message: "User updated successfully",
  });
});

/************************************************************************
 * @route http://localhost:4000/api/v1/users/:id
 * @description Delete single users
 * @params
 * @method Delete
 * @returns User object
 *************************************************************************/

export const deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  if (!userId) {
    res.status(400);
    throw new Error("User not found");
  }

  await User.findByIdAndDelete(userId);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
