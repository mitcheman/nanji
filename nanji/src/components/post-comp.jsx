import '../css/post.css'
const moment = require('moment')

export function Post ({post}) {

    if (post.date === null) {
        return (
            <>
            <div>
            <div class="post">
                <img alt={post.id} src={post.s3Image} />
                <p>{post.content}</p>
            </div>
            </div>
            </>
        )

    } else {
    return (
        <>
        <div>
        <div class="timeinfo">
            <h3>{moment(post.date).format('MMMM Do YYYY')} - </h3>
            <p>{moment(post.date).fromNow()}</p>
        </div>
        <div class="post">
            <img alt={post.id} src={post.s3Image} />
            <p>{post.content}</p>
        </div>
        </div>
        </>
    )
}
}