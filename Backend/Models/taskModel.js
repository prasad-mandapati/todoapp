const mongoose = require("mongoose");

// defining the schema for database collection
const taskSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "plase enter the task"],
    },
    taskStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// creating the database model for accessing the collection
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
