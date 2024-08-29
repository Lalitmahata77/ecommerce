import express from "express"
import { deleteUser, getAllUser, getUserByAdmin, login, logout, register, updatePassword, updateUser, updateUserByAdmin, userProfile } from "../controller/user.controller.js"
import { authorizeAdmin, isAuthenticated } from "../middleware/authMiddlewae.js"
const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").post(logout) 
router.route("/getAll").get(isAuthenticated,authorizeAdmin,getAllUser)
router.route("/me/:id").get(isAuthenticated,userProfile)
.get(isAuthenticated,authorizeAdmin,getUserByAdmin)
router.route("/password/update").put(isAuthenticated,updatePassword)
router.route("/updateUser").put(isAuthenticated,updateUser)
router.route("/updateUsers/admin/:id").put(isAuthenticated,authorizeAdmin,updateUserByAdmin)
router.route("/delet/admin/:id").delete(isAuthenticated,authorizeAdmin,deleteUser)

export default router