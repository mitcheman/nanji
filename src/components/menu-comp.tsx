import React from 'react';
import { FriendsList } from './friendsList-comp';
import { Timeline } from './timeline-comp';
import { GiBackwardTime } from 'react-icons/gi';
import { FaUserFriends } from 'react-icons/fa';
import { isMobile } from 'react-device-detect';
import { MdOutlineAddPhotoAlternate, MdOutlineLogout } from 'react-icons/md';
import { BsPersonLinesFill, BsPersonFill } from 'react-icons/bs';
import { useState } from 'react';
import '../css/menu.css';
import { MenuProps } from '../Shared/Types';

export const Menu: React.FC<MenuProps> = ({
  user,
  signOut,
  friends,
  setFriends,
  allPosts,
  posts,
  setPosts,
  token,
  setToken,
}) => {
  const [menu, setMenu] = useState(true);

  const [showTimeline, setShowTimeline] = useState(false);
  const [showFriends, setShowFriends] = useState(false);

  const toggleTimeline = () => {
    setShowTimeline(prev => !prev);
  };

  const toggleFriendList = () => {
    setShowFriends(prev => !prev);
  };

  if (!isMobile) {
    return (
      <div id="menu">
        <div id="menusvg">
          <GiBackwardTime
            onClick={() => setMenu(true)}
            data-testid="toggleMenuToTimeline"
          />
          <FaUserFriends
            id="menufriends"
            onClick={() => setMenu(false)}
            data-testid="toggleMenuToFriends"
          />
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
          />
        ) : (
          ''
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
          ''
        )}
      </>
    );
  }
};
