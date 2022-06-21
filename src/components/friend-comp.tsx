import React from "react";
import { UserType } from '../types/UserType'
import "../css/friends.css";

type Props = { friend: UserType };

export const Friend = ({ friend }: Props) => {
  return (
    <a id="friendalink" href={"/user/" + friend.id}>
      <div className="individualfriend" key={friend.id} id={friend.id}>
        <p>Name | {friend.given_name + " " + friend.family_name}</p>
        <p>Username | {friend.preferred_username}</p>
      </div>
    </a>
  );
}