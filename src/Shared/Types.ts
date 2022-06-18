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

export type PostType = {
	content: string;
	createdAt: string;
	date: string;
	id: string;
	image: string;
	location: string;
	type: string;
	updatedAt: string;
	userID: string;
};

export type MenuProps = {
	user: CognitoUserType;
	signOut: () => Promise<any>;
	friends: FriendType[];
	setFriends: React.Dispatch<React.SetStateAction<FriendType[]>>;
	allPosts: PostType[];
	posts: PostType[];
	setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
	token: string;
	setToken: React.Dispatch<React.SetStateAction<string>>;
};
