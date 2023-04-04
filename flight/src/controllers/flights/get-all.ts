import { Request, Response } from "express";
import { Flight } from "../../models/flight";

export const getAllFlights = async (req: Request, res: Response) => {
  try {
    const flights = await Flight.find({});
    return res.status(200).json({
      success: true,
      data: flights || [],
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
