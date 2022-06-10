import '../css/friends.css'
import { API } from "aws-amplify"
import { getUserOutgoing, getUserByUser } from '../graphql/custom'
import { getUser } from '../graphql/queries'
import { useEffect, useState } from 'react'

export function RequestList({user, outGoing, setOutGoing}) {

    useEffect(() => {
        getOutgoingRequests().then((data) => {
            setOutGoing(data);
        });
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

    // const getIncomingRequests = async () => {
    //     const incomingRequests = await API.graphql({ query: listOutgoingFriendRequests, authMode: 'AMAZON_COGNITO_USER_POOLS' });
    // }


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
        </div>
        </>
    )
}