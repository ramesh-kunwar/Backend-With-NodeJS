import express from 'express'
import { deleteUser, getUser, getUsers, loginUser, registerUser, updateUser } from '../controller/user.controller.js'
const router = express.Router()


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route("/users").get(getUsers)
router.route("/users/:id").get(getUser).put(updateUser).delete(deleteUser)


export default router