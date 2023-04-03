import { Document, ObjectId } from "mongoose";

export enum Booking_staus {
  pending = "Pending",
  cancelled = "Cancelled",
  success = "Success",
}

export interface TicketDoc extends Document {
  userId: ObjectId;
  pnrNumber: string;
  booking_status: Booking_staus;
}
