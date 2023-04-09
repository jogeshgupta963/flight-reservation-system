import { body } from "express-validator";

export const flightCreateArgs = [
    body("airlineId").isString().withMessage("airline Id required"),
    body("dateOfFlight").isString().withMessage("date of flight required"),
    body("timeOfFlight").isString().withMessage("time of flight required"),
    body("fare").isInt().withMessage("fare of flight required"),
    body("availableSeats")
        .isInt()
        .withMessage("availableSeats of flight required"),
];
