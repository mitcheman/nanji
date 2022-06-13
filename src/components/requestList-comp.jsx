import '../css/friends.css'
import { API } from "aws-amplify"
import { Alert } from '@aws-amplify/ui-react';
import { getOutgoingRequests, getIncomingRequests, getFriends } from '../utils/friendRequests';
import { getUserOutgoing, getUserIncoming } from '../graphql/custom'
import { createFriend, deleteIncomingFriendRequest, deleteOutgoingFriendRequest } from '../graphql/mutations'
import { useEffect, useState } from 'react'
import { BiUserPlus, BiUserMinus } from 'react-icons/bi'
import { TiCancelOutline } from 'react-icons/ti'

export function RequestList({user, outGoing, setOutGoing, incoming, setIncoming, friends, setFriends}) {

    const [acceptedStatus, setAcceptedStatus] = useState(false);
    const [deniedStatus, setDeniedStatus] = useState(false);
    const [cancelledStatus, setCancelledStatus] = useState(false);

    useEffect(() => {
        getOutgoingRequests(user.username).then((data) => {
            setOutGoing(data);
        });
    }, [])

    useEffect(() => {
        getIncomingRequests(user.username).then((data) => {
            setIncoming(data);
        })
    }, [])

    useEffect(() => {
        getFriends(user.username).then((data) => {
            setFriends(data);
        })
    }, [])

    function dismissAlerts() {
        setAcceptedStatus(false);
        setDeniedStatus(false);
        setCancelledStatus(false);
    }

    const handleIncomingRequest = async (currentUser, oppositeUser) => {
                //get incoming requests
                const incomingRequests = await API.graphql({ query: getUserIncoming, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {id: currentUser} });
                const reqIncoming = incomingRequests.data.getUser.incoming_friend_requests.items;
                const selectedIncoming = reqIncoming.filter(el => el.request_from === oppositeUser);
                //delete incoming request that matches
                const deleteIncomingRequest = await API.graphql({query: deleteIncomingFriendRequest, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {input: {id: selectedIncoming[0].id }}});
                //update incoming state
                getIncomingRequests(user.username).then((data) => {
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
        getFriends(user.username).then((data) => {
            setFriends(data);
        })
        setAcceptedStatus(true)
    }

    const denyRequestHandler = async (selectedID) => {
        await handleIncomingRequest(user.username, selectedID);
        await handleOutgoingRequest(user.username, selectedID);
        getIncomingRequests(user.username).then((data) => {
            setIncoming(data);
            setDeniedStatus(true)
        })
    }

    const cancelRequestHandler = async (selectedID) => {
        await handleIncomingRequest(selectedID, user.username);
        await handleOutgoingRequest(selectedID, user.username);
        getOutgoingRequests(user.username).then((data) => {
            setOutGoing(data);
            setCancelledStatus(true)
        });
    }

    //requests should be their own componenet probably
    return (
        <><div id="requestlist" onClick={dismissAlerts}>
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
            {acceptedStatus ? <Alert variation="success" isDismissible={true}>Friend Request Accepted ʕ ꈍᴥꈍʔ</Alert>: ''}
            {deniedStatus ? <Alert variation="success" isDismissible={true}>Friend Request Denied ʕ•`ᴥ´•ʔ</Alert>: ''}
            {cancelledStatus ? <Alert variation="success" isDismissible={true}>Freind Request Cancelled  ʕノ•ᴥ•ʔノ ︵ ┻━┻</Alert>: ''}
            </div></>
    )
}