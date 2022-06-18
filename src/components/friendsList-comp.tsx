import React from "react";
import "../css/friends.css";
import { Friend } from "./friend-comp";
import { getFriends } from "../utils/friendRequests";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CognitoUserType, FriendType } from "../Shared/Types";

export const FriendsList: React.FC<{
	user: CognitoUserType;
	friends: FriendType[];
	setFriends: React.Dispatch<React.SetStateAction<FriendType[]>>;
}> = ({ user, friends, setFriends }) => {
	const { id } = useParams();

	useEffect(() => {
		const userId = id || user.username;
		getFriends(userId).then((data) => {
			console.log(data);
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
