import express from "express"
import { authorizeAdmin, isAuthenticated } from "../middleware/authMiddlewae.js"
import checkId from "../middleware/checkId.js"
import formidable from "express-formidable";
import { addProduct, addProductReview, deleteProduct, fetchNewProduct, fetchProduct, fetchProductById, fetchProducts, fetchTopProduct, filterProducts, updateProduct } from "../controller/productController.js";
const router = express.Router()


router.route("/").post(isAuthenticated,authorizeAdmin,formidable(),addProduct)
.get(fetchProduct)
router.route("/topproduct").get(fetchTopProduct)
router.route("/newProducts").get(fetchNewProduct)
router.route("/allproducts").get(fetchProducts)

router.route("/filtered-products").post(filterProducts);
router.route("/:id").put(isAuthenticated,authorizeAdmin,formidable(),updateProduct)
.delete(isAuthenticated,authorizeAdmin,deleteProduct)
.get(fetchProductById)
router.route("/:id/review").post(isAuthenticated,addProductReview)
export default router