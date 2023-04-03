import mongoose from "mongoose";
import { AdminDoc } from "../utils/typings/Schemas";

const adminSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

const Admin = mongoose.model<AdminDoc>("Admin", adminSchema);
export { Admin };
