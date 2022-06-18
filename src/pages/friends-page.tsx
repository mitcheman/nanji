import { Search } from '../components/search-comp';
import { FriendsList } from '../components/friendsList-comp';
import { RequestList } from '../components/requestList-comp';
import '../css/friends.css';
import React, { useState } from 'react';
import { CognitoUserType, DynamoUserType, FriendType } from '../Shared/Types';

export const Friends: React.FC<{
  user: CognitoUserType;
  friends: FriendType[];
  setFriends: React.Dispatch<React.SetStateAction<FriendType[]>>;
}> = ({ user, friends, setFriends }) => {
  const [outGoingRequestsUsers, setOutGoingRequestsUsers] = useState<
    DynamoUserType[]
  >([]);
  const [incomingRequestsUsers, setIncomingRequestsUsers] = useState<
    DynamoUserType[]
  >([]);

  return (
    <>
      <div id="friends">
        <div id="addfriends">
          <Search
            user={user}
            setOutGoingRequestsUsers={setOutGoingRequestsUsers}
          />
          <RequestList
            user={user}
            outGoingRequestsUsers={outGoingRequestsUsers}
            setOutGoingRequestsUsers={setOutGoingRequestsUsers}
            incomingRequestsUsers={incomingRequestsUsers}
            setIncomingRequestsUsers={setIncomingRequestsUsers}
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
};
