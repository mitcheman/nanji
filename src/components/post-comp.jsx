import '../css/post.css'
import { TiDeleteOutline } from 'react-icons/ti'
import { useState } from 'react'
import { Storage, API } from "aws-amplify"
import { deletePost } from "../graphql/mutations"
const moment = require('moment')

export function Post ({currentFriend, post, posts, setPosts, setDeleted, setAllPosts}) {

    const [style, setStyle] = useState({display: 'none'});

    async function deleteHandler (selectedID) {
        const deleteDetails = {
            id: selectedID,
        };
        const deletedPost = await API.graphql({ query: deletePost, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {input: deleteDetails} });
        await Storage.remove(deletedPost.data.deletePost.image, {level: 'private'})
        setPosts(prev => {
            return prev.filter(data => data.id !== selectedID)
        });
        setAllPosts(prev => {
            return prev.filter(data => data.id !== selectedID)
        })
        setDeleted(true);
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
                { (!currentFriend) ? <TiDeleteOutline style={style} onClick={() => deleteHandler(post.id)}/>: <></>}
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
                { (!currentFriend) ? <TiDeleteOutline style={style} onClick={() => deleteHandler(post.id)}/>: <></>}
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