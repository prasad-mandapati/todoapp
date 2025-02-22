const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const taskRouter = require("./Routes/taskRoutes");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // to restirict the access

//  api end points
app.use("/api/tasks", taskRouter);

const port = process.env.PORT || 5000; //initializing port to run the server

// connecting to the mangodb localhost
mongoose
  .connect("mongodb://localhost:27017/todoapp")
  .then(() => {
    app.listen(port, () => {
      console.log("server is running on port 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
