import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiPost from "../../helpers/ApiPost";
import ApiStudent from "../../helpers/ApiStudent";
import { Link } from "react-router-dom";

import { Icon } from "@iconify/react/dist/iconify.js";

function Thread({ thread }) {
  const { threadId } = useParams();
  const {
    id,
    title,
    description,
    tag,
    creationDate,
    studentThreadCreator,
    adminThreadCreator,
  } = thread;
  const [owner, setOwner] = useState(false);

  return (
    <div className="border m-4 p-4 bg-white rounded drop-shadow-md space-y-2">
      <div className="flex flex-row space-x-2 items-center text-sm">
        <div className="items-center"></div>
        <div className="flex flex-col">
          {studentThreadCreator != null && (
            <div> Created by @{studentThreadCreator.username}</div>
          )}
          {adminThreadCreator != null && (
            <div> Created by @{adminThreadCreator.username}</div>
          )}
          <span className="text-sm text-stone-500">{creationDate}</span>
        </div>
      </div>
      <div>
        <span className="inline-block bg-green-200 text-green-800 text-xs px-2 ml-2 rounded-full uppercase font-semibold tracking-wide">
          {title}
        </span>
        <span className="inline-block bg-green-200 text-green-800 text-xs px-2 ml-2 rounded-full uppercase font-semibold tracking-wide">
          {description}
        </span>

        <div className="font-light text-sm flex flex-row space-x-2 items-center text-stone-500">
          <Link
            to="/createthread"
            className="text-orange-600 hover:text-orange-800"
          >
            {" "}
            Add Post to Thread +{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Thread;
