import express from "express";
import { getAllFlights, getFlightsById } from "../controllers/flights";

export const router = express.Router();

router.route("/").get(getAllFlights);
router.route("/:flightId").get(getFlightsById);
