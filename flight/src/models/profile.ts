import mongoose from "mongoose";
import { ProfileDoc } from "../utils/typings/Schemas";

const profileSchema = new mongoose.Schema(
  {
    ProfileId: {
      type: Number,
    },
  Image: {
    type: String,
  },
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  phone_number: {
    type: Number,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  pincode: {
    type: Number,
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
