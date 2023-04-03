import { Document, ObjectId } from "mongoose";

export enum Payment_Status {
  success = "Success",
  pending = "Pending",
  failed = "Failed",
}

export interface PaymentDoc extends Document {
  userId: ObjectId;
  payment_status: Payment_Status;
}
