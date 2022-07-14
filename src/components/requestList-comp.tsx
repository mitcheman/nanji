import '../css/friends.css'
import { API } from "aws-amplify"
import { Alert } from '@aws-amplify/ui-react';
import { UserType } from '../types/UserType';
import { getOutgoingRequests, getIncomingRequests, getFriends } from '../utils/friendRequests';
import { getUserOutgoing, getUserIncoming } from '../graphql/custom'
import { createFriend, deleteIncomingFriendRequest, deleteOutgoingFriendRequest } from '../graphql/mutations'
import React, { useEffect, useState } from 'react'
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { BiUserPlus, BiUserMinus } from 'react-icons/bi'
import { TiCancelOutline } from 'react-icons/ti'

type Props = {
    user: UserType;
    outGoing: UserType[];
    setOutGoing: React.Dispatch<React.SetStateAction<UserType[]>>;
    incoming: UserType[];
    setIncoming: React.Dispatch<React.SetStateAction<UserType[]>>;
    setFriends: React.Dispatch<React.SetStateAction<UserType[]>>;
    friends: UserType[];
};

export function RequestList({user, outGoing, setOutGoing, incoming, setIncoming, friends, setFriends}: Props) {

    const [acceptedStatus, setAcceptedStatus] = useState<boolean>(false);
    const [deniedStatus, setDeniedStatus] = useState<boolean>(false);
    const [cancelledStatus, setCancelledStatus] = useState<boolean>(false);

    useEffect(() => {
        getOutgoingRequests(user.username).then((data) => {
            setOutGoing(data);
        }).catch((err)=> {console.log(err);});
    }, []) //eslint-disable-line

    useEffect(() => {
        getIncomingRequests(user.username).then((data) => {
            setIncoming(data);
        }).catch((err)=> {console.log(err);});
    }, []) //eslint-disable-line

    useEffect(() => {
        getFriends(user.username).then((data) => {
            setFriends(data);
        }).catch((err)=> {console.log(err);});
    }, []) //eslint-disable-line

    function dismissAlerts() {
        setAcceptedStatus(false);
        setDeniedStatus(false);
        setCancelledStatus(false);
    }

    const handleIncomingRequest = async (currentUser, oppositeUser) => {
                //get incoming requests
                const incomingRequests: GraphQLResult<any> = await API.graphql({ query: getUserIncoming, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {id: currentUser} });
                const reqIncoming = incomingRequests.data.getUser.incoming_friend_requests.items;
                const selectedIncoming = reqIncoming.filter(el => el.request_from === oppositeUser);
                //delete incoming request that matches
                const deleteIncomingRequest: GraphQLResult<any> = await API.graphql({query: deleteIncomingFriendRequest, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {input: {id: selectedIncoming[0].id }}});
                //update incoming state
                getIncomingRequests(user.username).then((data) => {
                    setIncoming(data);
                })                
    }

    const handleOutgoingRequest = async (currentUser, oppositeUser) => {
                //get outgoing request for other user
                const outgoingRequests: GraphQLResult<any> = await API.graphql({ query: getUserOutgoing, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {id: oppositeUser} });
                const reqOutgoing = outgoingRequests.data.getUser.outgoing_friend_requests.items;
                const selectedOutgoing = reqOutgoing.filter(el => el.request_to === currentUser);
                //delete outgoing request that matches
                const deleteOutgoingRequest: GraphQLResult<any> = await API.graphql({query: deleteOutgoingFriendRequest, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {input: {id: selectedOutgoing[0].id }}}); //eslint-disable-line
            }

    const acceptRequestHandler = async (selectedID) => {
        //accept request
        const acceptedRequest = {userFriendsId: user.username, friend_with: selectedID, owner: user.username};
        const createAcceptedRequest: GraphQLResult<any> = await API.graphql({query: createFriend, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {input: acceptedRequest}}); //eslint-disable-line
        const friendAcceptedRequest = {userFriendsId: selectedID, friend_with: user.username, owner: selectedID};
        const createFriendAcceptedRequest: GraphQLResult<any> = await API.graphql({query: createFriend, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {input: friendAcceptedRequest}}); //eslint-disable-line
        
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
        try {
            await handleIncomingRequest(user.username, selectedID);
            await handleOutgoingRequest(user.username, selectedID);
            getIncomingRequests(user.username).then((data) => {
                setIncoming(data);
                setDeniedStatus(true);
            })
        } catch(err) {
            console.log('Err at denyRequestHandler:', err);
        }
    }
    //TODO: Debug issue here 
    const cancelRequestHandler = async (selectedID) => {
        try {
        await handleIncomingRequest(selectedID, user.username);
        await handleOutgoingRequest(selectedID, user.username);
        getOutgoingRequests(user.username).then((data) => {
            setOutGoing(data);
            setCancelledStatus(true)
        });
        } catch (err) {
            console.log('Error at cancelRequestHandler', err);
        }
    }

    //requests should be their own component !fix
    return (
        <><div id="requestlist" onClick={dismissAlerts}>
            <h4>Friend Requests</h4>
            <div className="outgoing">
                <h5>Pending Sent Requests</h5>
                {outGoing.map((req) => (
                    <div className="individualrequest" key={req.id} id={req.id}>
                        <div className="textinfo">
                            <p>Name: {req.given_name + ' ' + req.family_name}</p>
                            <p>Username: {req.preferred_username}</p>
                        </div>
                        <div className="iconinfo">
                            <TiCancelOutline className="denyrequest" onClick={() => cancelRequestHandler(req.id)}/>
                        </div>
                    </div>
                ))}
            </div>
            <div className="incoming">
                <h5>Pending Received Requests</h5>
                {incoming.map((req) => (
                    <div className="individualrequest" key={req.id} id={req.id}>
                        <div className="textinfo">
                            <p>Name: {req.given_name + ' ' + req.family_name}</p>
                            <p>Username: {req.preferred_username}</p>
                        </div>
                        <div className="iconinfo">
                            <BiUserPlus className="acceptrequest" onClick={() => acceptRequestHandler(req.id)}/>
                            <BiUserMinus className="denyrequest" onClick={() => denyRequestHandler(req.id)}/>
                        </div>
                    </div>
                ))}
            </div>
            {acceptedStatus ? <Alert variation="success" isDismissible={true}>Friend Request Accepted ʕ ꈍᴥꈍʔ</Alert>: ''}
            {deniedStatus ? <Alert variation="success" isDismissible={true}>Friend Request Denied ʕ•`ᴥ´•ʔ</Alert>: ''}
            {cancelledStatus ? <Alert variation="success" isDismissible={true}>Friend Request Cancelled  ʕノ•ᴥ•ʔノ ︵ ┻━┻</Alert>: ''}
            </div></>
    )
}