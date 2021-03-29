import express from "express";
import {
    placeOrders,perticularPersonOrderList,orderslist,updateorderslist
} from "../controllers/orders/orders.js";


const router = express.Router();

router.post("/order", placeOrders);
router.get("/orderslist/:id", perticularPersonOrderList);
router.get("/allorderslist", orderslist);
router.patch("/updateorderslist", updateorderslist);

export default router;