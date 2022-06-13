import '../css/timeline.css'
import { Storage, API } from "aws-amplify"
import { postByDate } from "../graphql/queries"
import { duplicates } from "../utils/duplicates"
const moment = require('moment')

export function Timeline({allPosts, posts, setPosts, token, setToken}) {

    let tokenID;
    //passing this var in too many places !fix
    let limitNum = 5;

    const clickHandler = async (e) => {

        if (allPosts.length <= limitNum) return;

        const postData = await API.graphql({ query: postByDate, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: { type: "Post", sortDirection: "DESC", limit: limitNum, nextToken: tokenID, date: { le: e.target.getAttribute('id') } } });
        const filteredPosts = postData.data.postByDate;
        const posts = await Promise.all(filteredPosts.items.map(async post => {
            const image = await Storage.get(post.image)
            post.s3Image = image
            return post
        } ));

        duplicates(filteredPosts.items);
        setPosts(filteredPosts.items);
        setToken(filteredPosts.nextToken);
        window.scrollTo(0, 0)
    }

    return (
        <div id="timeline">
            <ul>
            <h3>Timeline</h3>
            {allPosts.map((post) => (
                (post.date === null)
                ? <></>:
                <div key={post.date}>
                    <li onClick={clickHandler}
                    id={post.date}>{moment(post.date).format('MMMM YYYY')}</li>
                </div>
            ))}
            </ul>
        </div>
    )
}