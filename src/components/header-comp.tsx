import "../css/header.css";
import { BrowserRouter as Router } from "react-router-dom";
import { MdOutlineAddPhotoAlternate, MdOutlineLogout } from "react-icons/md";
import { BsPersonLinesFill, BsPersonFill } from "react-icons/bs";
import { isMobile } from "react-device-detect";
import { UserType } from '../types/UserType';
import React from "react";

type Props = {
  user: UserType;
  signOut: any;
  currentFriend?: {
    username: string;
    id: string;
    family_name: string;
    given_name: string;
    preferred_username: string;
  };
};

export const Header = ({ signOut, user, currentFriend }: Props) => {
  const name = user.attributes.given_name + " " + user.attributes.family_name;

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
                  {currentFriend.given_name + " " + currentFriend.family_name}
                </p>
              </div>
            ) : (
              ""
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
                  {currentFriend.given_name + " " + currentFriend.family_name}
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
