import "../css/timeline.css";
import { listUserPostsTimeline } from "../utils/listdata";
import { useParams } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
const moment = require("moment");

type UserType = {
  username: string;
  id: string;
  family_name: string;
  given_name: string;
  preferred_username: string;
};

type PostType = {
  id: string;
  date: Date;
  s3Image: string;
  location: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

type Props = {
  user: UserType;
  setUserCred: (value: React.SetStateAction<string>) => void;
  allPosts: PostType[];
  posts: PostType[];
  setPosts: Dispatch<SetStateAction<PostType[]>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

export function Timeline({
  user,
  allPosts,
  setPosts,
  token,
  setToken,
  setUserCred,
}: Props) {
  const { id } = useParams<string>();

  if (!id) {
    setUserCred(user.username);
  } else {
    setUserCred(id);
  }

  // let tokenID;
  //passing this var in too many places !fix
  let limitNum = 5;

  const clickHandler = async (date) => {
    if (allPosts.length <= limitNum) return;
    listUserPostsTimeline(user, token, date).then((data) => {
      setPosts(data.data.postByUser.items);
      const tokenID = data.data.postByUser.nextToken;
      setToken(tokenID);
    });

    window.scrollTo(0, 0);
  };

  return (
    <div id="timeline">
      <ul>
        <h4>Timeline</h4>
        {allPosts.map((post) =>
          post.date === null ? (
            <></>
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
