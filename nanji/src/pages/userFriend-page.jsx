import { API } from "aws-amplify"
import { getUser } from "../graphql/queries"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { PostList } from '../components/postList-comp'
import { Timeline } from "../components/timeline-comp"
import { duplicatesByMonth } from "../utils/duplicates"
import { listAllPosts, listSortedPosts } from "../utils/listdata"
import { sortData } from "../utils/sort"
import { BsChevronDown } from 'react-icons/bs';

export function UserFriend({currentFriend, setCurrentFriend}) {

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
        listSortedPosts(id).then((data) => {
            setPosts(data.data.postByDate.items);
            const tokenID = data.data.postByDate.nextToken;
            setToken(tokenID);
        })
    }, [])

    useEffect(() => {
        listAllPosts(id).then((data) => {
            const listData = data.data.listPosts.items
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
        listSortedPosts(id, token)
        .then((data) => {
            if (token === null || undefined) return;
            setPosts(prev => {
                return [...prev, ...data.data.postByDate.items]
            })
            const tokenID = data.data.postByDate.nextToken;
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
                <Timeline allPosts={allPosts} posts={posts} setPosts={setPosts} token={token} setToken={setToken}/>
                <button id="footer" onClick={newPage}><BsChevronDown /></button>
            </div>
            </>
        )
    }
}