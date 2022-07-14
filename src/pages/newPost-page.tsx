import { Storage, API, Geo } from "aws-amplify"
import { createPost } from "../graphql/mutations"
import React from "react";
import { UserType } from "../types/UserType";
import { TextAreaField, SearchField } from '@aws-amplify/ui-react';
import { BsUpload } from 'react-icons/bs';
import { TiDeleteOutline } from 'react-icons/ti'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { GrPowerReset } from 'react-icons/gr'
import { Alert } from '@aws-amplify/ui-react';
import '../css/form.css'
const moment = require('moment')
const currentDate = moment(new Date()).format('YYYY-MM-DD')


type Props = {
    user: UserType;
    children?: JSX.Element|JSX.Element[];
}

export const NewPost = ({ user }: Props ) => {
    
    
    type filePayload = {
        name: string,
        size: number,
    }
    
    type locationSearchPayload = {
        payload?: string;
        results?: string[];
        label?: string;
    }
    
    const [fileData, setFileData] = React.useState<filePayload | null>(null);
    const [fileStatus, setFileStatus] = React.useState<boolean>(false);

    const [currentImage, setCurrentImage] = React.useState('');

    //search for location
    const [locationSearch, setLocationSearch] = React.useState<locationSearchPayload[] | null>(null);
    const [locationSearchResult, setLocationSearchResult] = React.useState<boolean>(false);

    //select location
    const [selectedLocation, setSelectedLocation] = React.useState<string | null>(null)
    const [selectedLocationResult, setSelectedLocationResult] = React.useState<boolean>(false);

    function imageOnChangeHandler(e) {
        setFileData(e.target.files[0])
        setCurrentImage(() => URL.createObjectURL(e.target.files[0]));
    }

    function resetFormHandler(e: React.SyntheticEvent): void {
        const content = document.getElementById('content') as HTMLInputElement;
        const picDate = document.getElementById('picdate') as HTMLInputElement;
        const searchField = document.getElementById('searchfield') as HTMLInputElement;
        const fileUpload = document.getElementById('fileupload') as HTMLButtonElement;
        content.value = '';
        picDate.value = '';
        searchField.value = '';
        fileUpload.value = '';
        // document.getElementById('fileupload').value = null;
        
        setFileData(null);
        setCurrentImage('');
        setLocationSearch(null);
        setLocationSearchResult(false)
        setSelectedLocationResult(false);
        setSelectedLocation(null);
    }

    async function savePost (event: React.SyntheticEvent) {
        event.preventDefault()
        const contentInput = document.getElementById('content') as unknown as HTMLTextAreaElement;
        const fUpload = document.getElementById('fileupload') as unknown as HTMLInputElement;

        if (contentInput.value.length === 0 || fUpload.value === null) {
            alert('please input all required data')
            return;
        }
        //this cant be best practice; also add compression? !fix
        if (fileData.size > 3000000) {
            alert('file size too large');
            return;
        }
        
        //TODO: 
        
        const dateInput = document.getElementById('picdate') as HTMLInputElement;
        const content = document.getElementById('content') as HTMLInputElement;

        
        //this is a stupid file naming system - need to change this
        const filename = currentDate + '_' + fileData.name;
        await Storage.put(filename, fileData, {level: 'public'});
        const newPost = {location: selectedLocation, date: (dateInput.value), content: content.value, image: filename, userID: user.username, type: "Post"};
        
        try {
            const result = await API.graphql({ query: createPost, variables: { input: newPost }, authMode: 'AMAZON_COGNITO_USER_POOLS' });
            setFileStatus(true);
            setSelectedLocation('');
            setSelectedLocationResult(false);
          //reset form
            resetFormHandler(event);
        } catch(err) {
            console.log(err)
        };
    }

    async function searchLocation () {
        const searchInput = document.getElementById('searchfield') as HTMLInputElement;
        const searchOptions = {maxResults: 10, language: 'en'}
            const results = await Geo.searchByText(searchInput.value, searchOptions);
            if (results.length > 0) {
                setLocationSearchResult(true);
                setLocationSearch(results);
            }
            if (results.length <= 0) {
                setLocationSearch([]);
                setLocationSearchResult(false);
            }   
    }

    function selectLocation(location: string) {
        setSelectedLocation(location);
        setLocationSearchResult(false)
        setSelectedLocationResult(true);
    }

    function removeLocation() {
        setSelectedLocation(null);
        setSelectedLocationResult(false);
    }

    function dismissAlert() {
        setFileStatus(false);
        setLocationSearchResult(false);
    }
    
    return (
    <>
    <div id="newpost">
        <div id="formreset">
            <GrPowerReset onClick={(e) => resetFormHandler(e)}/>
        </div>
        <div id="form">
        <h3>ʕ •ᴥ•ʔ ☆<br></br>New Post</h3>
        <label>Location of Photo</label>
            <SearchField label="Location Search" id="searchfield" placeholder="Search here..."
            onSubmit={searchLocation}/>
            <div>
            {(locationSearchResult) ?
            <div>
                {locationSearch.map((locationResult) => (
                    <div className="locationsearchresults" key={locationResult.label}>
                    <ul>
                        <li>{locationResult.label}</li>
                    </ul>
                    <AiOutlineCheckCircle onClick={() => selectLocation(locationResult.label)}/>
                    </div>
                ))}
            </div>
                : 
                <div className="locationsearchresults"><h5>No results</h5></div>
            }
            {selectedLocationResult ?
            <div id="selectedlocation">
                <h5>Location&ensp;|</h5>
                <p>&ensp;{selectedLocation}</p>
                <TiDeleteOutline onClick={removeLocation}/>
            </div>
            : ''}
            </div>
        <form onSubmit={savePost}>
            <label htmlFor="picdate">Date of Photo</label>
            <input id="picdate" name="date" type="date" max={currentDate} onClick={dismissAlert}/>
            <label id="contentlabel" htmlFor="content">Background Story</label>
            <TextAreaField label="" size="large" autoComplete="off" id="content" name="content" data-type="text" placeholder="Enter Text Here" onClick={dismissAlert}/>
            <input id="fileupload" name="fileupload" type="file" accept="image/*" onChange={(e) => imageOnChangeHandler(e)}></input>
            <div id="formimage">
                <img id="frame" alt="" src={currentImage} data-name="frame"/>
            </div>
            <button id="submitbutton" data-type="submit-form-button" type="submit"><BsUpload/></button>
        </form>
    </div>
        <div id="uploadalert">
            {fileStatus ? <Alert variation="success" isDismissible={true}>File Uploaded</Alert>: ''}
        </div>
        </div>
    </>
    )
}