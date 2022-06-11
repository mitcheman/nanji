import '../css/friends.css'
import { API } from "aws-amplify"
import { getUserOutgoing, getUserIncoming, getUserFriends, getUserByUser } from '../graphql/custom'
import { createFriend, deleteIncomingFriendRequest, deleteOutgoingFriendRequest } from '../graphql/mutations'
import { useEffect, useState } from 'react'
import { BiUserPlus, BiUserMinus } from 'react-icons/bi'

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

    const acceptRequestHandler = async (event) => {
        const selectedID = ((event.target.parentNode.getAttribute('id') === null) ? event.target.parentNode.parentNode.getAttribute('id') : event.target.parentNode.getAttribute('id'));
        //accept request
        const accpetedRequest = {userFriendsId: user.username, friend_with: selectedID, owner: user.username};
        const createAcceptedRequest = await API.graphql({query: createFriend, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {input: accpetedRequest}});
        const friendAcceptedRequest = {userFriendsId: selectedID, friend_with: user.username, owner: selectedID};
        const createFriendAcceptedRequest = await API.graphql({query: createFriend, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {input: friendAcceptedRequest}});
        //get incoming requests
        const incomingRequests = await API.graphql({ query: getUserIncoming, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {id: user.username} });
        const reqIncoming = incomingRequests.data.getUser.incoming_friend_requests.items;
        const selectedIncoming = reqIncoming.filter(el => el.request_from === selectedID);
        //delete incoming request that matches
        const deleteIncomingRequest = await API.graphql({query: deleteIncomingFriendRequest, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {input: {id: selectedIncoming[0].id }}});
        //update incoming state
        getIncomingRequests().then((data) => {
            setIncoming(data)
        })

        //get outgoing request for other user
        const outgoingRequests = await API.graphql({ query: getUserOutgoing, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {id: selectedID} });
        const reqOutgoing = outgoingRequests.data.getUser.outgoing_friend_requests.items;
        const selectedOutgoing = reqOutgoing.filter(el => el.request_to === user.username);
        // //delete outgoing request that matches
        const deleteOutgoingRequest = await API.graphql({query: deleteOutgoingFriendRequest, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {input: {id: selectedOutgoing[0].id }}});

        //update friends list
        getFriends().then((data) => {
            setFriends(data);
        })
    }

    const denyRequestHandler = async () => {
        console.log('denied bitch')
    }


    return (
        <><div id="requestlist">
            <h4>Friend Requests</h4>
            <div class="outgoing">
                <h5>Pending Sent Requests</h5>
                {outGoing.map((req) => (
                    <div class="individualrequest" key={req.id} id={req.id}>
                        <p>{req.given_name + req.family_name}</p>
                        <p>{req.preferred_username}</p>
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
                            <BiUserPlus class="acceptrequest" onClick={acceptRequestHandler}/>
                            <BiUserMinus class="denyrequest" onClick={denyRequestHandler}/>
                        </div>
                    </div>
                ))}
            </div>
            </div></>
    )
}