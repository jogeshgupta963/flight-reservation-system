import mongoose from "mongoose";

export const connection = async (uri: string) => {
  return mongoose.connect(uri);
};
