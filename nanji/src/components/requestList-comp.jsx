import '../css/friends.css'
import { API } from "aws-amplify"
import { getUserOutgoing, getUserIncoming, getUserByUser } from '../graphql/custom'
import { getUser } from '../graphql/queries'
import { useEffect, useState } from 'react'
import { BiUserPlus, BiUserMinus } from 'react-icons/bi'

export function RequestList({user, outGoing, setOutGoing, incoming, setIncoming}) {

    useEffect(() => {
        getOutgoingRequests().then((data) => {
            setOutGoing(data);
        });
    }, [])

    useEffect(() => {
        getIncomingRequests().then((data) => {
            setIncoming(data)
        })
    }, [])

    //I could put the user info in the actual friend request but what if the user changes info? sure there is a better/faster way to handle this.
    const getOutgoingRequests = async() => {
        const outGoingRequests = await API.graphql({ query: getUserOutgoing, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {id: user.username} });
        const req = outGoingRequests.data.getUser.outgoing_friend_requests.items
        const results = [];
        for (let i = 0; i < req.length; i++) {
            const call = await API.graphql({query: getUserByUser, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {id: req[i].request_to } });
            results.push(call.data.getUser);
        };
        return results;
    }

    const getIncomingRequests = async () => {
        const incomingRequests = await API.graphql({ query: getUserIncoming, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {id: user.username} });
        const req = incomingRequests.data.getUser.incoming_friend_requests.items
        const results = [];
        for (let i = 0; i < req.length; i++) {
            const call = await API.graphql({query: getUserByUser, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {id: req[i].request_from } });
            results.push(call.data.getUser);
        };
        return results;
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
                            <BiUserPlus class="acceptrequest"/>
                            <BiUserMinus class="denyrequest"/>
                        </div>
                    </div>
                ))}
            </div>
            </div></>
    )
}