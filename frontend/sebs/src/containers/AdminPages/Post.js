import React, { useState, useEffect } from "react";
import ApiPost from "../../helpers/ApiPost";
import moment from "moment";

function Post({ post }) {
  const { id, postDescription, creationDate } = post;
  const [creatorUser, setCreatorUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    ApiPost.getPostCreatorName(id, token).then((response) => {
      if (response.ok) {
        response.text().then((data) => {
          setCreatorUser(data); // Set the state with the string data
        });
      } else {
        console.error("Failed to fetch creator name");
      }
    });
  }, []);

  const formatDate = (dateString) => {
    dateString = dateString.substring(0, dateString.length - 5);
    dateString = moment(dateString);
    return dateString.local();
  };

  return (
    <div className="border m-4 p-4 bg-white rounded drop-shadow-md space-y-2">
      <div className="flex flex-row space-x-2 items-center text-sm">
        <div className="flex flex-col">
          <b>{creatorUser}</b>
          <span className="text-sm text-stone-500">
            {formatDate(creationDate).format("YYYY-MM-DD HH:mm")}
          </span>
        </div>
      </div>

      <div>
        <div>{postDescription}</div>
      </div>
    </div>
  );
}

export default Post;
