import { Storage } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { PostList } from '../components/postList-comp';
import { Menu } from '../components/menu-comp';
import { duplicatesByMonth } from '../utils/duplicates';
import { listUserPosts, listAllUserPosts } from '../utils/listdata';
import { sortData } from '../utils/sort';
import { getFriends } from '../utils/friendRequests';
import { BsChevronDown } from 'react-icons/bs';
import '../css/dashboard.css';
import { CognitoUserType, FriendType, PostType } from '../Shared/Types';

//temp set to public - this needs to change and implement groups for friends !fix
Storage.configure({ level: 'public' });

export const Dashboard: React.FC<{
  user: CognitoUserType;
  signOut: () => Promise<any>;
  friends: FriendType[];
  setFriends: React.Dispatch<React.SetStateAction<FriendType[]>>;
}> = ({ user, signOut, friends, setFriends }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [allPosts, setAllPosts] = useState<PostType[]>([]);
  const [noPosts, setNoPosts] = useState(false);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    listUserPosts(user.username, token)
      .then(data => {
        data.data && setPosts(data.data.postByUser.items);
        const tokenID = data.data && data.data.postByUser.nextToken;
        setToken(tokenID);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    listAllUserPosts(user.username).then(data => {
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

  useEffect(() => {
    getFriends(user.username).then(data => {
      setFriends(data);
    });
  }, []);

  async function newPage() {
    listUserPosts(user.username, token).then(data => {
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
      //   <div className="container">
      <div id="nodata">
        <h3>No posts to display ʕ ´•̥̥̥ ᴥ•̥̥̥`ʔ</h3>
      </div>
      //   </div>
    );
  } else {
    return (
      <>
        <div className="container">
          <PostList
            posts={posts}
            setPosts={setPosts}
            setAllPosts={setAllPosts}
          />
          <Menu
            user={user}
            signOut={signOut}
            friends={friends}
            setFriends={setFriends}
            allPosts={allPosts}
            posts={posts}
            setPosts={setPosts}
            token={token}
            setToken={setToken}
          />
          <button id="footer" onClick={newPage}>
            <BsChevronDown />
          </button>
        </div>
      </>
    );
  }
};
