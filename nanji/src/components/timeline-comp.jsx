import '../css/timeline.css'
const moment = require('moment')

export function Timeline({allPosts}) {
    return (
        <div id="timeline">
            <ul>
            <h3>Timeline</h3>
            {allPosts.map((post) => (
                (post.date === null)
                ? <></>: <>
                <li key={post.date}>{moment(post.date).format('MMMM YYYY')}</li>
                </>
            ))}
            </ul>
        </div>
    )
}