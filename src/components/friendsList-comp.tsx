import React from "react";
import "../css/friends.css";
import { Friend } from "./friend-comp";
import { getFriends } from "../utils/friendRequests";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const FriendsList: React.FC = ({ user, friends, setFriends }) => {
	const { id } = useParams();

	useEffect(() => {
		if (!id) {
			user = user.username;
		} else {
			user = id;
		}
		getFriends(user).then((data) => {
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
};
