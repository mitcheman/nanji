import { FriendsList } from "./friendsList-comp";
import { Timeline } from "./timeline-comp";
import { GiBackwardTime } from "react-icons/gi";
import { FaUserFriends } from "react-icons/fa";
import { isMobile } from "react-device-detect";
import { MdOutlineAddPhotoAlternate, MdOutlineLogout } from "react-icons/md";
import { BsPersonLinesFill, BsPersonFill } from "react-icons/bs";
import { useState, Dispatch, SetStateAction } from "react";
import "../css/menu.css";

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
  friends: UserType[];
  setFriends: React.Dispatch<React.SetStateAction<any[]>>;
  signOut: any;
  allPosts: PostType[];
  setPosts: Dispatch<SetStateAction<PostType[]>>;
  posts: PostType[];
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setUserCred: (value: React.SetStateAction<string>) => void;
};

export function Menu({
  user,
  signOut,
  friends,
  setFriends,
  allPosts,
  posts,
  setPosts,
  token,
  setToken,
  setUserCred,
}: Props) {
  const [menu, setMenu] = useState(true);

  const [showTimeline, setShowTimeline] = useState<boolean>(false);
  const [showFriends, setShowFriends] = useState<boolean>(false);

  const toggleTimeline = () => {
    setShowTimeline((prev) => !prev);
  };

  const toggleFriendList = () => {
    setShowFriends((prev) => !prev);
  };

  if (!isMobile) {
    return (
      <div id="menu">
        <div id="menusvg">
          <GiBackwardTime onClick={() => setMenu(true)} />
          <FaUserFriends id="menufriends" onClick={() => setMenu(false)} />
        </div>
        {!menu ? (
          <FriendsList user={user} friends={friends} setFriends={setFriends} />
        ) : (
          <Timeline
            user={user}
            allPosts={allPosts}
            posts={posts}
            setPosts={setPosts}
            token={token}
            setToken={setToken}
            setUserCred={setUserCred}
          />
        )}
      </div>
    );
  } else {
    return (
      <>
        <div id="menumobile">
          <GiBackwardTime onClick={toggleTimeline} />
          <FaUserFriends onClick={toggleFriendList} />
          <a href="/Friends">
            <BsPersonLinesFill />
          </a>
          <a href="/newPost">
            <MdOutlineAddPhotoAlternate />
          </a>
          <a href="/Account">
            <BsPersonFill />
          </a>
          <button onClick={signOut}>
            <MdOutlineLogout />
          </button>
        </div>
        {showTimeline ? (
          <Timeline
            user={user}
            allPosts={allPosts}
            posts={posts}
            setPosts={setPosts}
            token={token}
            setToken={setToken}
            setUserCred={setUserCred}
          />
        ) : (
          ""
        )}
        {showFriends ? (
          <div id="friendslistmobile">
            <FriendsList
              user={user}
              friends={friends}
              setFriends={setFriends}
            />
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}
