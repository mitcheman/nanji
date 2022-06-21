import "../css/friends.css";
import { Friend } from "./friend-comp";
import { UserType } from '../types/UserType';
import { getFriends } from "../utils/friendRequests";
import { Dispatch, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";

// TODO: confirm type SetFriends

type Props = {
  user: UserType;
  friends: UserType[];
  setFriends: React.Dispatch<React.SetStateAction<UserType[]>>;
};

export const FriendsList = ({ user, friends, setFriends }: Props) => {
  const { id } = useParams<string>();


  useEffect(() => {
 
    const userId: string = id || user.username;
    console.log('userId at friendsList component:', userId);
    
    getFriends(userId).then((data) => {
      console.log(data, 'data coming from getFriends at Friendslist');
      setFriends(data);
    });
  }, []);

  return (
    <div id="friendlist">
      <h4>Friends and Family</h4>
      {friends && friends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </div>
  );
}