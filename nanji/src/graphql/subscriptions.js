/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($owner: String) {
    onCreatePost(owner: $owner) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String) {
    onUpdatePost(owner: $owner) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String) {
    onDeletePost(owner: $owner) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateFriend = /* GraphQL */ `
  subscription OnCreateFriend($owner: String) {
    onCreateFriend(owner: $owner) {
      id
      request_to
      createdAt
      updatedAt
      userFriendsId
      owner
    }
  }
`;
export const onUpdateFriend = /* GraphQL */ `
  subscription OnUpdateFriend($owner: String) {
    onUpdateFriend(owner: $owner) {
      id
      request_to
      createdAt
      updatedAt
      userFriendsId
      owner
    }
  }
`;
export const onDeleteFriend = /* GraphQL */ `
  subscription OnDeleteFriend($owner: String) {
    onDeleteFriend(owner: $owner) {
      id
      request_to
      createdAt
      updatedAt
      userFriendsId
      owner
    }
  }
`;
export const onCreateOutgoingFriendRequest = /* GraphQL */ `
  subscription OnCreateOutgoingFriendRequest($owner: String) {
    onCreateOutgoingFriendRequest(owner: $owner) {
      id
      request_to
      createdAt
      updatedAt
      userOutgoing_friend_requestsId
      owner
    }
  }
`;
export const onUpdateOutgoingFriendRequest = /* GraphQL */ `
  subscription OnUpdateOutgoingFriendRequest($owner: String) {
    onUpdateOutgoingFriendRequest(owner: $owner) {
      id
      request_to
      createdAt
      updatedAt
      userOutgoing_friend_requestsId
      owner
    }
  }
`;
export const onDeleteOutgoingFriendRequest = /* GraphQL */ `
  subscription OnDeleteOutgoingFriendRequest($owner: String) {
    onDeleteOutgoingFriendRequest(owner: $owner) {
      id
      request_to
      createdAt
      updatedAt
      userOutgoing_friend_requestsId
      owner
    }
  }
`;
export const onCreateIncomingFriendRequest = /* GraphQL */ `
  subscription OnCreateIncomingFriendRequest($owner: String) {
    onCreateIncomingFriendRequest(owner: $owner) {
      id
      request_to
      createdAt
      updatedAt
      userIncoming_friend_requestsId
      owner
    }
  }
`;
export const onUpdateIncomingFriendRequest = /* GraphQL */ `
  subscription OnUpdateIncomingFriendRequest($owner: String) {
    onUpdateIncomingFriendRequest(owner: $owner) {
      id
      request_to
      createdAt
      updatedAt
      userIncoming_friend_requestsId
      owner
    }
  }
`;
export const onDeleteIncomingFriendRequest = /* GraphQL */ `
  subscription OnDeleteIncomingFriendRequest($owner: String) {
    onDeleteIncomingFriendRequest(owner: $owner) {
      id
      request_to
      createdAt
      updatedAt
      userIncoming_friend_requestsId
      owner
    }
  }
`;
