import "../css/friends.css";
import { Friend } from "./friend-comp";
import { UserType } from '../types/UserType';
import { getFriends } from "../utils/friendRequests";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";


type Props = {
  user: UserType;
  friends: UserType[];
  setFriends: React.Dispatch<React.SetStateAction<UserType[]>>;
};

export const FriendsList = ({ user, friends, setFriends }: Props) => {
  const { id } = useParams<string>();


  useEffect(() => {
 
    const userId: string = id || user.username;
    
    getFriends(userId).then((data) => {
      setFriends(data);
    });
  }, []); //eslint-disable-line

  return (
    <div id="friendlist">
      <h4>Friends and Family</h4>
      {friends && friends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </div>
  );
}