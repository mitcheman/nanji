import React from "react";
import "../css/friends.css";

type UserType = {
  id: string;
  family_name: string;
  given_name: string;
  preferred_username: string;
};

type Props = { friend: UserType };

export function Friend({ friend }: Props) {
  return (
    <a id="friendalink" href={"/user/" + friend.id}>
      <div className="individualfriend" key={friend.id} id={friend.id}>
        <p>Name | {friend.given_name + " " + friend.family_name}</p>
        <p>Username | {friend.preferred_username}</p>
      </div>
    </a>
  );
}
