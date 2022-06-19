/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      location
      date
      content
      image
      type
      userID
      createdAt
      updatedAt
      owner
      friends
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
      location
      date
      content
      image
      type
      userID
      createdAt
      updatedAt
      owner
      friends
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
      location
      date
      content
      image
      type
      userID
      createdAt
      updatedAt
      owner
      friends
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
      profile_pic
      posts {
        nextToken
      }
      friends
      outgoing_friend_requests
      incoming_friend_requests
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
      profile_pic
      posts {
        nextToken
      }
      friends
      outgoing_friend_requests
      incoming_friend_requests
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
      profile_pic
      posts {
        nextToken
      }
      friends
      outgoing_friend_requests
      incoming_friend_requests
      createdAt
      updatedAt
    }
  }
`;
