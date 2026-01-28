const axios = require("axios");

const fetchTweetsFromTwitter = async (username) => {
  const url = `https://api.twitter.com/2/tweets/search/recent?query=from:${username}&max_results=5`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
  });

  return response.data.data.map(tweet => ({
    tweet_id: tweet.id,
    text: tweet.text,
    url: `https://x.com/${username}/status/${tweet.id}`,
    author: username,
    created_at: tweet.created_at || new Date()
  }));
};

module.exports = { fetchTweetsFromTwitter };
