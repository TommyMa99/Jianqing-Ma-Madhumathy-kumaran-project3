import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Tweet from "../../components/Tweet/Tweet";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import Explore from "../Explore/Explore";

 import { useSelector } from "react-redux";
import Signin from "../Signin/Signin";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  
  console.log("user", currentUser);
  return (
    <>  
    
       
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="px-6">
            <LeftSidebar />
          </div>
          <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
            <Tweet />
          </div>
          <div className="px-6">
            <RightSidebar />
          </div>
        </div>
      
      
    </>
  );
};

export default Home;
