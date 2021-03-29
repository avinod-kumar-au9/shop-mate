import express from "express";

import {StripePayment} from "../controllers/stripepayment/stripe.js"

const router = express.Router();

router.post("/payment",StripePayment)

export default router