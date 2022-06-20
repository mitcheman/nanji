import { postByUser } from '../graphql/queries';
import { API, Storage } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { PostByUserAPIResponse, PostType } from '../Shared/Types';

export const listUserPosts = async (
  user: string,
  token: string | undefined,
) => {
  const userPosts = (await API.graphql({
    query: postByUser,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
    variables: {
      userID: user,
      limit: 5,
      nextToken: token,
      sortDirection: 'DESC',
    },
  })) as GraphQLResult<PostByUserAPIResponse>;

  userPosts.data &&
    (await Promise.all(
      userPosts.data.postByUser.items.map(async (post: PostType) => {
        const image = await Storage.get(post.image);
        post.s3ImageUrl = image;
        return post;
      }),
    ));

  return userPosts;
};

export const listUserPostsTimeline = async (
  user: string,
  token: string | undefined,
  date: string,
) => {
  const userPosts = (await API.graphql({
    query: postByUser,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
    variables: {
      userID: user,
      limit: 5,
      sortDirection: 'DESC',
      date: { le: date },
    },
  })) as GraphQLResult<PostByUserAPIResponse>;

  userPosts.data &&
    (await Promise.all(
      userPosts.data.postByUser.items.map(async (post: PostType) => {
        const image = await Storage.get(post.image);
        post.s3ImageUrl = image;
        return post;
      }),
    ));

  return userPosts;
};

export const listAllUserPosts = async (user: string) => {
  const allPostData = (await API.graphql({
    query: postByUser,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
    variables: {
      userID: user,
      sortDirection: 'DESC',
    },
  })) as GraphQLResult<PostByUserAPIResponse>;
  return allPostData;
};
