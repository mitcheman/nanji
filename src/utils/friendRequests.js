import { API } from 'aws-amplify';
import {
  getUserOutgoing,
  getUserIncoming,
  getUserFriends,
  getUserByUser,
} from '../graphql/custom';

//I could put the user info in the actual friend request but what if the user changes info? sure there is a better/faster way to handle this.
export const getOutgoingRequests = async (user) => {
  //get outgoing friend requests for user
  const outGoingRequests = await API.graphql({
    query: getUserOutgoing,
    variables: { id: user },
  });
  const req = outGoingRequests.data.getUser.outgoing_friend_requests.items;
  //get user information on each user for a request - (outgoing requests only contain data on specific request - no user info besides ID)
  const results = [];
  for (let i = 0; i < req.length; i++) {
    const call = await API.graphql({
      query: getUserByUser,
      variables: { id: req[i].request_to },
    });
    results.push(call.data.getUser);
  }
  return results;
};

export const getIncomingRequests = async (user) => {
  //get incoming friend requests for user
  const incomingRequests = await API.graphql({
    query: getUserIncoming,
    variables: { id: user },
  });
  const req = incomingRequests.data.getUser.incoming_friend_requests.items;
  //get user information for each request (incomingRequests only contains data on specific request - no user info besides ID)
  const results = [];
  for (let i = 0; i < req.length; i++) {
    const call = await API.graphql({
      query: getUserByUser,
      variables: { id: req[i].request_from },
    });
    results.push(call.data.getUser);
  }
  return results;
};

export const getFriends = async (user) => {
  //get friends list for current user
  const listFriends = await API.graphql({
    query: getUserFriends,
    variables: { id: user },
  });
  const req = listFriends.data.getUser.friends.items;

  //get user information for each request (incomingRequests only contains data on specific request - no user info besides ID)
  const results = [];
  for (let i = 0; i < req.length; i++) {
    const call = await API.graphql({
      query: getUserByUser,
      variables: { id: req[i].friend_with },
    });
    results.push(call.data.getUser);
  }
  return results;
};
