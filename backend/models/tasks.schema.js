import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  subTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

export default mongoose.model("task", taskSchema);
