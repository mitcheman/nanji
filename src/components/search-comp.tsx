import { SearchField } from "@aws-amplify/ui-react";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import { searchUsers } from "../graphql/queries";
import { useState } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
// import {
//   createOutgoingFriendRequest,
//   createIncomingFriendRequest,
// } from "../graphql/mutations";
import { getUserOutgoing, getUserByUser } from "../graphql/custom";
import "../css/search.css";
import React from "react";

type UserSearch = {
  id: string;
  username: string;
  family_name: string;
  given_name: string;
  preferred_username: string;
};

export function Search({ user, setOutGoing }) {
  const [userSearch, setUserSearch] = useState<UserSearch[]>();
  const [searchResult, setSearchResult] = useState<boolean>(false);

  const searchHandler = async (event) => {
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
    const result: GraphQLResult<any> = await API.graphql({
      query: searchUsers,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: filterSearch,
    });
    const results = result.data.searchUsers.items;
    if (results.length > 0) {
      setSearchResult(true);
      setUserSearch(results);
    }
    if (results.length <= 0) {
      setUserSearch([]);
      setSearchResult(false);
    }
  };

  const friendRequestHandler = async (selectedID) => {
    //confirm user is not the same user
    if (selectedID === user.username) {
      setSearchResult(false);
      return;
    }
    //check if friend request already exists
    const RequestExists: GraphQLResult<any> = await API.graphql({
      query: getUserOutgoing,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: { id: user.username },
    });
    const requests = RequestExists.data.getUser.outgoing_friend_requests.items;
    const filtered = requests.filter((el) => el.request_to === selectedID);
    if (filtered > 0) {
      setSearchResult(false);
      return;
    }
    //create an outgoing friend request
    // const friendRequest = {
    //   userOutgoing_friend_requestsId: user.username,
    //   request_to: selectedID,
    // };
    // const createOutGoing = await API.graphql({
    //   query: createOutgoingFriendRequest,
    //   authMode: "AMAZON_COGNITO_USER_POOLS",
    //   variables: { input: friendRequest },
    // });
    const newOutGoing: GraphQLResult<any> = await API.graphql({
      query: getUserByUser,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: { id: selectedID },
    });
    //update ougoing state
    setOutGoing((prev) => {
      return [...prev, newOutGoing.data.getUser];
    });

    //update incoming requests for requested user
    // const fromFriendRequest = {
    //   userIncoming_friend_requestsId: selectedID,
    //   request_from: user.username,
    // };
    // const createIncoming = await API.graphql({
    //   query: createIncomingFriendRequest,
    //   authMode: "AMAZON_COGNITO_USER_POOLS",
    //   variables: { input: fromFriendRequest },
    // });
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
              {userSearch.map((userResult) => (
                <div
                  id={userResult.id}
                  key={userResult.id}
                  className="searchresults"
                >
                  <ul>
                    <li>
                      Name |{" "}
                      {userResult.given_name + " " + userResult.family_name}
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
}
