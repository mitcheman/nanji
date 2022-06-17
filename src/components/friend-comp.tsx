import React from "react";
import "../css/friends.css";

export const Friend: React.FC = ({ friend }) => {
	return (
		<a id="friendalink" href={"/user/" + friend.id}>
			<div className="individualfriend" key={friend.id} id={friend.id}>
				<p>Name | {friend.given_name + " " + friend.family_name}</p>
				<p>Username | {friend.preferred_username}</p>
			</div>
		</a>
	);
};
