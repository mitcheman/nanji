import React from "react";
import "../css/account.css";
import { CognitoUserType } from "../Shared/Types";

export const AccountInfo: React.FC<{ user: CognitoUserType }> = ({ user }) => {
	return (
		<div id="accountcontainer">
			<div id="accountdetails">
				<h3>Account Details</h3>
				<div className="accountline">
					<h3>First Name |</h3>
					<p>{user.attributes.given_name}</p>
				</div>
				<div className="accountline">
					<h3>Last Name |</h3>
					<p>{user.attributes.family_name}</p>
				</div>
				<div className="accountline">
					<h3>Username |</h3>
					<p>{user.attributes.preferred_username}</p>
				</div>
				<div className="accountline">
					<h3>Email |</h3>
					<p>{user.attributes.email}</p>
				</div>
			</div>
		</div>
	);
};
