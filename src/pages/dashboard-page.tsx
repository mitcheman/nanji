
import { Storage } from "aws-amplify"
import { useState, useEffect } from "react"
import { PostList } from '../components/postList-comp'
import { Menu } from "../components/menu-comp"
import { duplicatesByMonth } from "../utils/duplicates"
import { listUserPosts, listAllUserPosts } from "../utils/listdata"
import { sortData } from "../utils/sort"
import { getFriends } from "../utils/friendRequests"
import { BsChevronDown } from 'react-icons/bs';
import '../css/dashboard.css'

//temp set to public - this needs to change and implement groups for friends !fix
Storage.configure({ level: 'public' });
//Shared Types will have their own file
type UserType = {
    id: string,
    family_name: string,
    given_name: string,
    preferred_username: string,
    username: string,
    profile_pic: string,   
}

type Props = {
    user: UserType;
    signOut: any; //TODO: adjust this
    friends: UserType[];
    setFriends: any; //TODO: adjust this
}

export function Dashboard({user, signOut, friends, setFriends}: Props) {
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [noPosts, setNoPosts] = useState(false);
    const [token, setToken] = useState();

    useEffect(() => {
        listUserPosts(user.username).then((data) => {
            setPosts(data.data.postByUser.items);
            const tokenID = data.data.postByUser.nextToken;
            setToken(tokenID);
        })
    }, [])

    useEffect(() => {
        listAllUserPosts(user.username).then((data) => {
            const listData = data.data.postByUser.items
            sortData(listData);
            setAllPosts(duplicatesByMonth(listData))
            if (listData.length === 0) {
                setNoPosts(true);
            } else {
                setNoPosts(false);
            }
        })
    }, [])

    useEffect(() => {
        getFriends(user.username).then((data) => {
            setFriends(data)
        })
    }, []);

    async function newPage () {
        listUserPosts(user.username, token)
        .then((data) => {
            if (token === null || undefined) return;
            setPosts(prev => {
                return [...prev, ...data.data.postByUser.items]
            })
            const tokenID = data.data.postByUser.nextToken;
            setToken(tokenID);
        })
    }

    if (noPosts === true) {
        return (
            <div className="container">
                <Menu user={user} signOut={signOut} friends={friends} setFriends={setFriends} allPosts={allPosts} posts={posts} setPosts={setPosts} token={token} setToken={setToken}/>
            <div id="nodata">
                <h3>No posts to display ʕ ´•̥̥̥ ᴥ•̥̥̥`ʔ</h3>
            </div>
            </div>
        )
    }
    else {
        return (
            <>
            <div className="container">
                <PostList posts={posts} setPosts={setPosts} setAllPosts={setAllPosts}/>
                <Menu user={user} signOut={signOut} friends={friends} setFriends={setFriends} allPosts={allPosts} posts={posts} setPosts={setPosts} token={token} setToken={setToken}/>
                <button id="footer" onClick={newPage}><BsChevronDown /></button>
            </div>
            </>
        )
    }
}