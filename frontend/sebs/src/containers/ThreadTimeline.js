import React, { useState } from "react";

import Thread from '../Thread/Thread';


function Timeline() {

  const [posts] = useState([
    //these are just sample posts to see how they would look
    {
      user: "username_",
      postImage:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      likes: 54,
      timestamp: "2d",
    },
    {
      user: "johndoe",
      postImage:
        "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
      likes: 432,
      timestamp: "2d",
    },
    {
      user: "mariussss",
      postImage:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
      likes: 140,
      timestamp: "2d",
    },
    {
      user: "kobee_18",
      postImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGCAaQ5u1TMTij5ELPWi5-VPtlSqELw-R6lj0EpYmNcGt56kOQaCokzS0IK81MOSphlkw&usqp=CAU",
      likes: 14,
      timestamp: "2d",
    },
  ]);

  return (
    <div >
        <div >
          <Thread
           user={"Dummy"}
           postImage={"https://i.ytimg.com/vi/kLApiN_QFTk/maxresdefault.jpg"}
           likes={11}
           timestamp={"1:00"}
          />
        </div>
    </div>
  );
}

export default Timeline;
