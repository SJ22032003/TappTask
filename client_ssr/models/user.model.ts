import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
  profileImg: string;
  email: string;
  username: string;
  password: string;
  role:string;
}

export interface IUserModal extends IUser, Document {}

const UserSchema = new Schema(
  {
    profileImg: {
      type: String,
      default: `https://api.dicebear.com/6.x/lorelei/svg?seed=${Math.floor(Math.random())}`,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    collection: "users",
    versionKey: false,
  }
);

export default mongoose.model<IUserModal>("User", UserSchema);
