import { SearchField } from '@aws-amplify/ui-react';
import { API } from "aws-amplify"
import { searchUsers } from "../graphql/custom"
import { useState } from 'react';
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { updateUser } from "../graphql/mutations"
import { getUserOutgoing, getUserByUser } from '../graphql/custom';
import '../css/search.css'

export function Search({user, outGoing, setOutGoing, incoming, setIncoming}) {

    const [userSearch, setUserSearch] = useState();
    const [searchResult, setSearchResult] = useState(false);

    const searchHandler = async(event) => {
        const filterSearch =
        { filter:
            { or: [
                {preferred_username: { matchPhrasePrefix: event }},
                {given_name: { matchPhrasePrefix: event}},
                {family_name: {matchPhrasePrefix: event}},
                ],
            },
            limit: 20,
        };
        const result = await API.graphql({query: searchUsers, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: filterSearch})
        const results = result.data.searchUsers.items
        if (results.length > 0) {
            setSearchResult(true);
            setUserSearch(results);
        }
        if (results.length <= 0) {
            setUserSearch([]);
            setSearchResult(false);
        }
    }

    const friendRequestHandler = async(selectedID) => {
        //confirm user is not the same user
        if (selectedID === user.username) {
            setSearchResult(false);
            return;
        }
        console.log(user.username)
        //check if friend request already exists
        const RequestExists = await API.graphql({query: getUserOutgoing, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {id: user.username} });
        console.log('request', RequestExists)
        const requests = RequestExists.data.getUser.outgoing_friend_requests;
        if (requests !== null) {
        const filtered = requests.filter(el => el.request_to === selectedID)
        if (filtered > 0) {
            setSearchResult(false);
            return;
        }
        }
         //create an outgoing friend request
        const friendRequest = { id: user.username, outgoing_friend_requests: selectedID };
        const createOutGoing = await API.graphql({query: updateUser, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {input: friendRequest } });
        const newOutGoing = await API.graphql({query: getUserByUser, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {id: selectedID } });
        //update ougoing state
        setOutGoing(prev => {
            return [...prev, newOutGoing.data.getUser]
        });

        //update incoming requests for requested user
        const fromFriendRequest = {id: selectedID, incoming_friend_requests: user.username};
        const createIncoming = await API.graphql({query: updateUser, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {input: fromFriendRequest } });
        setSearchResult(false);
    }

 return (

    <>
    <div class="search">
        <h4>Search for Friends and Family</h4>
        <SearchField label="Search for friends and family" placeholder="Search here..."
        onSubmit={searchHandler}
        />

    <div>
        {(searchResult) ?
        <div>
            {userSearch.map((userResult) => (
                <div id={userResult.id} key={userResult.id} class="searchresults">
                <ul>
                    <li>Name | {userResult.given_name + ' ' + userResult.family_name}</li>
                    <li>Username | {userResult.preferred_username}</li>
                </ul>
                <BsFillPersonPlusFill onClick={() => friendRequestHandler(userResult.id)}/>
                </div>
            ))}
        </div>
        : <div class="searchresults"><h5>No results</h5></div>}
    </div>
    </div>
    </>
    )
}