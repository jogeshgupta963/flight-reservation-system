import { Document, ObjectId } from "mongoose";

export interface AdminDoc extends Document {
  userId: ObjectId;
}
