const db = require("../../models");
const { DisplayedTweet } = db;

// Generate STABLE mock tweets (IMPORTANT FIX)
const generateMockTweets = (handle) => {
  return [
    {
      tweet_id: `${handle}_tweet_001`,
      text: `This is a mock tweet from @${handle}`,
      url: `https://x.com/${handle}/status/${handle}_tweet_001`,
      author: handle,
      created_at: new Date("2024-01-01")
    }
  ];
};

// Check if tweet already displayed
const isTweetDisplayed = async (tweetId) => {
  const tweet = await DisplayedTweet.findOne({
    where: { tweet_id: tweetId }
  });
  return !!tweet;
};

// Save displayed tweet
const saveDisplayedTweet = async (tweet) => {
  return await DisplayedTweet.create({
    tweet_id: tweet.tweet_id,
    tweet_url: tweet.url
  });
};

module.exports = {
  generateMockTweets,
  isTweetDisplayed,
  saveDisplayedTweet
};
