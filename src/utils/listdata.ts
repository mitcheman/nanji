import { duplicates } from "./duplicates";
import { postByUser } from "../graphql/queries";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, Storage } from "aws-amplify";

//TODO: check that the token is actually needed
export const listUserPosts = async (userID: string, token?) => {
  const userPosts: GraphQLResult<any> = await API.graphql({
    query: postByUser,
    authMode: "AMAZON_COGNITO_USER_POOLS",
    variables: {
      userID,
      limit: 5,
      nextToken: token,
      sortDirection: "DESC",
    },
  });

  try {
    const posts = await Promise.all(
      userPosts.data.postByUser.items.map(async (post) => {
        const image = await Storage.get(post.image);
        post.s3Image = image;
        return post;
      })
    );
    duplicates(userPosts.data.postByUser.items);
    return userPosts;
  } catch (err) {
    console.log(err);
  }
};

export const listUserPostsTimeline = async (user, token, date) => {
  const userPosts: GraphQLResult<any> = await API.graphql({
    query: postByUser,
    authMode: "AMAZON_COGNITO_USER_POOLS",
    variables: {
      userID: user,
      limit: 5,
      sortDirection: "DESC",
      date: { le: date },
    },
  });

  try {
    const posts = await Promise.all(
      userPosts.data.postByUser.items.map(async (post) => {
        const image = await Storage.get(post.image);
        post.s3Image = image;
        return post;
      })
    );

    duplicates(userPosts.data.postByUser.items);
    return userPosts;
  } catch (err) {
    console.log(err);
  }
};

export const listAllUserPosts = async (userID) => {
  const allPostData: GraphQLResult<any> = await API.graphql({
    query: postByUser,
    authMode: "AMAZON_COGNITO_USER_POOLS",
    variables: {
      userID,
      sortDirection: "DESC",
    },
  });
  return allPostData;
};
