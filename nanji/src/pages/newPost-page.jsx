
import { Storage, API } from "aws-amplify"
import { createPost } from "../graphql/mutations"
import { useState } from "react"
import { TextAreaField } from '@aws-amplify/ui-react';
import { BsUpload } from 'react-icons/bs';
import { BsCheckCircle } from 'react-icons/bs'
import '../css/form.css'
const moment = require('moment')

const currentDate = moment(new Date()).format('YYYY-MM-DD')

export function NewPost({user}) {

    const [fileData, setFileData] = useState()
    const [fileStatus, setFileStatus] = useState(false)

    async function savePost (event) {
        event.preventDefault()
        if (event.target.content.value.length === 0 || event.target.fileupload.value === null) {
            alert('please input all required data')
            return;
        }
        if (fileData.size > 3000000) {
            alert('file size too large');
            return;
        }
        //this is a stupid file naming system - need to change this
        const filename = currentDate + '_' + fileData.name;
        await Storage.put(filename, fileData, {level: 'public'});
        const newPost = {date: event.target.date.value, content: event.target.content.value, image: filename, userID: user.username, type: "Post"};
        const result = await API.graphql({ query: createPost, variables: { input: newPost }, authMode: 'AMAZON_COGNITO_USER_POOLS' });
        setFileStatus(true);

        event.target.content.value = '';
        event.target.date.value = "";
        event.target.fileupload.value = null;
    }

    return (
    <>
    <div id="newpost">
        <form id="form" onSubmit={savePost}>
        <h3>ʕ •ᴥ•ʔ ☆<br></br>New Post</h3>
            <label for="picdate">Enter the date you think this was taken</label>
            <input id="picdate" name="date" type="date" max={currentDate} />
            <label for="content">Background story of photo</label>
            <TextAreaField size="large" autoComplete="off" name="content" type="text" placeholder="Enter Text Here" />
            <input id="fileupload" name="fileupload" type="file" accept="image/*" onChange={(e) => setFileData(e.target.files[0])}></input>
            {/* {fileStatus ? <div><BsCheckCircle /></div>: ''} */}
            <button type="submit"><BsUpload /></button>
        </form>
        </div>
    </>
    )
}