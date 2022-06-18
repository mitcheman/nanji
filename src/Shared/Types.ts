export type CognitoUserType = {
	username: string;
	attributes: {
		email: string;
		family_name: string;
		given_name: string;
		preferred_username: string;
	};
};

export type FriendType = {
	id: string;
	createdAt: string;
	updatedAt: string;
	given_name: string;
	family_name: string;
	preferred_username: string;
};

// export DynamoUserType = {

// }
