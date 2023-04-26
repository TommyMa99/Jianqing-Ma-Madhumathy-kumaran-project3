 import axios from "axios";
import React, { useEffect, useState } from "react";
import CTweet from "./CTweet";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Tweet = () => {
  const { currentUser } = useSelector((state) => state.user);
  const backend_url = "http://localhost:3000";
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      const response = await axios.get(backend_url+'/tasks?sortBy=createdAt:desc');
      const postsWithUserInfo = await Promise.all(
        response.data.map(async post => {
          const userResponse = await axios.get(backend_url+`/find/${post.owner}`);
          return {
            ...post,
            user: userResponse.data,
          };
        })
      );
      setPosts(postsWithUserInfo);
    }
    fetchPosts();
  }, []);

  return (
    <div>
      
        <p className="font-bold pl-2 my-2">Explore</p>
        {currentUser != null ? (
        <CTweet /> ) :( null)}
      

      
      
      <div className="content-all-tweet">
        <div className="tweet">
          {posts.map(post => (
            <div className="bg-gray-50 dark:bg-black p-10 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border max-w-xl h-full w-full">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <img className="h-11 w-11 rounded-full" src="/def_avatar.jpg"/>
                  <Link to={`/profile/${post.user._id}`}>
                  <div className="ml-1.5 text-sm leading-tight">
                    <span className="text-black dark:text-white font-bold block ">{post.user.username}</span>
                    <span className="text-gray-500 dark:text-gray-400 font-normal block">@{post.user.email}</span>
                  </div>
                  </Link>
                </div>
              </div>
              <p className="text-black dark:text-white block text-xl leading-snug mt-3">{post.description}</p>
              <img className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700" src=""/>
              <p className="text-gray-500 text-xs dark:text-gray-400 text-base py-1 my-0.5">{new Date(post.updatedAt).toLocaleString()}</p>
              <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1"></div>
            </div>
          </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};
{/* <div key={post._id}>{post.description}</div> */}
export default Tweet;
