import '../css/friends.css'
import { API } from "aws-amplify"
import { getUserOutgoing, getUserIncoming, getUserFriends, getUserByUser } from '../graphql/custom'
import { createFriend, deleteIncomingFriendRequest, deleteOutgoingFriendRequest } from '../graphql/mutations'
import { useEffect, useState } from 'react'
import { BiUserPlus, BiUserMinus } from 'react-icons/bi'
import { TiCancelOutline } from 'react-icons/ti'

export function RequestList({user, outGoing, setOutGoing, incoming, setIncoming, friends, setFriends}) {

    useEffect(() => {
        getOutgoingRequests().then((data) => {
            setOutGoing(data);
        });
    }, [])

    useEffect(() => {
        getIncomingRequests().then((data) => {
            setIncoming(data);
        })
    }, [])

    useEffect(() => {
        getFriends().then((data) => {
            setFriends(data);
        })
    }, [])

    //I could put the user info in the actual friend request but what if the user changes info? sure there is a better/faster way to handle this.
    const getOutgoingRequests = async() => {
        //get outgoing friend requests for user
        const outGoingRequests = await API.graphql({ query: getUserOutgoing, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {id: user.username} });
        const req = outGoingRequests.data.getUser.outgoing_friend_requests.items
        //get user information on each user for a request - (outgoing requests only contain data on specific request - no user info besides ID)
        const results = [];
        for (let i = 0; i < req.length; i++) {
            const call = await API.graphql({query: getUserByUser, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {id: req[i].request_to } });
            results.push(call.data.getUser);
        };
        return results;
    }

    const getIncomingRequests = async () => {
        //get incoming friend requests for user
        const incomingRequests = await API.graphql({ query: getUserIncoming, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {id: user.username} });
        const req = incomingRequests.data.getUser.incoming_friend_requests.items
        //get user information for each request (incomingRequests only contains data on specific request - no user info besides ID)
        const results = [];
        for (let i = 0; i < req.length; i++) {
            const call = await API.graphql({query: getUserByUser, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {id: req[i].request_from } });
            results.push(call.data.getUser);
        };
        return results;
    }

    const getFriends = async () => {
        //get friends list for current user
        const listFriends = await API.graphql({query: getUserFriends, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {id: user.username}});
        const req = listFriends.data.getUser.friends.items

        //get user information for each request (incomingRequests only contains data on specific request - no user info besides ID)
        const results = [];
        for (let i = 0; i < req.length; i++) {
            const call = await API.graphql({query: getUserByUser, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {id: req[i].friend_with } });
            results.push(call.data.getUser);
        };
        return results
    }

    const handleIncomingRequest = async (currentUser, oppositeUser) => {
                //get incoming requests
                const incomingRequests = await API.graphql({ query: getUserIncoming, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {id: currentUser} });
                const reqIncoming = incomingRequests.data.getUser.incoming_friend_requests.items;
                const selectedIncoming = reqIncoming.filter(el => el.request_from === oppositeUser);
                //delete incoming request that matches
                const deleteIncomingRequest = await API.graphql({query: deleteIncomingFriendRequest, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {input: {id: selectedIncoming[0].id }}});
                //update incoming state
                getIncomingRequests().then((data) => {
                    setIncoming(data);
                })
    }

    const handleOutgoingRequest = async (currentUser, oppositeUser) => {
                //get outgoing request for other user
                const outgoingRequests = await API.graphql({ query: getUserOutgoing, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {id: oppositeUser} });
                const reqOutgoing = outgoingRequests.data.getUser.outgoing_friend_requests.items;
                const selectedOutgoing = reqOutgoing.filter(el => el.request_to === currentUser);
                // //delete outgoing request that matches
                const deleteOutgoingRequest = await API.graphql({query: deleteOutgoingFriendRequest, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {input: {id: selectedOutgoing[0].id }}});
    }

    const acceptRequestHandler = async (selectedID) => {
        //accept request
        const acceptedRequest = {userFriendsId: user.username, friend_with: selectedID, owner: user.username};
        const createAcceptedRequest = await API.graphql({query: createFriend, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {input: acceptedRequest}});
        const friendAcceptedRequest = {userFriendsId: selectedID, friend_with: user.username, owner: selectedID};
        const createFriendAcceptedRequest = await API.graphql({query: createFriend, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {input: friendAcceptedRequest}});
        //handle requests
        handleIncomingRequest(user.username, selectedID);
        handleOutgoingRequest(user.username, selectedID);
        //update friends list
        getFriends().then((data) => {
            setFriends(data);
        })
    }

    const denyRequestHandler = async (selectedID) => {
        console.log(selectedID)
        await handleIncomingRequest(user.username, selectedID);
        await handleOutgoingRequest(user.username, selectedID);
        getIncomingRequests().then((data) => {
            setIncoming(data);
        })
    }

    const cancelRequestHandler = async (selectedID) => {
        await handleIncomingRequest(selectedID, user.username);
        await handleOutgoingRequest(selectedID, user.username);
        getOutgoingRequests().then((data) => {
            console.log(data)
            setOutGoing(data);
        });
    }

    //requests should be their own componenet probably
    return (
        <><div id="requestlist">
            <h4>Friend Requests</h4>
            <div class="outgoing">
                <h5>Pending Sent Requests</h5>
                {outGoing.map((req) => (
                    <div class="individualrequest" key={req.id} id={req.id}>
                        <div class="textinfo">
                            <p>Name: {req.given_name + ' ' + req.family_name}</p>
                            <p>Username: {req.preferred_username}</p>
                        </div>
                        <div class="iconinfo">
                            <TiCancelOutline class="denyrequest" onClick={() => cancelRequestHandler(req.id)}/>
                        </div>
                    </div>
                ))}
            </div>
            <div class="incoming">
                <h5>Pending Received Requests</h5>
                {incoming.map((req) => (
                    <div class="individualrequest" key={req.id} id={req.id}>
                        <div class="textinfo">
                            <p>Name: {req.given_name + ' ' + req.family_name}</p>
                            <p>Username: {req.preferred_username}</p>
                        </div>
                        <div class="iconinfo">
                            <BiUserPlus class="acceptrequest" onClick={() => acceptRequestHandler(req.id)}/>
                            <BiUserMinus class="denyrequest" onClick={() => denyRequestHandler(req.id)}/>
                        </div>
                    </div>
                ))}
            </div>
            </div></>
    )
}