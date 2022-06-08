
import { Storage, API } from "aws-amplify"
import { postByDate } from "../graphql/queries"
import { useState, useEffect } from "react"
import { PostList } from '../components/postList-comp'
import { duplicates } from "../utils/duplicates"
import { BsChevronDown } from 'react-icons/bs';

Storage.configure({ level: 'private' });

let tokenID;
let limitNum = 5;

export function Dashboard() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        tokenID = null;
        listAllPosts().then((data) => {
            setPosts(data.data.postByDate.items)
            tokenID = data.data.postByDate.nextToken;
            return tokenID;
        })
    }, [])

    async function listAllPosts () {
        const postData = await API.graphql({ query: postByDate, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: { type: "Post", sortDirection: "DESC", limit: limitNum, nextToken: tokenID } })
        const posts = await Promise.all(postData.data.postByDate.items.map(async post => {
            const image = await Storage.get(post.image)
            post.s3Image = image
            return post
        } ))
        //removes duplicate dates
        duplicates(postData.data.postByDate.items)
        return postData
    }

    async function newPage () {
        listAllPosts()
        .then((data) => {
            if (tokenID === null) return;
            setPosts(prev => {
                return [...prev, ...data.data.postByDate.items]
            })
            tokenID = data.data.postByDate.nextToken;
            return tokenID;
        })
    }

    return (
        <>
        <div class="container">
            <PostList posts={posts} setPosts={setPosts} />
            <button id="footer" onClick={newPage}><BsChevronDown /></button>
        </div>
        </>
    )
}