import mongoose from "mongoose";
import { AirlineDoc } from "../utils/typings/Schemas";

const airlineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  terms_and_conditions: {
    type: String,
    required: true,
  },
});

const Airline = mongoose.model<AirlineDoc>("Airline", airlineSchema);
export { Airline };
