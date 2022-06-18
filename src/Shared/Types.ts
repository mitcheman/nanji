export type CognitoUserType = {
  username: string;
  attributes: {
    email: string;
    family_name: string;
    given_name: string;
    preferred_username: string;
  };
};

export type DynamoUserType = {
  id: string;
  family_name: string;
  given_name: string;
  preferred_username: string;
  profile_pic?: string;
  friends?: FriendType[];
  posts?: PostType[];
  outgoing_friend_requests?: OutGoingFriendRequestType[];
  incoming_friend_requests?: IncomingFriendRequestType[];
  updatedAt: string;
  createdAt: string;
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
  s3ImageUrl: string;
};

export type MenuProps = {
  user: CognitoUserType;
  signOut: () => Promise<any>;
  friends: FriendType[];
  setFriends: React.Dispatch<React.SetStateAction<FriendType[]>>;
  allPosts: PostType[];
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  token?: string;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export type OutGoingFriendRequestType = {
  id: string;
  request_to: string;
  createdAt: string;
  updatedAt: string;
  userOutgoing_friend_requestsId: string;
};

export type IncomingFriendRequestType = {
  id: string;
  request_from: string;
  createdAt: string;
  updatedAt: string;
  userIncoming_friend_requestsId: string;
};

export type PostProps = {
  currentFriend?: DynamoUserType;
  post: PostType;
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  setAllPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
};

export type RequestListProps = {
  user: CognitoUserType;
  outGoingRequestsUsers: DynamoUserType[];
  setOutGoingRequestsUsers: React.Dispatch<
    React.SetStateAction<DynamoUserType[]>
  >;
  incomingRequestsUsers: DynamoUserType[];
  setIncomingRequestsUsers: React.Dispatch<
    React.SetStateAction<DynamoUserType[]>
  >;
  friends: FriendType[];
  setFriends: React.Dispatch<React.SetStateAction<FriendType[]>>;
};

export type TimeLineProps = {
  user: CognitoUserType;
  allPosts: PostType[];
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  token?: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};
