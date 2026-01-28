import { useEffect, useState } from "react";
import { fetchTweets } from "./api/tweetApi";
import { QRCodeSVG } from "qrcode.react";

function App() {
  const [tweets, setTweets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch tweets once
  useEffect(() => {
    const loadTweets = async () => {
      try {
        const res = await fetchTweets();
        if (res?.data?.length > 0) {
          setTweets(res.data);
        }
      } catch (error) {
        console.error("Error fetching tweets", error);
      } finally {
        setLoading(false);
      }
    };

    loadTweets();
  }, []);

  // Rotate tweets
  useEffect(() => {
    if (tweets.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tweets.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [tweets]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading tweets...
      </div>
    );
  }

  if (tweets.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        No new tweets available
      </div>
    );
  }

  const tweet = tweets[currentIndex];

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

        {/* Tweet content */}
        <div className="md:col-span-2 text-center md:text-left">
          <p className="text-gray-400 text-lg mb-2">
            @{tweet.author}
          </p>
          <p className="text-3xl font-semibold leading-relaxed">
            {tweet.text}
          </p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center">
          <div className="bg-white p-4 rounded">
            <QRCodeSVG
              value={tweet.url}
              size={180}
              bgColor="#ffffff"
              fgColor="#000000"
            />
            <p className="text-black text-sm text-center mt-2">
              Scan to view
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
