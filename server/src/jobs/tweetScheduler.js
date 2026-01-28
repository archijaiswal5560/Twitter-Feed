const cron = require("node-cron");
const axios = require("axios");

// Runs every hour
const startTweetScheduler = () => {
  cron.schedule("0 * * * *", async () => {
    try {
      console.log("Running hourly tweet fetch job...");

      await axios.get("http://localhost:5000/api/fetchTweets");

      console.log("Hourly tweet fetch completed");
    } catch (error) {
      console.error("Scheduler error:", error.message);
    }
  });
};

module.exports = startTweetScheduler;
