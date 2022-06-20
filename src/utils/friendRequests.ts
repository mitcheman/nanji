import { API } from 'aws-amplify';
import {
  getUserOutgoing,
  getUserIncoming,
  getUserFriends,
  getUserByUser,
} from '../graphql/custom';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import {
  FriendType,
  GetUserAPIResponse,
  GetUserFriendsAPIResponse,
  GetUserIncomingAPIResponse,
  GetUserOutGoingAPIResponse,
  IncomingFriendRequestType,
  OutGoingFriendRequestType,
} from '../Shared/Types';

//I could put the user info in the actual friend request but what if the user changes info? sure there is a better/faster way to handle this.
export const getOutgoingRequests = async (user: string) => {
  //get outgoing friend requests for user
  const outGoingRequests = (await API.graphql({
    query: getUserOutgoing,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
    variables: { id: user },
  })) as GraphQLResult<GetUserOutGoingAPIResponse>;
  const req: OutGoingFriendRequestType[] =
    (outGoingRequests.data &&
      outGoingRequests.data.getUser.outgoing_friend_requests.items) ||
    [];
  //get user information on each user for a request - (outgoing requests only contain data on specific request - no user info besides ID)
  const results = [];
  for (let i = 0; i < req.length; i++) {
    const call = (await API.graphql({
      query: getUserByUser,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: { id: req[i].request_to },
    })) as GraphQLResult<GetUserAPIResponse>;
    call.data && results.push(call.data.getUser);
  }
  return results;
};

export const getIncomingRequests = async (user: string) => {
  //get incoming friend requests for user
  const incomingRequests = (await API.graphql({
    query: getUserIncoming,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
    variables: { id: user },
  })) as GraphQLResult<GetUserIncomingAPIResponse>;
  const req: IncomingFriendRequestType[] =
    (incomingRequests.data &&
      incomingRequests.data.getUser.incoming_friend_requests.items) ||
    [];
  //get user information for each request (incomingRequests only contains data on specific request - no user info besides ID)
  const results = [];
  for (let i = 0; i < req.length; i++) {
    const call = (await API.graphql({
      query: getUserByUser,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: { id: req[i].request_from },
    })) as GraphQLResult<GetUserAPIResponse>;
    call.data && results.push(call.data.getUser);
  }
  return results;
};

export const getFriends = async (user: string) => {
  //get friends list for current user
  const listFriends = (await API.graphql({
    query: getUserFriends,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
    variables: { id: user },
  })) as GraphQLResult<GetUserFriendsAPIResponse>;
  const req =
    (listFriends.data && listFriends.data.getUser.friends.items) || [];

  //get user information for each request (incomingRequests only contains data on specific request - no user info besides ID)
  const results = [];
  for (let i = 0; i < req.length; i++) {
    const call = (await API.graphql({
      query: getUserByUser,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: { id: req[i].friend_with },
    })) as GraphQLResult<GetUserAPIResponse>;
    call.data && results.push(call.data.getUser);
  }
  return results;
};
