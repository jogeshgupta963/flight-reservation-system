import mongoose from "mongoose";
import { AdminDoc } from "../utils/typings/Schemas";

const adminSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Admin = mongoose.model<AdminDoc>("Admin", adminSchema);
export { Admin };
