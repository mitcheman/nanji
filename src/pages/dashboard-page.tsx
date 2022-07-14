
import { Storage } from "aws-amplify"
import React from "react"
import { useEffect } from "react"
import { PostList } from '../components/postList-comp'
import { Menu } from "../components/menu-comp"
import { duplicatesByMonth } from "../utils/duplicates"
import { listUserPosts, listAllUserPosts } from "../utils/listdata"
import { sortData } from "../utils/sort"
import { getFriends } from "../utils/friendRequests"
import { BsChevronDown } from 'react-icons/bs';
import { PostType } from "../types/PostType";
import { UserType } from '../types/UserType';
import '../css/dashboard.css'

//temp set to public - this needs to change and implement groups for friends !fix
Storage.configure({ level: 'public' });

type Props = {
    user: UserType;
    signOut: any; //TODO: adjust this
    friends: UserType[];
    setFriends: any; //TODO: adjust this
}

export const Dashboard = ({user, signOut, friends, setFriends }: Props) => {
    const [posts, setPosts] = React.useState<PostType[] | null>([]);
    const [allPosts, setAllPosts] = React.useState<PostType[] | null>([]);
    const [noPosts, setNoPosts] = React.useState<boolean>(false);
    const [token, setToken] = React.useState<string>('');

    useEffect(() => {
        listUserPosts(user.username).then((data) => {
            setPosts(data.data.postByUser.items);
            const tokenID = data.data.postByUser.nextToken;
            setToken(tokenID);
        }).catch((err)=> {console.log(err)});
    }, []); //eslint-disable-line

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
        }).catch((err) => {console.log(err);})
    }, []); //eslint-disable-line

    useEffect(() => {
        getFriends(user.id).then((data) => {
            setFriends(data)
        })
    }, []); //eslint-disable-line
    

    const newPage = async () => {
        const data = await listUserPosts(user.username, token);
        if (token === null || undefined) return;
        setPosts(prev => {
            return [...prev, ...data.data.postByUser.items]
        })
        const tokenID = data.data.postByUser.nextToken;
        setToken(tokenID);
    }

    if (noPosts === true) {
        return (
            <div className="container">
                <Menu user={user} signOut={signOut} friends={friends} setFriends={setFriends} allPosts={allPosts} posts={posts} setPosts={setPosts} token={token} setToken={setToken} />

                <div id="nodata">
                    <h3>No posts to display ʕ ´•̥̥̥ ᴥ•̥̥̥`ʔ</h3>
                </div>
            </div>
        )
    }

        return (
            
            <div className="container">
                <PostList posts={posts} setPosts={setPosts} setAllPosts={setAllPosts}/>
                <Menu user={user} signOut={signOut} friends={friends} setFriends={setFriends} allPosts={allPosts} posts={posts} setPosts={setPosts} token={token} setToken={setToken} />
                <button id="footer" onClick={newPage}><BsChevronDown /></button>
            </div>

        )
    
}