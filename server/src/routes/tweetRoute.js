const express = require("express");
const router = express.Router();

const { fetchTweets } = require("../controllers/tweetController");

router.get("/fetchTweets", fetchTweets);

module.exports = router;
