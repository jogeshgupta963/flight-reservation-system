import { Request, Response } from "express";
import { Airline } from "../models/airline";

export async function getAllAirline(req: Request, res: Response) {
    try {
        const findsome = await Airline.find();
        return res.status(200).json(findsome);
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: err,
        });
    }
}
