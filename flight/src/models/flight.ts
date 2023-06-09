import mongoose from "mongoose";
import { FlightDoc } from "../utils/typings/Schemas";

const flightSchema = new mongoose.Schema(
    {
        airlineId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Airline",
        },
        flightUID: {
            type: String,
            required: true,
        },
        dateOfFlight: {
            type: String,
            required: true,
        },
        timeOfFlight: {
            type: String,
            required: true,
        },
        fare: {
            type: Number,
            min: 0,
            required: true,
        },
        availableSeats: {
            type: Number,
            min: 0,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
            timestamps: true,
        },
    }
);

const Flight = mongoose.model<FlightDoc>("Flight", flightSchema);
export { Flight };
