import { Request, Response } from "express";
import { Flight } from "../../models/flight";

export const updateFlight = async (req: Request, res: Response) => {
    try {
        const { dateOfFlight, timeOfFlight, fare, availableSeats } = req.body;

        const { flightId } = req.params;

        const flight = await Flight.findById(flightId);
        if (!flight) {
            return res.status(400).json({
                success: false,
                data: "Invalid flight ",
            });
        }

        flight.dateOfFlight = dateOfFlight || flight.dateOfFlight;
        flight.timeOfFlight = timeOfFlight || flight.timeOfFlight;
        flight.fare = fare || flight.fare;
        flight.availableSeats = availableSeats || flight.availableSeats;

        await flight.save();
        return res.status(201).json({
            success: true,
            data: flight,
        });
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({
                success: false,
                data: err.message,
            });
        }
    }
};
