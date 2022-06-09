import '../css/post.css'
import { TiDeleteOutline } from 'react-icons/ti'
import { useState } from 'react'
import { Storage, API } from "aws-amplify"
import { deletePost } from "../graphql/mutations"
const moment = require('moment')

export function Post ({post, posts, setPosts}) {

    const [style, setStyle] = useState({display: 'none'});

    async function deleteHandler (event) {
        //this is crazy and no way correct
        console.log(event)
        const details = (event.target.parentNode.getAttribute('id') === null || undefined) ? event.target.parentNode.parentNode.getAttribute('id') : event.target.parentNode.getAttribute('id')

        const deleteDetails = {
            id: details,
        };
        const deletedPost = await API.graphql({ query: deletePost, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {input: deleteDetails} });
        await Storage.remove(deletedPost.data.deletePost.image, {level: 'private'})
        setPosts(prev => {
            return prev.filter(data => data.id !== details)});
        return deletedPost;
};


    //this if/else is stupid and needs to be fixed

    if (post.date === null) {
        return (
            <>
            <div id={post.id} class="post"
                onMouseEnter={e => {
                setStyle({display: 'block'});
                }}
                onMouseLeave={e => {
                    setStyle({display: 'none'})
                }}>
                <TiDeleteOutline style={style} onClick={(e) => deleteHandler(e)}/>
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
        <div id={post.id} class="post"
                onMouseEnter={e => {
                setStyle({display: 'block'});
                }}
                onMouseLeave={e => {
                    setStyle({display: 'none'})
                }}>
                <TiDeleteOutline style={style} onClick={(e) => deleteHandler(e)}/>
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