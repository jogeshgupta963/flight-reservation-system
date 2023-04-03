import { Document } from "mongoose";

export interface AirlineDoc extends Document {
  name: string;
  terms_and_conditions: string;
}
