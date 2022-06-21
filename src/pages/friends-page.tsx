import React from "react";
import { Search } from "../components/search-comp";
import { FriendsList } from "../components/friendsList-comp";
import { RequestList } from "../components/requestList-comp";
import { UserType } from '../types/UserType';
import "../css/friends.css";

// TODO: check setFriends


type Props = {
  user: UserType;
  friends: UserType[];
  setFriends: React.Dispatch<React.SetStateAction<UserType[]>>;
};

export function Friends({ user, friends, setFriends }: Props) {
  const [outGoing, setOutGoing] = React.useState<UserType[]>([]);
  const [incoming, setIncoming] = React.useState<UserType[]>([]);

  return (
    <>
      <div id="friends">
        <div id="addfriends">
          <Search user={user} setOutGoing={setOutGoing} />
          <RequestList
            user={user}
            outGoing={outGoing}
            setOutGoing={setOutGoing}
            incoming={incoming}
            setIncoming={setIncoming}
            friends={friends}
            setFriends={setFriends}
          />
        </div>
        <div id="friendspagelist">
          <FriendsList user={user} friends={friends} setFriends={setFriends} />
        </div>
      </div>
    </>
  );
}
