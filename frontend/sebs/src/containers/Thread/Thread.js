import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiPost from "../../helpers/ApiPost";
import ApiStudent from "../../helpers/ApiStudent";
import { Link } from "react-router-dom";
import ApiThread from "../../helpers/ApiThread";
import moment from "moment";

import { Icon } from "@iconify/react/dist/iconify.js";

function Thread({ thread }) {
  const { threadId } = useParams();
  const { id, title, description, tag, creationDate } = thread;
  const [owner, setOwner] = useState(false);
  const [creatorUser, setCreatorUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    ApiThread.getThreadCreatorName(id, token).then((response) => {
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
        <div className="items-center"></div>
        <div className="flex flex-col">
          <span className="text-sm text-stone-500">@{creatorUser}</span>
          <span className="text-sm text-stone-500">
            {formatDate(creationDate).format("YYYY-MM-DD HH:mm")}
          </span>
        </div>
      </div>
      <div>
        <span className="inline-block bg-green-200 text-green-800 text-xs px-2 ml-2 rounded-full uppercase font-semibold tracking-wide">
          {tag}
        </span>

        <div className="font-light text-sm flex flex-row space-x-2 items-center text-stone-500">
          <Link
            to={`/postsinthread/${id}`}
            className="text-orange-600 hover:text-orange-800"
          >
            View Posts in Thread
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Thread;
