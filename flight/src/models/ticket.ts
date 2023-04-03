import mongoose from "mongoose";
import { Booking_staus, TicketDoc } from "../utils/typings/Schemas";

const ticketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  pnrNumber: {
    type: String,
    required: true,
  },
  booking_status: {
    type: String,
    enum: Booking_staus,
    default: Booking_staus.pending,
  },
});

const Ticket = mongoose.model<TicketDoc>("Ticket", ticketSchema);
export { Ticket };
