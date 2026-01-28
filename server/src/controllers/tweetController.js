const db = require("../../models");
const { TwitterHandle } = db;

const {
  generateMockTweets,
  isTweetDisplayed,
  saveDisplayedTweet
} = require("../services/tweetService");

exports.fetchTweets = async (req, res) => {
  try {
    const handles = await TwitterHandle.findAll({
      where: { is_active: true }
    });

    let newTweets = [];

    for (const handleObj of handles) {
      const tweets = generateMockTweets(handleObj.handle);

      for (const tweet of tweets) {
        const alreadyDisplayed = await isTweetDisplayed(tweet.tweet_id);

        if (!alreadyDisplayed) {
          await saveDisplayedTweet(tweet); // ✅ NOW SAVES
          newTweets.push(tweet);
        }
      }
    }

    res.status(200).json({
      message: "Tweets fetched successfully",
      count: newTweets.length,
      data: newTweets
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
