import React from 'react';
import '../css/friends.css';
import { FriendType } from '../Shared/Types';

export const Friend: React.FC<{ friend: FriendType }> = ({ friend }) => {
  return (
    <a id="friendalink" href={'/user/' + friend.id} data-testid="friendalink">
      <div className="individualfriend" key={friend.id} id={friend.id}>
        <p>Name | {friend.given_name + ' ' + friend.family_name}</p>
        <p>Username | {friend.preferred_username}</p>
      </div>
    </a>
  );
};
