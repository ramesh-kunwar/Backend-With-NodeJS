const mongoose = require("mongoose");

const subTaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Task Name is required"],
  },

  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("SubTask", subTaskSchema);
