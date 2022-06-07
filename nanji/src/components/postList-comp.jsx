
import { Post } from './post-comp'
import '../css/postlist.css'
const moment = require('moment')

export function PostList ({posts}) {
    return (
        <>
        <div>
            {posts.map((post) => (
                <>
                <div class="postlist">
                    <div class="timeinfo">
                        <h3>{moment(post.date).format('MMMM Do YYYY')} - </h3>
                        <p>{moment(post.date).fromNow()}</p>
                    </div>
                    <Post post={post} key={post.id}/>
                </div>
                </>
            ))}
        </div>
        </>
    )
}