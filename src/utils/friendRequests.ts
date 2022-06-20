import { API } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { UserType } from '../types/UserType'

import {
  getUserOutgoing,
  getUserIncoming,
  getUserFriends,
  getUserByUser,
} from '../graphql/custom';

type Props = {
  user: UserType;
}

//I could put the user info in the actual friend request but what if the user changes info? sure there is a better/faster way to handle this.
export const getOutgoingRequests = async ({user}: Props) => {
  //get outgoing friend requests for user
  const outGoingRequests: GraphQLResult<any> = await API.graphql({
    query: getUserOutgoing,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
    variables: { id: user },
  });
  const req = outGoingRequests.data.getUser.outgoing_friend_requests.items;
  //get user information on each user for a request - (outgoing requests only contain data on specific request - no user info besides ID)
  const results = [];
  for (let i = 0; i < req.length; i++) {
    const call: GraphQLResult<any> = await API.graphql({
      query: getUserByUser,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: { id: req[i].request_to },
    });
    results.push(call.data.getUser);
  }
  return results;
};

export const getIncomingRequests = async ({user}: Props) => {
  //get incoming friend requests for user
  const incomingRequests: GraphQLResult<any> = await API.graphql({
    query: getUserIncoming,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
    variables: { id: user },
  });
  const req = incomingRequests.data.getUser.incoming_friend_requests.items;
  //get user information for each request (incomingRequests only contains data on specific request - no user info besides ID)
  const results = [];
  for (let i = 0; i < req.length; i++) {
    const call: GraphQLResult<any> = await API.graphql({
      query: getUserByUser,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: { id: req[i].request_from },
    });
    results.push(call.data.getUser);
  }
  return results;
};

export const getFriends = async ( username : string) => {
  //get friends list for current user
  const listFriends: GraphQLResult<any> = await API.graphql({
    query: getUserFriends,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
    variables: { id: username },
  });
  const req = listFriends.data.getUser.friends.items;

  //get user information for each request (incomingRequests only contains data on specific request - no user info besides ID)
  const results = [];
  for (let i = 0, len = req.length; i < len; i++) {
    const call: GraphQLResult<any> = await API.graphql({
      query: getUserByUser,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: { id: req[i].friend_with },
    });
    results.push(call.data.getUser);
  }
  return results;
};
