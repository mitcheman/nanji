import { duplicates } from './duplicates';
import { postByDate, listPosts } from '../graphql/queries';
import { API, Storage } from 'aws-amplify';

//this should be refactored to query user not posts table (one to many relationship on user to posts). Same with listAllPosts.
//at scale this wont work
//not to mention permission stuff
export const listSortedPosts = async (user, token) => {
  const filterUser = {
    userID: {
      eq: user,
    },
  };
  const postData = await API.graphql({
    query: postByDate,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
    variables: {
      type: 'Post',
      sortDirection: 'DESC',
      limit: 10,
      nextToken: token,
      filter: filterUser,
    },
  });
  const posts = await Promise.all(
    postData.data.postByDate.items.map(async (post) => {
      const image = await Storage.get(post.image);
      post.s3Image = image;
      return post;
    })
  );

  duplicates(postData.data.postByDate.items);
  return postData;
};

export const listAllPosts = async (user) => {
  const filterUser = {
    userID: {
      eq: user,
    },
  };
  const allPostData = await API.graphql({
    query: listPosts,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
    variables: { filter: filterUser },
  });
  return allPostData;
};
