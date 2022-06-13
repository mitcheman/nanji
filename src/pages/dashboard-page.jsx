
import { Storage } from "aws-amplify"
import { useState, useEffect } from "react"
import { PostList } from '../components/postList-comp'
import { Timeline } from "../components/timeline-comp"
import { duplicatesByMonth } from "../utils/duplicates"
import { listUserPosts, listAllUserPosts } from "../utils/listdata"
import { sortData } from "../utils/sort"
import { BsChevronDown } from 'react-icons/bs';

//temp set to public - this needs to change and implement groups for friends !fix
Storage.configure({ level: 'public' });

export function Dashboard({user}) {
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
            <div id="nodata">
                <h3>No posts to display ʕ ´•̥̥̥ ᴥ•̥̥̥`ʔ</h3>
            </div>
        )
    }
    else {
        return (
            <>
            <div class="container">
                <PostList posts={posts} setPosts={setPosts} setAllPosts={setAllPosts}/>
                <Timeline allPosts={allPosts} posts={posts} setPosts={setPosts} token={token} setToken={setToken}/>
                <button id="footer" onClick={newPage}><BsChevronDown /></button>
            </div>
            </>
        )
    }
}