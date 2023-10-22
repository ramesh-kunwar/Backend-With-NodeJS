const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Task Name is required"],
  },

  completed: {
    type: Boolean,
    default: false,
  },

  subTask: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubTask",
    },
  ],
});

module.exports = mongoose.model("Tasks", taskSchema);
