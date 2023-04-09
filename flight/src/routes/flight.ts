import express from "express";
import {
    createFlight,
    getAllFlights,
    getFlightsById,
    updateFlight,
} from "../controllers/flights";
import { isLoggedIn } from "../middlewares/authenticated";
import { requestValidator } from "../middlewares/requestValidation";
import {
    flightCreateArgs,
    flightUpdateArgs,
} from "../utils/validators/flight/";

export const router = express.Router();

router
    .route("/")
    .get(getAllFlights)
    .post(isLoggedIn, flightCreateArgs, requestValidator, createFlight);
router
    .route("/:flightId")
    .get(getFlightsById)
    .put(isLoggedIn, flightUpdateArgs, requestValidator, updateFlight);
