import React, { useState } from "react";
// import TimelineTweet from "../TimelineTweet/TimelineTweet";

import { useSelector } from "react-redux";
import axios from "axios";

const CTweet = () => {
  const [tweetText, setTweetText] = useState("");

  const { currentUser, token } = useSelector((state) => state.user);
  const backend_url = "http://localhost:3000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (token != null) {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const submitTweet = await axios.post(backend_url+"/createtweet", {
          owner: currentUser.user._id,
          description: tweetText,
        }, config);
        window.location.reload(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {currentUser && (
        <p className="font-bold pl-2 my-2">{currentUser.user.username}</p>
      )}

      <form className="border-b-2 pb-6">
        <textarea
          onChange={(e) => setTweetText(e.target.value)}
          type="text"
          placeholder="What's happening"
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <button
          onClick= { currentUser != null ? (
            handleSubmit ) : ( null) }
          className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
        >
          Tweet
        </button>
      </form>
      {/* <TimelineTweet /> */}
    </div>
  );
};

export default CTweet;