import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import EditProfile from "../../components/EditProfile/EditProfile";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Tweet from "../../components/Tweet/Tweet";


import { following } from "../../redux/userSlice";
import ProfileTweet from "../../components/ProfileTweet/ProfileTweet";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { currentUser, token } = useSelector((state) => state.user);
  const [userTweets, setUserTweets] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const backend_url = "https://twitter5610-backend.herokuapp.com";
  const isCurrUser = id === currentUser?.user?._id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweets = await axios.get(backend_url+`/tasks/${id}`);
        const userProfile = await axios.get(backend_url+`/find/${id}`);
        console.log(userTweets);
        setUserTweets(userTweets.data);
        setUserProfile(userProfile.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser, id]);
  // const handleFollow = async () => {
  //   if (!currentUser.following.includes(id)) {
  //     try {
  //       const follow = await axios.put(backend_url+`/follow/${id}`, {
  //         id: currentUser.user._id,
  //       });
  //       dispatch(following(id));
  //     } catch (err) {
  //       console.log("error", err);
  //     }
  //   } else {
  //     try {
  //       const unfollow = await axios.put(backend_url+`/unfollow/${id}`, {
  //         id: currentUser.user._id,
  //       });

  //       dispatch(following(id));
  //     } catch (err) {
  //       console.log("error", err);
  //     }
  //   }
  // };
  async function handleConfirmClick() {
    try {
      if (token != null) {
        const updateUser = await axios.patch(
          backend_url + "/users/me",
          {
            description: inputValue
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        window.location.reload(false);
      }
    } catch (err) {
      console.log(err);
    }
    setIsOpen(false);
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="px-6">
          <LeftSidebar />
        </div>
        <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                ariaHideApp={false}
                className="fixed inset-0 z-50 flex items-center justify-center"
              >
                <div className="bg-stone-300	 rounded-lg shadow-lg p-6 max-w-sm mx-auto">
                  <h2 className="text-lg font-semibold mb-4">Please edit you description</h2>
                  <input
                    type="text"
                    className="border border-gray-400 p-2 rounded w-full mb-4"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <button
                      className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                      onClick={() => handleConfirmClick()}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </Modal>
        <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <div className="flex items-center flex-col justify-start">
            <p className="font-bold text-md text-gray-800"> {userProfile?.username}</p>

            <p className="text-gray-500 text-xxs dark:text-gray-400 text-base py-1 my-0.5">
              User Since: {new Date(userProfile?.createdAt || '').toLocaleString('en-US', {
                dateStyle: 'short',
                timeStyle: 'short'
              })}
            </p>
            <div>
                {userProfile?.description !== undefined ? (
                  <p>{"\""+userProfile?.description+"\""}</p>
                  ) : (
                      null
                  )}
              </div>
              {isCurrUser ? (
                <div>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="ml-2 flex items-center justify-center rounded-md bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </div>
                ) : (
                null
              )}
          </div>
          <div className="mt-6">
            
                    <ProfileTweet  />
                  
          </div>
        </div>

        <div className="px-6">
          <RightSidebar />
        </div>
      </div>
    </>
  );
};

export default Profile;
