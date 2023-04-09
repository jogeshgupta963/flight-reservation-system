import { Request, Response } from "express";
import { Flight } from "../../models/flight";
import { Airline } from "../../models/airline";

export const createFlight = async (req: Request, res: Response) => {
    try {
        const { airlineId, dateOfFlight, timeOfFlight, fare, availableSeats } =
            req.body;

        const flightUID = crypto.randomUUID().split("-")[1];

        const airlineExists = await Airline.count({
            _id: airlineId,
        });
        //check for airline
        if (airlineExists != 1) {
            return res.status(402).json({
                success: false,
                data: "invalid airline id",
            });
        }

        //new flight
        const flight = new Flight({
            airlineId,
            dateOfFlight,
            timeOfFlight,
            fare,
            availableSeats,
            flightUID,
        });
        await flight.save();

        if (!flight) {
            return res.status(500).json({
                success: false,
                data: "Server Down",
            });
        }

        res.status(200).json({
            success: true,
            data: flight,
        });
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({
                success: false,
                data: err.message,
            });
        }
    }
};
