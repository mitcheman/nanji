import React from 'react';
import '../css/friends.css';
import { API } from 'aws-amplify';
import { Alert } from '@aws-amplify/ui-react';
import {
  getOutgoingRequests,
  getIncomingRequests,
  getFriends,
} from '../utils/friendRequests';
import { getUserOutgoing, getUserIncoming } from '../graphql/custom';
import {
  createFriend,
  deleteIncomingFriendRequest,
  deleteOutgoingFriendRequest,
} from '../graphql/mutations';
import { useEffect, useState } from 'react';
import { BiUserPlus, BiUserMinus } from 'react-icons/bi';
import { TiCancelOutline } from 'react-icons/ti';
import {
  GetUserIncomingAPIResponse,
  GetUserOutGoingAPIResponse,
  IncomingFriendRequestType,
  OutGoingFriendRequestType,
  RequestListProps,
} from '../Shared/Types';
import { GraphQLResult } from '@aws-amplify/api-graphql';

export const RequestList: React.FC<RequestListProps> = ({
  user,
  outGoingRequestsUsers,
  setOutGoingRequestsUsers,
  incomingRequestsUsers,
  setIncomingRequestsUsers,
  friends,
  setFriends,
}) => {
  const [acceptedStatus, setAcceptedStatus] = useState(false);
  const [deniedStatus, setDeniedStatus] = useState(false);
  const [cancelledStatus, setCancelledStatus] = useState(false);

  useEffect(() => {
    console.log(user.username);
    getOutgoingRequests(user.username)
      .then(data => {
        setOutGoingRequestsUsers(data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    console.log(user.username);
    getIncomingRequests(user.username)
      .then(data => {
        setIncomingRequestsUsers(data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    console.log(user.username);
    getFriends(user.username)
      .then(data => {
        setFriends(data);
      })
      .catch(err => console.error(err));
  }, []);

  function dismissAlerts() {
    setAcceptedStatus(false);
    setDeniedStatus(false);
    setCancelledStatus(false);
  }

  const handleIncomingRequest = async (
    currentUser: string,
    oppositeUser: string,
  ) => {
    //get incoming requests
    const incomingRequests = (await API.graphql({
      query: getUserIncoming,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: { id: currentUser },
    })) as GraphQLResult<GetUserIncomingAPIResponse>;

    const reqIncoming: IncomingFriendRequestType[] =
      (incomingRequests.data &&
        incomingRequests.data.getUser.incoming_friend_requests.items) ||
      [];

    const selectedIncoming = reqIncoming.filter(
      (el: IncomingFriendRequestType) => el.request_from === oppositeUser,
    );
    //delete incoming request that matches
    const deleteIncomingRequest = await API.graphql({
      query: deleteIncomingFriendRequest,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: { input: { id: selectedIncoming && selectedIncoming[0].id } },
    });
    //update incoming state
    getIncomingRequests(user.username)
      .then(data => {
        setIncomingRequestsUsers(data);
      })
      .catch(error => console.log(error));
  };

  const handleOutgoingRequest = async (
    currentUser: string,
    oppositeUser: string,
  ) => {
    //get outgoing request for other user
    const outgoingRequests = (await API.graphql({
      query: getUserOutgoing,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: { id: oppositeUser },
    })) as GraphQLResult<GetUserOutGoingAPIResponse>;

    const reqOutgoing: OutGoingFriendRequestType[] =
      (outgoingRequests.data &&
        outgoingRequests.data.getUser.outgoing_friend_requests.items) ||
      [];

    const selectedOutgoing = reqOutgoing.filter(
      (el: OutGoingFriendRequestType) => el.request_to === currentUser,
    );
    // //delete outgoing request that matches
    const deleteOutgoingRequest = await API.graphql({
      query: deleteOutgoingFriendRequest,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: { input: { id: selectedOutgoing[0].id } },
    });
  };

  const acceptRequestHandler = async (selectedID: string) => {
    //accept request
    const acceptedRequest = {
      userFriendsId: user.username,
      friend_with: selectedID,
      owner: user.username,
    };
    const createAcceptedRequest = await API.graphql({
      query: createFriend,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: { input: acceptedRequest },
    });
    const friendAcceptedRequest = {
      userFriendsId: selectedID,
      friend_with: user.username,
      owner: selectedID,
    };
    const createFriendAcceptedRequest = await API.graphql({
      query: createFriend,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: { input: friendAcceptedRequest },
    });
    //handle requests
    await handleIncomingRequest(user.username, selectedID);
    await handleOutgoingRequest(user.username, selectedID);
    //update friends list
    getFriends(user.username)
      .then(data => {
        setFriends(data);
      })
      .catch(err => console.error(err));
    setAcceptedStatus(true);
  };

  const denyRequestHandler = async (selectedID: string) => {
    console.log(selectedID);
    await handleIncomingRequest(user.username, selectedID);
    await handleOutgoingRequest(user.username, selectedID);
    getIncomingRequests(user.username)
      .then(data => {
        setIncomingRequestsUsers(data);
        setDeniedStatus(true);
      })
      .catch(err => console.error(err));
  };

  const cancelRequestHandler = async (selectedID: string) => {
    await handleIncomingRequest(selectedID, user.username);
    await handleOutgoingRequest(selectedID, user.username);
    getOutgoingRequests(user.username)
      .then(data => {
        setOutGoingRequestsUsers(data);
        setCancelledStatus(true);
      })
      .catch(err => console.error(err));
  };

  //requests should be their own component !fix
  return (
    <>
      <div
        id="requestlist"
        onClick={dismissAlerts}
        data-testid="friend-request">
        <h4>Friend Requests</h4>
        <div className="outgoing">
          <h5>Pending Sent Requests</h5>
          {outGoingRequestsUsers.map(req => (
            <div className="individualrequest" key={req.id} id={req.id}>
              <div className="textinfo">
                <p>Name: {req.given_name + ' ' + req.family_name}</p>
                <p>Username: {req.preferred_username}</p>
              </div>
              <div className="iconinfo">
                <TiCancelOutline
                  className="denyrequest"
                  onClick={() => cancelRequestHandler(req.id)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="incoming">
          <h5>Pending Received Requests</h5>
          {incomingRequestsUsers.map(req => (
            <div className="individualrequest" key={req.id} id={req.id}>
              <div className="textinfo">
                <p>Name: {req.given_name + ' ' + req.family_name}</p>
                <p>Username: {req.preferred_username}</p>
              </div>
              <div className="iconinfo">
                <BiUserPlus
                  className="acceptrequest"
                  onClick={() => acceptRequestHandler(req.id)}
                />
                <BiUserMinus
                  className="denyrequest"
                  onClick={() => denyRequestHandler(req.id)}
                />
              </div>
            </div>
          ))}
        </div>
        {acceptedStatus ? (
          <Alert variation="success" isDismissible={true}>
            Friend Request Accepted ʕ ꈍᴥꈍʔ
          </Alert>
        ) : (
          ''
        )}
        {deniedStatus ? (
          <Alert variation="success" isDismissible={true}>
            Friend Request Denied ʕ•`ᴥ´•ʔ
          </Alert>
        ) : (
          ''
        )}
        {cancelledStatus ? (
          <Alert variation="success" isDismissible={true}>
            Freind Request Cancelled ʕノ•ᴥ•ʔノ ︵ ┻━┻
          </Alert>
        ) : (
          ''
        )}
      </div>
    </>
  );
};
