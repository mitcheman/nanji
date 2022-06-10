/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      date
      content
      image
      type
      userID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      date
      content
      image
      type
      userID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      date
      content
      image
      type
      userID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      family_name
      given_name
      preferred_username
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      family_name
      given_name
      preferred_username
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      family_name
      given_name
      preferred_username
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
export const createFriend = /* GraphQL */ `
  mutation CreateFriend(
    $input: CreateFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    createFriend(input: $input, condition: $condition) {
      id
      request_to
      createdAt
      updatedAt
      userFriendsId
      owner
    }
  }
`;
export const updateFriend = /* GraphQL */ `
  mutation UpdateFriend(
    $input: UpdateFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    updateFriend(input: $input, condition: $condition) {
      id
      request_to
      createdAt
      updatedAt
      userFriendsId
      owner
    }
  }
`;
export const deleteFriend = /* GraphQL */ `
  mutation DeleteFriend(
    $input: DeleteFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    deleteFriend(input: $input, condition: $condition) {
      id
      request_to
      createdAt
      updatedAt
      userFriendsId
      owner
    }
  }
`;
export const createOutgoingFriendRequest = /* GraphQL */ `
  mutation CreateOutgoingFriendRequest(
    $input: CreateOutgoingFriendRequestInput!
    $condition: ModelOutgoingFriendRequestConditionInput
  ) {
    createOutgoingFriendRequest(input: $input, condition: $condition) {
      id
      request_to
      createdAt
      updatedAt
      userOutgoing_friend_requestsId
      owner
    }
  }
`;
export const updateOutgoingFriendRequest = /* GraphQL */ `
  mutation UpdateOutgoingFriendRequest(
    $input: UpdateOutgoingFriendRequestInput!
    $condition: ModelOutgoingFriendRequestConditionInput
  ) {
    updateOutgoingFriendRequest(input: $input, condition: $condition) {
      id
      request_to
      createdAt
      updatedAt
      userOutgoing_friend_requestsId
      owner
    }
  }
`;
export const deleteOutgoingFriendRequest = /* GraphQL */ `
  mutation DeleteOutgoingFriendRequest(
    $input: DeleteOutgoingFriendRequestInput!
    $condition: ModelOutgoingFriendRequestConditionInput
  ) {
    deleteOutgoingFriendRequest(input: $input, condition: $condition) {
      id
      request_to
      createdAt
      updatedAt
      userOutgoing_friend_requestsId
      owner
    }
  }
`;
export const createIncomingFriendRequest = /* GraphQL */ `
  mutation CreateIncomingFriendRequest(
    $input: CreateIncomingFriendRequestInput!
    $condition: ModelIncomingFriendRequestConditionInput
  ) {
    createIncomingFriendRequest(input: $input, condition: $condition) {
      id
      request_from
      createdAt
      updatedAt
      userIncoming_friend_requestsId
    }
  }
`;
export const updateIncomingFriendRequest = /* GraphQL */ `
  mutation UpdateIncomingFriendRequest(
    $input: UpdateIncomingFriendRequestInput!
    $condition: ModelIncomingFriendRequestConditionInput
  ) {
    updateIncomingFriendRequest(input: $input, condition: $condition) {
      id
      request_from
      createdAt
      updatedAt
      userIncoming_friend_requestsId
    }
  }
`;
export const deleteIncomingFriendRequest = /* GraphQL */ `
  mutation DeleteIncomingFriendRequest(
    $input: DeleteIncomingFriendRequestInput!
    $condition: ModelIncomingFriendRequestConditionInput
  ) {
    deleteIncomingFriendRequest(input: $input, condition: $condition) {
      id
      request_from
      createdAt
      updatedAt
      userIncoming_friend_requestsId
    }
  }
`;
