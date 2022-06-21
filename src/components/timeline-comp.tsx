import "../css/timeline.css";
import { listUserPostsTimeline } from "../utils/listdata";
import { useParams } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { UserType } from "../types/UserType"
import { PostType } from "../types/PostType"
import React from "react";
const moment = require("moment");



type Props = {
  user: UserType;
  userCred: string;
  allPosts: PostType[];
  posts: PostType[];
  setPosts: React.Dispatch<SetStateAction<PostType[]>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

export function Timeline({ user, allPosts, setPosts, token, setToken, userCred}: Props) {
  const { id } = useParams<string>();

  if (!id) {
    userCred = user.username;
  } else {
    userCred = id;
  }

  // let tokenID;
  //passing this var in too many places !fix
  let limitNum = 5;

  const clickHandler = async (date) => {
    if (allPosts.length <= limitNum) return;
    console.log(date, ' date at clickHandler');

      const data = await listUserPostsTimeline(user.username, token, date);
        console.log(data, 'data at clickHandler')
        setPosts(data.data.postByUser.items);
        const tokenID = data.data.postByUser.nextToken;
        setToken(tokenID);
  
    
    
    // listUserPostsTimeline(user, token, date).then((data) => {
    //   console.log(data, 'data at clickHandler')
    //   setPosts(data.data.postByUser.items);
    //   const tokenID = data.data.postByUser.nextToken;
    //   setToken(tokenID);
    // }).catch((err) => { console.log('Error at clickHandler()', err); });

    window.scrollTo(0, 0);
  };

  return (
    <div id="timeline">
      <ul>
        <h4>Timeline</h4>
        {allPosts.map((post) =>
          post.date === null ? (
            null
          ) : (
            <div key={JSON.stringify(post.date)}>
              <li
                onClick={() => clickHandler(post.date)}
                id={JSON.stringify(post.date)}
              >
                {moment(post.date).format("MMMM YYYY")}
              </li>
            </div>
          )
        )}
      </ul>
    </div>
  );
}
