import mongoose, { Document, Schema } from "mongoose";

export interface ITodo {
  title: string;
  description: string;
  completed: boolean;
  star: boolean;
  priority: string;
  user_id: mongoose.Types.ObjectId;
}

export interface ITodoModal extends ITodo, Document {}

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    star: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
  },
  {
    timestamps: true,
    collection: "todos",
    versionKey: false,
  }
);

export default mongoose.model<ITodoModal>("Todo", TodoSchema);