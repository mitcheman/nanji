import React from 'react';
import '../css/header.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { MdOutlineAddPhotoAlternate, MdOutlineLogout } from 'react-icons/md';
import { BsPersonLinesFill, BsPersonFill } from 'react-icons/bs';
import { isMobile } from 'react-device-detect';
import { CognitoUserType, FriendType } from '../Shared/Types';

export const Header: React.FC<{
  user: CognitoUserType;
  currentFriend: FriendType;
  signOut: () => Promise<any>;
}> = ({ signOut, user, currentFriend }) => {
  const name = user.attributes.given_name + ' ' + user.attributes.family_name;

  if (!isMobile) {
    return (
      <div className="header">
        <a id="nanji" href="/">
          Nanji
        </a>
        <Router>
          <div id="userinfo">
            <a id="username" href="/">
              {name}
            </a>
            {currentFriend ? (
              <div id="friendname">
                <h5>Current Profile&ensp;|</h5>
                <p>
                  &ensp;
                  {currentFriend.given_name + ' ' + currentFriend.family_name}
                </p>
              </div>
            ) : (
              ''
            )}
          </div>
          <nav>
            <div id="nav-buttons">
              <a href="/Friends" data-testid="friends">
                <BsPersonLinesFill />
              </a>
              <a href="/newPost" data-testid="newPost">
                <MdOutlineAddPhotoAlternate />
              </a>
              <a href="/Account" data-testid="account">
                <BsPersonFill />
              </a>
              <button onClick={signOut} data-testid="signOut">
                <MdOutlineLogout />
              </button>
            </div>
          </nav>
        </Router>
      </div>
    );
  } else {
    return (
      <div className="header">
        <a id="nanji" href="/">
          Nanji
        </a>
        <Router>
          <div id="userinfo">
            {currentFriend ? (
              <div id="friendname">
                <h5>Current Profile&ensp;|</h5>
                <p>
                  &ensp;
                  {currentFriend.given_name + ' ' + currentFriend.family_name}
                </p>
              </div>
            ) : (
              <a id="username" href="/">
                {name}
              </a>
            )}
          </div>
        </Router>
      </div>
    );
  }
};
