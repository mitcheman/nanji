import '../css/post.css'
const moment = require('moment')

export function Post ({post}) {

    if (post.date === null) {
        return (
            <>
            <div class="post">
                <img alt={post.id} src={post.s3Image} />
                <p>{post.content}</p>
            </div>
            <div class="createdat">
            <p>post created: {moment(post.createdAt).format('MMMM Do YYYY')}</p>
            </div>
            </>
        )

    } else {
    return (
        <>
        <div class="timeinfo">
            <h3>{moment(post.date).format('MMMM Do YYYY')} - </h3>
            <p>{moment(post.date).fromNow()}</p>
        </div>
        <div class="post">
            <img alt={post.id} src={post.s3Image} />
            <p>{post.content}</p>
        </div>
        <div class="createdat">
        <p>post created: {moment(post.createdAt).format('MMMM Do YYYY')}</p>
        </div>
        </>
    )
}
}