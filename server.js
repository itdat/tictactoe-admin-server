const express = require("express");
const passport = require('passport');
const app = express();
const path = require("path");
const connectDB = require("./config/db");
require('./middlewares/passport');
connectDB();

// Init middleware
app.use(express.json());
app.use(passport.initialize());
//Define routes
app.use("/admins", require("./routes/index"));
  
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});