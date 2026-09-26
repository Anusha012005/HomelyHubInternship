import express from "express";

const bookingRouter = express.Router();

bookingRouter.post("/test", (req, res) => {
  res.json({ message: "Booking router is working" });
});

import {
  getBookingDetails,
  getUserBookings,
  createOrder,
  verifyPayment
} from "../controllers/bookingController.js";

import { protect } from "../controllers/authController.js";

bookingRouter.get("/", protect, getUserBookings);

bookingRouter.get("/:bookingId", protect, getBookingDetails);

bookingRouter.post("/create-order", protect, createOrder);

bookingRouter.post("/verify-payment", protect, verifyPayment);

export { bookingRouter };