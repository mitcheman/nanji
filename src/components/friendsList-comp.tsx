import "../css/friends.css";
import { Friend } from "./friend-comp";
import { getFriends } from "../utils/friendRequests";
import { Dispatch, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";

// TODO: confirm type SetFriends

type UserType = {
  username: string;
  id: string;
  family_name: string;
  given_name: string;
  preferred_username: string;
};

type Props = {
  user: UserType;
  friends: UserType[];
  setFriends: React.Dispatch<React.SetStateAction<any[]>>;
};

export function FriendsList({ user, friends, setFriends }: Props) {
  const { id } = useParams<string>();
  const [userCred, setUserCred] = useState<string | null>("");

  useEffect(() => {
    if (!id) {
      setUserCred(user.username);
    } else {
      setUserCred(id);
    }
    getFriends(userCred).then((data) => {
      setFriends(data);
    });
  }, []);

  return (
    <div id="friendlist">
      <h4>Friends and Family</h4>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </div>
  );
}
