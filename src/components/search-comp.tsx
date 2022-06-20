import React from 'react';
import { SearchField } from '@aws-amplify/ui-react';
import { API } from 'aws-amplify';
import { searchUsers } from '../graphql/queries';
import { useState } from 'react';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import {
  createOutgoingFriendRequest,
  createIncomingFriendRequest,
} from '../graphql/mutations';
import { getUserOutgoing, getUserByUser } from '../graphql/custom';
import '../css/search.css';
import {
  CognitoUserType,
  DynamoUserType,
  GetUserAPIResponse,
  GetUserOutGoingAPIResponse,
  OutGoingFriendRequestType,
  SearchUsersAPIResponse,
} from '../Shared/Types';
import { GraphQLResult } from '@aws-amplify/api-graphql';

export type SearchProps = {
  user: CognitoUserType;
  setOutGoingRequestsUsers: React.Dispatch<
    React.SetStateAction<DynamoUserType[]>
  >;
};

export const Search: React.FC<SearchProps> = ({
  user,
  setOutGoingRequestsUsers,
}) => {
  const [userSearch, setUserSearch] = useState<DynamoUserType[]>([]);
  const [searchResult, setSearchResult] = useState(false);

  const searchHandler = async (event: string) => {
    const filterSearch = {
      filter: {
        or: [
          { preferred_username: { matchPhrasePrefix: event } },
          { given_name: { matchPhrasePrefix: event } },
          { family_name: { matchPhrasePrefix: event } },
        ],
      },
      limit: 20,
    };
    const result = (await API.graphql({
      query: searchUsers,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: filterSearch,
    })) as GraphQLResult<SearchUsersAPIResponse>;

    const results: DynamoUserType[] =
      (result.data && result.data.searchUsers.items) || [];

    if (results.length > 0) {
      setSearchResult(true);
      setUserSearch(results);
    }
    if (results.length <= 0) {
      setUserSearch([]);
      setSearchResult(false);
    }
  };

  const friendRequestHandler = async (selectedID: string) => {
    //confirm user is not the same user
    if (selectedID === user.username) {
      setSearchResult(false);
      return;
    }
    //check if friend request already exists
    const RequestExists = (await API.graphql({
      query: getUserOutgoing,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: { id: user.username },
    })) as GraphQLResult<GetUserOutGoingAPIResponse>;
    const requests: OutGoingFriendRequestType[] =
      (RequestExists.data &&
        RequestExists.data.getUser.outgoing_friend_requests.items) ||
      [];
    const filtered = requests.filter(
      (el: OutGoingFriendRequestType) => el.request_to === selectedID,
    );
    if (filtered.length > 0) {
      setSearchResult(false);
      return;
    }
    //create an outgoing friend request
    const friendRequest = {
      userOutgoing_friend_requestsId: user.username,
      request_to: selectedID,
    };
    const createOutGoing = await API.graphql({
      query: createOutgoingFriendRequest,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: { input: friendRequest },
    });
    const newOutGoing = (await API.graphql({
      query: getUserByUser,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: { id: selectedID },
    })) as GraphQLResult<GetUserAPIResponse>;
    //update ougoing state
    setOutGoingRequestsUsers(prev => {
      if (newOutGoing.data) {
        return [...prev, newOutGoing.data.getUser];
      } else {
        return [...prev];
      }
    });

    //update incoming requests for requested user
    const fromFriendRequest = {
      userIncoming_friend_requestsId: selectedID,
      request_from: user.username,
    };
    const createIncoming = await API.graphql({
      query: createIncomingFriendRequest,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: { input: fromFriendRequest },
    });
    setSearchResult(false);
  };

  return (
    <>
      <div className="search">
        <h4>Search for Friends and Family</h4>
        <SearchField
          label="Search for friends and family"
          placeholder="Search here..."
          onSubmit={searchHandler}
        />

        <div>
          {searchResult ? (
            <div>
              {userSearch.map(userResult => (
                <div
                  id={userResult.id}
                  key={userResult.id}
                  className="searchresults">
                  <ul>
                    <li>
                      Name |{' '}
                      {userResult.given_name + ' ' + userResult.family_name}
                    </li>
                    <li>Username | {userResult.preferred_username}</li>
                  </ul>
                  <BsFillPersonPlusFill
                    onClick={() => friendRequestHandler(userResult.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="searchresults">
              <h5>No results</h5>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
