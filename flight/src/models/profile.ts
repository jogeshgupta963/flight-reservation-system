import mongoose from "mongoose";
import { ProfileDoc } from "../utils/typings/Schemas";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    image: {
      type: String,
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

const Profile = mongoose.model<ProfileDoc>("Profile", profileSchema);

export { Profile };
