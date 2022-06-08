
import { Post } from './post-comp'
import '../css/postlist.css'

export function PostList ({posts}) {
    return (
        <>
            {posts.map((post) => (
                <div id="postlist" >
                    <Post post={post} key={post.id}/>
                </div>
            ))}
            <div id="buffer"></div>
        </>
    )
}