import { FriendsList } from "./friendsList-comp";
import { UserType } from '../types/UserType';
import { PostType } from '../types/PostType';
import { Timeline } from "./timeline-comp";
import { GiBackwardTime } from "react-icons/gi";
import { FaUserFriends } from "react-icons/fa";
import { isMobile } from "react-device-detect";
import { MdOutlineAddPhotoAlternate, MdOutlineLogout } from "react-icons/md";
import { BsPersonLinesFill, BsPersonFill } from "react-icons/bs";
import React, { useState, SetStateAction } from "react";
import "../css/menu.css";


type Props = {
  user: UserType;
  friends: UserType[];
  setFriends: React.Dispatch<React.SetStateAction<any[]>>;
  signOut: any;
  allPosts: PostType[];
  setPosts: React.Dispatch<SetStateAction<PostType[]>>;
  posts: PostType[];
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

export const Menu = ({
  user,
  signOut,
  friends,
  setFriends,
  allPosts,
  posts,
  setPosts,
  token,
  setToken,
}: Props) => {
  
  // HOOKS
  const [menu, setMenu] = useState<boolean>(true);
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
          />
        )}
      </div>
    );
  } else {
    return (
      <>
        <div id="menumobile">
          <GiBackwardTime onClick={toggleTimeline} />
          <FaUserFriends id="menufriends" onClick={toggleFriendList} />
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
