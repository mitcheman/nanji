import { API } from 'aws-amplify';
//@ts-ignore
import { getUser } from '../graphql/queries';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PostList } from '../components/postList-comp';
import { Menu } from '../components/menu-comp';
import { duplicatesByMonth } from '../utils/duplicates';
import { listAllUserPosts, listUserPosts } from '../utils/listdata';
import { sortData } from '../utils/sort';
import { BsChevronDown } from 'react-icons/bs';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import React from 'react';
import { UserFriendProps, PostType, GetUserAPIResponse } from '../Shared/Types';

//would love to reuse a lot of the dashboard and tried.
//Some confusion and funkiness between using user token on initial login vs grabbing data and using current friend. !fix
//future me note - can switch between user if id params exist - see friendslist component

export const UserFriend: React.FC<UserFriendProps> = ({
  user,
  friends,
  setFriends,
  currentFriend,
  setCurrentFriend,
  signOut,
}) => {
  const { id } = useParams() as { id: string };

  useEffect(() => {
    getUserinfo().then(data => {
      data.data && setCurrentFriend(data.data.getUser);
    });
  }, []);

  const getUserinfo = async () => {
    const userData = (await API.graphql({
      query: getUser,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: { id: id },
    })) as GraphQLResult<GetUserAPIResponse>;
    return userData;
  };

  const [posts, setPosts] = useState<PostType[]>([]);
  const [allPosts, setAllPosts] = useState<PostType[]>([]);
  const [noPosts, setNoPosts] = useState(false);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    listUserPosts(id, token).then(data => {
      data.data && setPosts(data.data.postByUser.items);
      const tokenID = data.data && data.data.postByUser.nextToken;
      setToken(tokenID);
    });
  }, []);

  useEffect(() => {
    listAllUserPosts(id).then(data => {
      const listData: PostType[] =
        (data.data && data.data.postByUser.items) || [];
      sortData(listData);
      setAllPosts(duplicatesByMonth(listData));
      if (listData.length === 0) {
        setNoPosts(true);
      } else {
        setNoPosts(false);
      }
    });
  }, []);

  async function newPage() {
    listUserPosts(id, token).then(data => {
      if (token === null || undefined) return;

      setPosts(prev => {
        return data.data ? [...prev, ...data.data.postByUser.items] : [...prev];
      });
      const tokenID = data.data && data.data.postByUser.nextToken;
      setToken(tokenID);
    });
  }

  if (noPosts === true) {
    return (
      <div id="nodata">
        <h3>No posts to display ʕ ´•̥̥̥ ᴥ•̥̥̥`ʔ</h3>
      </div>
    );
  } else {
    return (
      <>
        <div className="container">
          <PostList
            posts={posts}
            setPosts={setPosts}
            currentFriend={currentFriend}
          />
          <Menu
            user={currentFriend}
            friends={friends}
            setFriends={setFriends}
            allPosts={allPosts}
            posts={posts}
            setPosts={setPosts}
            token={token}
            setToken={setToken}
            signOut={signOut}
          />
          <button id="footer" onClick={newPage}>
            <BsChevronDown />
          </button>
        </div>
      </>
    );
  }
};
