
import { Storage, API, Geo } from "aws-amplify"
import { createPost } from "../graphql/mutations"
import { useState } from "react"
import { TextAreaField, SearchField } from '@aws-amplify/ui-react';
import { BsUpload } from 'react-icons/bs';
import { TiDeleteOutline } from 'react-icons/ti'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { Alert } from '@aws-amplify/ui-react';
import '../css/form.css'
const moment = require('moment')

const currentDate = moment(new Date()).format('YYYY-MM-DD')

export function NewPost({user}) {

    const [fileData, setFileData] = useState()
    const [fileStatus, setFileStatus] = useState(false)

    //search for location
    const [locationSearch, setLocationSearch] = useState();
    const [locationSearchResult, setLocationSearchResult] = useState(false);

    //select location
    const [selectedLocation, setSelectedLocation] = useState()
    const [selectedLocationResult, setSelectedLocationResult] = useState(false);

    async function savePost (event) {
        event.preventDefault()
        if (event.target.content.value.length === 0 || event.target.fileupload.value === null) {
            alert('please input all required data')
            return;
        }
        //this cant be best practice; also add compression? !fix
        if (fileData.size > 3000000) {
            alert('file size too large');
            return;
        }
        //this is a stupid file naming system - need to change this
        const filename = currentDate + '_' + fileData.name;
        await Storage.put(filename, fileData, {level: 'public'});
        const newPost = {location: selectedLocation, date: event.target.date.value, content: event.target.content.value, image: filename, userID: user.username, type: "Post"};
        const result = await API.graphql({ query: createPost, variables: { input: newPost }, authMode: 'AMAZON_COGNITO_USER_POOLS' });
        console.log(result)
        setFileStatus(true);
        setSelectedLocation()
        setSelectedLocationResult(false);

        event.target.content.value = '';
        event.target.date.value = "";
        event.target.fileupload.value = null;
    }

    async function searchLocation (event) {
        const searchOptions = {maxResults: 10, language: 'en'}
        const results = await Geo.searchByText(event, searchOptions);
        console.log(results)
        if (results.length > 0) {
            setLocationSearchResult(true);
            setLocationSearch(results);
        }
        if (results.length <= 0) {
            setLocationSearch([]);
            setLocationSearchResult(false);
        }
    }

    function selectLocation(location) {
        setSelectedLocation(location);
        setLocationSearchResult(false)
        setSelectedLocationResult(true);
    }

    function removeLocation() {
        setSelectedLocation();
        setSelectedLocationResult(false);
    }

    function dismissAlert() {
        setFileStatus(false);
        setLocationSearchResult(false);
    }

    return (
    <>
    <div id="newpost">
        <div id="form">
        <h3>ʕ •ᴥ•ʔ ☆<br></br>New Post</h3>
        <label>Location of Photo</label>
            <SearchField label="Location Search" placeholder="Search here..."
            onSubmit={searchLocation}/>
            <div>
            {(locationSearchResult) ?
            <div>
                {locationSearch.map((locationResult) => (
                    <div class="locationsearchresults">
                    <ul>
                        <li>{locationResult.label}</li>
                    </ul>
                    <AiOutlineCheckCircle onClick={() => selectLocation(locationResult.label)}/>
                    </div>
                ))}
            </div>
                : <div class="locationsearchresults"><h5>No results</h5></div>}
                {selectedLocationResult ? <div id="selectedlocation"><h5>Location&ensp;|</h5><p>&ensp;
                {selectedLocation}</p><TiDeleteOutline onClick={removeLocation}/></div> : ''}
            </div>
        <form onSubmit={savePost}>
            <label for="picdate">Date of Photo</label>
            <input id="picdate" name="date" type="date" max={currentDate} onClick={dismissAlert}/>
            <label id="content" for="content">Background Story</label>
            <TextAreaField size="large" autoComplete="off" name="content" type="text" placeholder="Enter Text Here" onClick={dismissAlert}/>
            <input id="fileupload" name="fileupload" type="file" accept="image/*" onChange={(e) => setFileData(e.target.files[0])}></input>
            <button id="submitbutton" type="submit"><BsUpload /></button>
        </form>
    </div>
        <div id="uploadalert">
            {fileStatus ? <Alert variation="success" isDismissible={true}>File Uploaded</Alert>: ''}
        </div>
        </div>
    </>
    )
}