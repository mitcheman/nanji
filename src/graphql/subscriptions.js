/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($owner: String, $friends: String) {
    onCreatePost(owner: $owner, friends: $friends) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String, $friends: String) {
    onUpdatePost(owner: $owner, friends: $friends) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String, $friends: String) {
    onDeletePost(owner: $owner, friends: $friends) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String, $id: String) {
    onCreateUser(owner: $owner, id: $id) {
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
      owner
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String, $id: String) {
    onUpdateUser(owner: $owner, id: $id) {
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
      owner
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String, $id: String) {
    onDeleteUser(owner: $owner, id: $id) {
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
      owner
    }
  }
`;
