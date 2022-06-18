import { Search } from "../components/search-comp";
import { FriendsList } from "../components/friendsList-comp";
import { RequestList } from "../components/requestList-comp";
import "../css/friends.css";
import { useState } from "react";

export function Friends({ user, friends, setFriends }) {
	const [outGoingRequestsUsers, setOutGoingRequestsUsers] = useState([]);
	const [incomingRequestsUsers, setIncomingRequestsUsers] = useState([]);

	return (
		<>
			<div id="friends">
				<div id="addfriends">
					<Search
						user={user}
						outGoingRequestsUsers={outGoingRequestsUsers}
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
}
