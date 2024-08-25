import express from "express"
import { deleteUser, getAllUser, getUserByAdmin, login, logout, register, updatePassword, updateUser, updateUserByAdmin, userProfile } from "../controller/user.controller.js"
import { authorizeRole, isAuthenticated } from "../middleware/authMiddlewae.js"
const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").post(logout) 
router.route("/getAll").get(isAuthenticated,authorizeRole("admin"),getAllUser)
router.route("/me/:id").get(isAuthenticated,userProfile)
.get(isAuthenticated,authorizeRole("admin"),getUserByAdmin)
router.route("/password/update").put(isAuthenticated,updatePassword)
router.route("/updateUser/:id").put(isAuthenticated,updateUser)
router.route("/updateUser/admin/:id").put(isAuthenticated,authorizeRole("admin"),updateUserByAdmin)
router.route("/delet/admin/:id").delete(isAuthenticated,authorizeRole("admin"),deleteUser)

export default router