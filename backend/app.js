require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/db");
dbConnect();

const app = express();

// routes import
const taskRoutes = require("./routes/taskRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", taskRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on PORT ${process.env.PORT}`);
});
