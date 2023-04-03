import mongoose from "mongoose";

export interface ProfileDoc extends mongoose.Document {
  userId: mongoose.ObjectId;
  address?: string;
  phoneNumber: string;
  image: string;
}
