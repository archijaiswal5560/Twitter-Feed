const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("../models");

db.sequelize.authenticate()
  .then(() => console.log("Sequelize connected to MySQL"))
  .catch(err => console.error(" DB connection failed:", err));


  const twitterHandleRoutes = require("./routes/twitterHandleRoute");
  const tweetRoutes = require("./routes/tweetRoute");

  const startTweetScheduler = require("./jobs/tweetScheduler");
startTweetScheduler();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", twitterHandleRoutes);
app.use("/api", tweetRoutes);

app.get("/", (req, res) => {
  res.send("Twitter Feed Display Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
