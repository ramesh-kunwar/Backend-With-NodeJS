import express from "express";
import {
  deleteUser,
  getUser,
  getUserProfile,
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controller/user.controller.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/users/:id").get(getUser).put(updateUser).delete(deleteUser);

router.route("/users").get(getUsers)
router.route("/logout").get(logoutUser)
router.route("/profile").get(isLoggedIn, getUserProfile);

export default router;
