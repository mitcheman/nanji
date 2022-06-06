
import { Storage, API } from "aws-amplify"
import { listPosts } from "../graphql/queries"
import { useState, useEffect } from "react"

Storage.configure({ level: 'private' });

export function Dashboard() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        listAllPosts().then((data) => {
            setPosts(data)
        })
    }, [])


    async function listAllPosts () {
        const postData = await API.graphql({ query: listPosts, authMode: 'AMAZON_COGNITO_USER_POOLS' })
        const posts = await Promise.all(postData.data.listPosts.items.map(async post => {
            const image = await Storage.get(post.image)
            post.s3Image = image
            return post
        } ))
        console.log('posts: ', posts)
        return posts
    }

    return (
        <>
        <h1>
            Dashboard
        </h1>
        <div>
            {posts.map((post) => (
                <>
                <img alt={post.id} src={post.s3Image} />
                <p>{post.content}</p>
                </>
            ))}
        </div>
        </>
    )
}