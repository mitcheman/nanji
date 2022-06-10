export const getUserByUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      family_name
      given_name
      preferred_username
      createdAt
      updatedAt
      owner
    }
  }
`;
