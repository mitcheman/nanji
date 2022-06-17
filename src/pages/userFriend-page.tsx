import { API } from "aws-amplify"
import { getUser } from "../graphql/queries"
import { getUserFr } from "../graphql/custom"
import { useParams } from "react-router-dom"
import { isMobile } from 'react-device-detect';
import { useState, useEffect } from "react"
import { PostList } from '../components/postList-comp'
import { Menu } from '../components/menu-comp'
import { duplicatesByMonth } from "../utils/duplicates"
import { listAllUserPosts, listUserPosts } from "../utils/listdata"
import { sortData } from "../utils/sort"
import { BsChevronDown } from 'react-icons/bs';

//would love to reuse a lot of the dashboard and tried.
//Some confusion and funkiness between using user token on initial login vs grabbing data and using current friend. !fix
//future me note - can switch between user if id params exist - see friendslist component
export function UserFriend({user, friends, setFriends, currentFriend, setCurrentFriend}) {

    const { id } = useParams();

    useEffect(() => {
        getUserinfo().then((data) => {
            setCurrentFriend(data.data.getUser);
        })
    }, [])

    const getUserinfo = async () => {
        const userData = await API.graphql({ query: getUser, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: { id: id } });
        return userData;
    }

    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [noPosts, setNoPosts] = useState(false);
    const [token, setToken] = useState();

    useEffect(() => {
        listUserPosts(id).then((data) => {
            setPosts(data.data.postByUser.items);
            const tokenID = data.data.postByUser.nextToken;
            setToken(tokenID);
        })
    }, [])

    useEffect(() => {
        listAllUserPosts(id).then((data) => {
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
        listUserPosts(id, token)
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
    } else {
        return (
            <>
            <div class="container">
                <PostList posts={posts} setPosts={setPosts} currentFriend={currentFriend} />
                <Menu user={currentFriend} friends={friends} setFriends={setFriends} allPosts={allPosts} posts={posts} setPosts={setPosts} token={token} setToken={setToken}/>
                <button id="footer" onClick={newPage}><BsChevronDown /></button>
            </div>
            </>
        )
    }
}