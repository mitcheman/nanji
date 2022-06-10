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

export const getUserOutgoing = /* GraphQL */ `
  query getUserOutgoing($id: ID!) {
    getUser(id: $id) {
      outgoing_friend_requests {
        items {
          createdAt
          id
          owner
          request_to
        }
      }
    }
  }
`;

export const getUserIncoming = /* GraphQL */ `
  query getUserIncoming($id: ID!) {
    getUser(id: $id) {
      incoming_friend_requests {
        items {
          createdAt
          id
          request_from
        }
      }
    }
  }
`;
