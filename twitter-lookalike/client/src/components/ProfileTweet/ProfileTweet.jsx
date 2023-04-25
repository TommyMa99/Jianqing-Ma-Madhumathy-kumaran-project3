import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CTweet from "../Tweet/CTweet";
import Cookies from 'js-cookie';

const ProfileTweet = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [posts, setPosts] = useState([]);
    const { id } = useParams();
    const backend_url = "http://localhost:3000";
  const dispatch = useDispatch();
  const isCurrUser = id === currentUser._id

  useEffect(() => {
    async function fetchPosts() {
      const response = await axios.get(backend_url+`/tasks/${id}`);
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
  }, [currentUser, id]);

  async function deletePost(post){
    try {
      const token = Cookies.get('access_token');
      console.log(token);
      // const deleteTweet = await axios.delete(backend_url+"/tasks/"+post._id);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <CTweet />
        {/* <p className="font-bold pl-2 my-2">username</p>
      

      <form className="border-b-2 pb-6">
        <textarea
          type="text"
          placeholder="What's happening"
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto">
          Tweet
        </button>
      </form> */}
      <div className="content-all-tweet">
        <div className="tweet">
          {posts.map(post => (
            <div className="bg-gray-50 dark:bg-black p-10 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border max-w-xl h-full w-full">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <img className="h-11 w-11 rounded-full" src="/def_avatar.jpg"/>
                  <div className="ml-1.5 text-sm leading-tight">
                    <span className=" dark:text-white font-bold block ">{post.user.username}</span>
                    <span className="text-gray-500 dark:text-gray-400 font-normal block">@{post.user.email}</span>
                  </div>
                </div>
              </div>
              <p className=" dark:text-white block text-xl leading-snug mt-3">{post.description}</p>
              <img className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700" src=""/>
              <p className="text-gray-500 text-xs dark:text-gray-400 text-base py-1 my-0.5">{new Date(post.updatedAt).toLocaleString()}</p>
              <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1"></div>
              <div className="flex justify-between">
              <div>
                {isCurrUser ? (
                  <button className="px-4 -y-2 bg-yellow-500 rounded-full text-white" onClick={() => deletePost(post)}>
                    Delete
                  </button>
                    ) : (
                      null
                    )}
              </div>
              <div>
                {isCurrUser ? (
                  <button className="px-4 -y-2 bg-yellow-500 rounded-full text-white">
                    Update
                  </button>
                    ) : (
                      null
                    )}
              </div>
              </div>
            </div>
          </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};
{/* <div key={post._id}>{post.description}</div> */}
export default ProfileTweet;
