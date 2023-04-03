import mongoose from "mongoose";
import { PaymentDoc, Payment_Status } from "../utils/typings/Schemas";
const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paymentStatus: {
      type: String,
      enum: Payment_Status,
      default: Payment_Status.pending,
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

const Payment = mongoose.model<PaymentDoc>("Payment", paymentSchema);
export { Payment };
