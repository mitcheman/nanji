import '../css/post.css'

export function Post ({post}) {
    return (
        <>
        <div class="post">
            <img alt={post.id} src={post.s3Image} />
            <p>{post.content}</p>
        </div>
        </>
    )
}