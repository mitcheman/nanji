import React from 'react';
import { Post } from './post-comp';
import { Alert } from '@aws-amplify/ui-react';
import { useState } from 'react';
import '../css/postlist.css';
import { DynamoUserType, PostType } from '../Shared/Types';

export const PostList: React.FC<{
  currentFriend?: DynamoUserType;
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  setAllPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
}> = ({ currentFriend, posts, setPosts, setAllPosts }) => {
  const [deleted, setDeleted] = useState(false);

  function dismissAlert() {
    setDeleted(false);
  }

  return (
    <>
      <div id="postlist" onClick={dismissAlert}>
        {posts.map(post => (
          <Post
            currentFriend={currentFriend}
            post={post}
            posts={posts}
            setPosts={setPosts}
            setAllPosts={setAllPosts}
            setDeleted={setDeleted}
            key={post.id}
          />
        ))}
        {deleted ? (
          <Alert variation="success" isDismissible={true}>
            Post Deleted
          </Alert>
        ) : (
          ''
        )}
      </div>
    </>
  );
};
