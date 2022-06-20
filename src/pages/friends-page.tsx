import React from "react";
import { Search } from "../components/search-comp";
import { FriendsList } from "../components/friendsList-comp";
import { RequestList } from "../components/requestList-comp";
import "../css/friends.css";

// TODO: check setFriends

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
  setFriends: any;
};

export function Friends({ user, friends, setFriends }: Props) {
  const [outGoing, setOutGoing] = React.useState<string[]>([]);
  const [incoming, setIncoming] = React.useState<string[]>([]);

  return (
    <>
      <div id="friends">
        <div id="addfriends">
          <Search user={user} outGoing={outGoing} setOutGoing={setOutGoing} />
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
