import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
//import "./Post.css";

function Post({ user, postImage, likes, timestamp, post }) {
  const userProfilePic =
    "https://64.media.tumblr.com/c1133f0cbab141081f6d1f19a12ff7de/tumblr_inline_qs7o9tjEB91r8mcco_540.jpg"; //Placeholder
  return (
    <div className="border m-4 p-4 bg-white rounded drop-shadow-md space-y-2">
      <div className="flex flex-row space-x-2 items-center text-sm">
        <div className="items-center">
          <img
            src={userProfilePic}
            className="rounded-full mx-auto w-10 h-10 shadow-md border-4 border-white"
          />
        </div>
        <div className="flex flex-col">
          <b>{user}</b>
          <span className="text-sm text-stone-500">{timestamp}</span>
        </div>
      </div>

      <div>
        <b> Thread Header Goes Here! Wow! </b>
        <div>
          {" "}
          Post Content Here Lorem Ipsum Whatever Man I Don't Even Care Anymore{" "}
        </div>

        <div className="m-2">
          <img src={postImage} alt="Post Image" className="h-48" />
        </div>
        <div className="font-light text-sm flex flex-row space-x-2 items-center text-stone-500">
          <Icon icon="mdi:heart" />
          <div>Liked by {likes} people.</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
