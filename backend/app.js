require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/db");
const bodyParser = require('body-parser');
dbConnect();

const app = express();

// routes import
const taskRoutes = require("./routes/taskRoutes");

const subTaskRoutes = require("./routes/subTaskRoutes");

app.use(express.json());
// Parse JSON requests
app.use(bodyParser.json());

// Parse URL-encoded requests
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", taskRoutes);
app.use("/api/v1", subTaskRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on PORT ${process.env.PORT}`);
});
