console.log("TRIP ROUTER LOADED");

import express from "express";

import { createTripPlan } from "../controllers/tripController.js";

const tripRouter = express.Router();

tripRouter.post("/test", (req, res) => {
  res.json({ message: "Trip router is working" });
});

tripRouter.route("/").post(createTripPlan);

export { tripRouter };