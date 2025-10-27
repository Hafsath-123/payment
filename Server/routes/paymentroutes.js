const express=require("express");
const { createCheckoutSession } = require("../Controller/paymentController");
const router=express.Router();



router.post("/checkout",createCheckoutSession);

module.exports=router;