const express = require("express");
const passport = require('passport');
const app = express();
const path = require("path");
const connectDB = require("./config/db");
require('./middlewares/passport');
connectDB();

// Init middleware
app.use(express.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  // allow options method work, ask experts for more
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }
  next();
})
app.use(passport.initialize());
//Define routes
app.use("/admins", require("./routes/index"));
  
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});