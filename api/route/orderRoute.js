import express from "express";
import {isAuthenticated,authorizeAdmin} from "../middleware/authMiddlewae.js"
import { calcualteTotalSalesByDate, calculateTotalOrder, countTotalSales, createOrder, findOrderById, getAllOrders, getUserOrder, markOrderAsDelivered, markOrderAsPaid } from "../controller/orderController.js";

const router = express.Router()

router.route("/createPost").post(isAuthenticated,createOrder)
router.route("/").get(isAuthenticated,authorizeAdmin, getAllOrders)
router.route("/mine").get(isAuthenticated,getUserOrder)
router.route("/total-orders").get(calculateTotalOrder)
router.route("/total-sales").get(countTotalSales)
router.route("/total-sales-by-date").get(calcualteTotalSalesByDate);
router.route("/:id").get(isAuthenticated,findOrderById)
router.route("/:id/pay").put(isAuthenticated, markOrderAsPaid);
router
  .route("/:id/deliver")
  .put(isAuthenticated, authorizeAdmin, markOrderAsDelivered);
export default router