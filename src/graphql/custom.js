export const getUserByUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      family_name
      given_name
      preferred_username
      createdAt
      updatedAt
    }
  }
`;

export const getUserPosts = /* GraphQL */ `
  query getUser($id: ID!) {
    getUser(id: $id) {
      posts {
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
      }
    }
  }
`;

export const getUserFriends = /* GraphQL */ `
  query getUserFriends($id: ID!) {
    getUser(id: $id) {
      friends
    }
  }
`;

export const getUserOutgoing = /* GraphQL */ `
  query getUserOutgoing($id: ID!) {
    getUser(id: $id) {
      outgoing_friend_requests
    }
  }
`;

export const getUserIncoming = /* GraphQL */ `
  query getUserIncoming($id: ID!) {
    getUser(id: $id) {
      incoming_friend_requests
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
