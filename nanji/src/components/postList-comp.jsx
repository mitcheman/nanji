
import { Post } from './post-comp'
import '../css/postlist.css'

export function PostList ({posts}) {
    return (
        <>
        <div id="postlist" >
            {posts.map((post) => (
                <Post post={post} key={post.id}/>
            ))}
            </div>
        </>
    )
}