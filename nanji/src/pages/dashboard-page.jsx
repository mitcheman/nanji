
import { Storage, API } from "aws-amplify"
import { listPosts } from "../graphql/queries"
import { useState, useEffect } from "react"
import { PostList } from '../components/postList-comp'
import { Header } from '../components/header-comp'
import { BsChevronDown } from 'react-icons/bs';

Storage.configure({ level: 'private' });

let tokenID;
let limitNum = 5;

export function Dashboard() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        listAllPosts().then((data) => {
            setPosts(data.data.listPosts.items)
            tokenID = data.data.listPosts.nextToken;
            return tokenID;
        })
    }, [])

    async function listAllPosts () {
        const postData = await API.graphql({ query: listPosts, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: { limit: limitNum, nextToken: tokenID } })
        const posts = await Promise.all(postData.data.listPosts.items.map(async post => {
            const image = await Storage.get(post.image)
            post.s3Image = image
            return post
        } ))
        return postData
    }

    async function newPage () {
        listAllPosts()
        .then((data) => {
            if (tokenID === null) return;
            setPosts(prev => {
                return ([...prev, ...data.data.listPosts.items])
            })
            tokenID = data.data.listPosts.nextToken;
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