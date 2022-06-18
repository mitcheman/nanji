import '../css/header.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MdOutlineAddPhotoAlternate, MdOutlineLogout } from 'react-icons/md';
import { BsPersonLinesFill, BsPersonFill } from 'react-icons/bs';
import { isMobile } from 'react-device-detect';

export function Header({ signOut, user, currentFriend }) {
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
}
