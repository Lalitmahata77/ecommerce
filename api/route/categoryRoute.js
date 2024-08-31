import express from "express"
import { authorizeAdmin, isAuthenticated } from "../middleware/authMiddlewae.js"
import { createCategory, listCategory, readCategory, removeCategory, updateCategory } from "../controller/categoryController.js"

const router = express.Router()



router.route("/").post(isAuthenticated,authorizeAdmin,createCategory)
router.route("/:categoryId").put(isAuthenticated, authorizeAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(isAuthenticated, authorizeAdmin,  removeCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router