
import { Storage } from "aws-amplify"
import { useState } from "react"


export function NewPost() {

    const [fileData, setFileData] = useState()
    const [fileStatus, setFileStatus] = useState(false)

    const uploadFile = async () => {
        const result = await Storage.put(fileData.name, fileData, {
            contentType: fileData.type,
        });
        setFileStatus(true);
        console.log(result);
    }

    return (
    <>
    <h1>new post</h1>
    <div>
        <input type="file" onChange={(e) => setFileData(e.target.files[0])}></input>
    </div>
    <div>
        <button onClick={uploadFile}>Upload</button>
    </div>
    {fileStatus ? "file uploaded": ''}
    </>
    )
}