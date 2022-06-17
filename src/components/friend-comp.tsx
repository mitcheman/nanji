import React from "react";
import "../css/friends.css";

type Friend = {
	id: string;
	friend_with: string;
	owner: string;
	createdAt: string;
	updatedAt: string;
	userFriendsId: string;
};
export const Friend: React.FC<{ friend: Friend }> = ({ friend }) => {
	return (
		<a id="friendalink" href={"/user/" + friend.id}>
			<div className="individualfriend" key={friend.id} id={friend.id}>
				<p>Name | {friend.given_name + " " + friend.family_name}</p>
				<p>Username | {friend.preferred_username}</p>
			</div>
		</a>
	);
};
