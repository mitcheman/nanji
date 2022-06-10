import { SearchField } from '@aws-amplify/ui-react';
import { API } from "aws-amplify"
import { searchUsers } from "../graphql/queries"
import { useState } from 'react';
import { BsFillPersonPlusFill } from 'react-icons/bs'
import '../css/search.css'

export function Search({user}) {

    const [userSearch, setUserSearch] = useState();
    const [searchResult, setSearchResult] = useState(false);

    const searchHandler = async(event) => {
        const result = await API.graphql({query: searchUsers, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {filter: {preferred_username: { match: event }}} })
        console.log(result.data.searchUsers.items);
        const results = result.data.searchUsers.items
        if (results.length > 0) {
            setSearchResult(true);
            setUserSearch(results);
        }
        if (results.length <= 0) {
            setUserSearch([])
            setSearchResult(false)
        }
    }

    const friendRequestHandler = async(event) => {
        alert('friend request sent')
    }

 return (

    <>
    <div class="search">
        <h4>Search for friends and family</h4>
        <SearchField label="Search for friends and family" placeholder="Search here..."
        onSubmit={searchHandler}
        />

    <div>
        {(searchResult) ?
        <div>
            {userSearch.map((userResult) => (
                <div key={userResult.preferred_username} class="searchresults">
                <ul>
                    <li>Name: {userResult.given_name + ' ' + userResult.family_name}</li>
                    <li>Username: {userResult.preferred_username}</li>
                </ul>
                <BsFillPersonPlusFill onClick={friendRequestHandler}/>
                </div>
            ))}
        </div>
        : <div class="searchresults"><h4>No results</h4></div>}
    </div>
    </div>
    </>
    )
}