/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateFriend = /* GraphQL */ `
  subscription OnCreateFriend {
    onCreateFriend {
      id
      friend_with
      owner
      createdAt
      updatedAt
      userFriendsId
    }
  }
`;
export const onUpdateFriend = /* GraphQL */ `
  subscription OnUpdateFriend {
    onUpdateFriend {
      id
      friend_with
      owner
      createdAt
      updatedAt
      userFriendsId
    }
  }
`;
export const onDeleteFriend = /* GraphQL */ `
  subscription OnDeleteFriend {
    onDeleteFriend {
      id
      friend_with
      owner
      createdAt
      updatedAt
      userFriendsId
    }
  }
`;
export const onCreateOutgoingFriendRequest = /* GraphQL */ `
  subscription OnCreateOutgoingFriendRequest {
    onCreateOutgoingFriendRequest {
      id
      request_to
      createdAt
      updatedAt
      userOutgoing_friend_requestsId
    }
  }
`;
export const onUpdateOutgoingFriendRequest = /* GraphQL */ `
  subscription OnUpdateOutgoingFriendRequest {
    onUpdateOutgoingFriendRequest {
      id
      request_to
      createdAt
      updatedAt
      userOutgoing_friend_requestsId
    }
  }
`;
export const onDeleteOutgoingFriendRequest = /* GraphQL */ `
  subscription OnDeleteOutgoingFriendRequest {
    onDeleteOutgoingFriendRequest {
      id
      request_to
      createdAt
      updatedAt
      userOutgoing_friend_requestsId
    }
  }
`;
export const onCreateIncomingFriendRequest = /* GraphQL */ `
  subscription OnCreateIncomingFriendRequest {
    onCreateIncomingFriendRequest {
      id
      request_from
      createdAt
      updatedAt
      userIncoming_friend_requestsId
    }
  }
`;
export const onUpdateIncomingFriendRequest = /* GraphQL */ `
  subscription OnUpdateIncomingFriendRequest {
    onUpdateIncomingFriendRequest {
      id
      request_from
      createdAt
      updatedAt
      userIncoming_friend_requestsId
    }
  }
`;
export const onDeleteIncomingFriendRequest = /* GraphQL */ `
  subscription OnDeleteIncomingFriendRequest {
    onDeleteIncomingFriendRequest {
      id
      request_from
      createdAt
      updatedAt
      userIncoming_friend_requestsId
    }
  }
`;
