import { Document, ObjectId } from "mongoose";

export interface FlightDoc extends Document {
    airlineId: ObjectId;
    flightUID: string;
    dateOfFlight: string;
    timeOfFlight: string;
    fare: number;
    availableSeats: number;
}
