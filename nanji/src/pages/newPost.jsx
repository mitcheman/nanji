
import { Storage, API } from "aws-amplify"
import { createPost } from "../graphql/mutations"
import { useState } from "react"


export function NewPost({user}) {

    const [fileData, setFileData] = useState()
    const [fileStatus, setFileStatus] = useState(false)

    async function savePost (event) {
        event.preventDefault()
        if (event.target.content.value.length === 0 || event.target.fileupload.value === null) return;
        //this is a stupid file naming system - need to change this
        const filename = user.username + fileData.name;
        await Storage.put(filename, fileData, {level: 'private'});
        const newPost = {content: event.target.content.value, image: filename, userID: user.username}
        const result = await API.graphql({ query: createPost, variables: { input: newPost }, authMode: 'AMAZON_COGNITO_USER_POOLS' })
        setFileStatus(true)

        event.target.content.value = ''
        event.target.fileupload.value = null;
        console.log(result)
    }


    return (
    <>
    <h1>new post</h1>
    <div>
        <form class="form" onSubmit={savePost}>
            <input name="content" type="text" placeholder="enter content"></input>
            <input name="fileupload" type="file" onChange={(e) => setFileData(e.target.files[0])}></input>
            <button type="submit">Upload</button>
        </form>
    </div>
    <div>

    </div>
    {fileStatus ? "file uploaded": ''}
    </>
    )
}