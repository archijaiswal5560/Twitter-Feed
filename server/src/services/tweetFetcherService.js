const db = require("../../models");
const { TwitterHandle } = db;

const {
  generateMockTweets,
  isTweetDisplayed,
  saveDisplayedTweet
} = require("./tweetService");

const { fetchTweetsFromTwitter } = require("./twiiterApiService");

const useRealTwitter = process.env.USE_REAL_TWITTER === "true";

const fetchAndStoreTweets = async () => {
  const handles = await TwitterHandle.findAll({
    where: { is_active: true }
  });

  let newTweets = [];

  for (const handleObj of handles) {
    let tweets = [];

    if (useRealTwitter && process.env.TWITTER_BEARER_TOKEN) {
      try {
        console.log("Fetching real tweets for", handleObj.handle);
        tweets = await fetchTweetsFromTwitter(handleObj.handle);
      } catch (err) {
        console.warn(" Twitter API failed, falling back to mock data");
        tweets = generateMockTweets(handleObj.handle);
      }
    } else {
      tweets = generateMockTweets(handleObj.handle);
    }

    for (const tweet of tweets) {
      const alreadyDisplayed = await isTweetDisplayed(tweet.tweet_id);

      if (!alreadyDisplayed) {
        await saveDisplayedTweet(tweet);
        newTweets.push(tweet);
      }
    }
  }

  return newTweets;
};

module.exports = { fetchAndStoreTweets };
