const express = require("express");

const app = express();
const path = require("path");
const connectDB = require("./config/db");

connectDB();

// Init middleware
app.use(express.json());

//Define routes
app.use("/admins", require("./routes/index"));
  
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});