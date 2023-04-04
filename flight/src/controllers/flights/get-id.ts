import { Request, Response } from "express";
import { Flight } from "../../models/flight";

export const getFlightsById = async (req: Request, res: Response) => {
  try {
    const { flightId } = req.params;
    const flight = await Flight.findById(flightId);

    if (!flight) throw new Error("Flight not found");

    return res.status(200).json({
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
    return res.status(400).json({
      success: false,
      data: "Something went wrong!!",
    });
  }
};
