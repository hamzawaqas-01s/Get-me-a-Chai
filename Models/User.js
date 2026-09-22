import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String },
  username: { type: String, required: true },
  profilePic: { type: String },
  coverPic: { type: String },
  stripeAccountId: { type: String, default: null },
  stripeOnboarded: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
 
export default mongoose.models.User || model("User", UserSchema);