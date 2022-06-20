import '../css/post.css'
import { TiDeleteOutline } from 'react-icons/ti'
import { useState } from 'react'
import { Storage, API } from "aws-amplify"
import { deletePost } from "../graphql/mutations"
const moment = require('moment')



type currentFriendType = {
    
}

type postType = {
    id: string,
    date: Date,
    s3Image: string,
    location: string,
    content: string,
    createdAt: Date,
    updatedAt: Date   
}

type Props = {
    currentFriend: currentFriendType,
    post: postType,
    posts: postType[],
    setPosts: any, //TODO: fix this
    setDeleted: any, //TODO: fix this
    setAllPosts: any, //TODO: fix this
}
export function Post ({currentFriend, post, posts, setPosts, setDeleted, setAllPosts}: Props) {

    const [style, setStyle] = useState({display: 'none'});

    async function deleteHandler (selectedID) {
        const deleteDetails = {
            id: selectedID,
        };
        const deletedPost = await API.graphql({ query: deletePost, authMode: 'AMAZON_COGNITO_USER_POOLS', variables: {input: deleteDetails} });
        await Storage.remove(deletedPost.data.deletePost.image, {level: 'public'})
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
            <div id={post.id} className="post"
                onMouseEnter={e => {
                setStyle({display: 'block'});
                }}
                onMouseLeave={e => {
                    setStyle({display: 'none'})
                }}>
                { (!currentFriend) ? <TiDeleteOutline style={style} onClick={() => deleteHandler(post.id)}/>: <></>}
                <img alt={post.id} src={post.s3Image} />
                <div className="content">
                    <div id="contentlocation">
                        <h5>{post.location}</h5>
                    </div>
                    <p>{post.content}</p>
                </div>
            </div>
            <div className="createdat">
            <p>post created: {moment(post.createdAt).format('MMMM Do YYYY')}</p>
            </div>
            </>
        )

    } else {
    return (
        <>
        <div className="timeinfo">
            <h3>{moment(post.date).format('MMMM Do YYYY')} - </h3>
            {(moment(post.date).format('MMMM Do YYYY') === moment(new Date()).format('MMMM Do YYYY')) ? <p>Today</p>:<p>{moment(post.date).fromNow()}</p>}
        </div>
        <div id={post.id} className="post"
                onMouseEnter={e => {
                setStyle({display: 'block'});
                }}
                onMouseLeave={e => {
                    setStyle({display: 'none'})
                }}>
                { (!currentFriend) ? <TiDeleteOutline style={style} onClick={() => deleteHandler(post.id)}/>: <></>}
            <img alt={post.id} src={post.s3Image} />
            <div className="content">
                <div id="contentlocation">
                    <h5>{post.location}</h5>
                </div>
                    <p>{post.content}</p>
            </div>
        </div>
        <div className="createdat">
        <p>post created: {moment(post.createdAt).format('MMMM Do YYYY')}</p>
        </div>
        </>
    )
}
}