const { fetchAndStoreTweets } = require("../services/tweetFetcherService");

exports.fetchTweets = async (req, res) => {
  try {
    const tweets = await fetchAndStoreTweets();

    res.status(200).json({
      message: "Tweets fetched successfully",
      count: tweets.length,
      data: tweets
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
