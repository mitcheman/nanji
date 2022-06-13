/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      date
      content
      image
      type
      userID
      createdAt
      updatedAt
      userPostsId
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        content
        image
        type
        userID
        createdAt
        updatedAt
        userPostsId
      }
      nextToken
    }
  }
`;
export const postByDate = /* GraphQL */ `
  query PostByDate(
    $type: String!
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postByDate(
      type: $type
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        date
        content
        image
        type
        userID
        createdAt
        updatedAt
        userPostsId
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      family_name
      given_name
      preferred_username
      profile_pic
      posts {
        nextToken
      }
      friends {
        nextToken
      }
      outgoing_friend_requests {
        nextToken
      }
      incoming_friend_requests {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        family_name
        given_name
        preferred_username
        profile_pic
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: [SearchableUserSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableUserAggregationInput]
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        family_name
        given_name
        preferred_username
        profile_pic
        createdAt
        updatedAt
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getFriend = /* GraphQL */ `
  query GetFriend($id: ID!) {
    getFriend(id: $id) {
      id
      friend_with
      owner
      createdAt
      updatedAt
      userFriendsId
    }
  }
`;
export const listFriends = /* GraphQL */ `
  query ListFriends(
    $filter: ModelFriendFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriends(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        friend_with
        owner
        createdAt
        updatedAt
        userFriendsId
      }
      nextToken
    }
  }
`;
export const getOutgoingFriendRequest = /* GraphQL */ `
  query GetOutgoingFriendRequest($id: ID!) {
    getOutgoingFriendRequest(id: $id) {
      id
      request_to
      createdAt
      updatedAt
      userOutgoing_friend_requestsId
    }
  }
`;
export const listOutgoingFriendRequests = /* GraphQL */ `
  query ListOutgoingFriendRequests(
    $filter: ModelOutgoingFriendRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOutgoingFriendRequests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        request_to
        createdAt
        updatedAt
        userOutgoing_friend_requestsId
      }
      nextToken
    }
  }
`;
export const getIncomingFriendRequest = /* GraphQL */ `
  query GetIncomingFriendRequest($id: ID!) {
    getIncomingFriendRequest(id: $id) {
      id
      request_from
      createdAt
      updatedAt
      userIncoming_friend_requestsId
    }
  }
`;
export const listIncomingFriendRequests = /* GraphQL */ `
  query ListIncomingFriendRequests(
    $filter: ModelIncomingFriendRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIncomingFriendRequests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        request_from
        createdAt
        updatedAt
        userIncoming_friend_requestsId
      }
      nextToken
    }
  }
`;
