import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiPost from "../../helpers/ApiPost";
import ApiStudent from "../../helpers/ApiStudent";
import { Link } from "react-router-dom";

import { Icon } from "@iconify/react/dist/iconify.js";



function Thread({ user, postImage, likes, timestamp }) {
  const { id } = useParams();
  const [thread, setThread] = useState({});
  const [owner, setOwner] = useState(false);


  const userProfilePic = "https://64.media.tumblr.com/c1133f0cbab141081f6d1f19a12ff7de/tumblr_inline_qs7o9tjEB91r8mcco_540.jpg" //Placeholder
 
  return (
    <div className = "border m-4 p-4 bg-white rounded drop-shadow-md space-y-2">
      <div className = "flex flex-row space-x-2 items-center text-sm" >
        <div className = "items-center"> 
          
        </div>
        <div className = "flex flex-col" >
          <b>{user}</b>
          <span className = "text-sm text-stone-500">{timestamp}</span>
        </div>
      </div>
                <div> Created  by @{id}</div>
      <div>
      <span className="inline-block bg-green-200 text-green-800 text-xs px-2 ml-2 rounded-full uppercase font-semibold tracking-wide">
               {thread.title}
              </span>
      <span className="inline-block bg-green-200 text-green-800 text-xs px-2 ml-2 rounded-full uppercase font-semibold tracking-wide">
               {thread.description}
              </span>
              <span className="inline-block bg-green-200 text-green-800 text-xs px-2 ml-2 rounded-full uppercase font-semibold tracking-wide">
               {thread.postsinThread}
              </span>
      
=
      <div className = "font-light text-sm flex flex-row space-x-2 items-center text-stone-500">
        <Icon icon = "mdi:heart" /><div>Liked by {likes} people.</div>
      </div>
      <div className = "font-light text-sm flex flex-row space-x-2 items-center text-stone-500">
      <Link to="/createthread" className="text-orange-600 hover:text-orange-800" > Add Post to Thread + </Link>
      </div>
      </div>
    </div>
  );
}

export default Thread;
