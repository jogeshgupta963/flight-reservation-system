import { body } from "express-validator";

export const flightUpdateArgs = [
    body("dateOfFlight").isString().optional(),
    body("timeOfFlight").isString().optional(),
    body("fare").isInt().optional(),
    body("availableSeats").isInt().optional(),
];
