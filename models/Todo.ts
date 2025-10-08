import  { Schema, models, model } from "mongoose";

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite issue in Next.js hot reloading
export const Todo = models.Todo || model("Todo", TodoSchema);
