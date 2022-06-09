
import { Post } from './post-comp'
import '../css/postlist.css'

export function PostList ({posts, setPosts }) {
    return (
        <>
        <div id="postlist" >
            {posts.map((post) => (
                <Post post={post} posts={posts} setPosts={setPosts} key={post.id}/>
            ))}
            </div>
        </>
    )
}