import { Storage, API, Geo } from 'aws-amplify';
//@ts-ignore
import { createPost } from '../graphql/mutations';
import React, { useState } from 'react';
import { TextAreaField, SearchField } from '@aws-amplify/ui-react';
import { BsUpload } from 'react-icons/bs';
import { TiDeleteOutline } from 'react-icons/ti';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { GrPowerReset } from 'react-icons/gr';
import { Alert } from '@aws-amplify/ui-react';
import '../css/form.css';
import { CognitoUserType } from '../Shared/Types';
import { Place } from '@aws-amplify/geo/lib-esm/types/Geo';

// const createPost = require('../graphql/mutations')
const moment = require('moment');

// made a custom interface to match the form input types for a new post
interface HTMLInputEvent extends Event {
  content: HTMLInputElement;
  fileupload: HTMLInputElement;
  date: HTMLInputElement;
}

const currentDate = moment(new Date()).format('YYYY-MM-DD');

export const NewPost: React.FC<{ user: CognitoUserType }> = ({ user }) => {
  const [fileData, setFileData] = useState<File>();
  const [fileStatus, setFileStatus] = useState(false);

  const [currentImage, setCurrentImage] = useState('');

  //search for location
  const [locationSearch, setLocationSearch] = useState<Place[]>([]);
  const [locationSearchResult, setLocationSearchResult] = useState(false); // unecessary variable

  //select location
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedLocationResult, setSelectedLocationResult] = useState(false); // unecessary variable

  function imageOnChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.files && setFileData(e.target.files[0]);
    e.target.files && setCurrentImage(URL.createObjectURL(e.target.files[0]));
  }

  function resetFormHandler() {
    (document.getElementById('content') as HTMLInputElement).value = '';
    (document.getElementById('picdate') as HTMLInputElement).value = '';
    (document.getElementById('searchfield') as HTMLInputElement).value = '';
    (document.getElementById('fileupload') as HTMLInputElement).value = '';
    setFileData(undefined);
    setCurrentImage('');
    setLocationSearch([]);
    setLocationSearchResult(false);
    setSelectedLocationResult(false);
    setSelectedLocation('');
  }

  async function savePost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      (event.target as unknown as HTMLInputEvent).content.value.length === 0 ||
      (event.target as unknown as HTMLInputEvent).fileupload.value.length === 0
    ) {
      alert('please input all required data');
      return;
    }
    if (!fileData) return;
    //this cant be best practice; also add compression? !fix
    if (fileData.size > 3000000) {
      alert('file size too large');
      return;
    }
    //this is a stupid file naming system - need to change this
    const filename = currentDate + '_' + fileData.name;
    await Storage.put(filename, fileData, { level: 'public' });
    const newPost = {
      location: selectedLocation,
      date: (event.target as unknown as HTMLInputEvent).date.value,
      content: (event.target as unknown as HTMLInputEvent).content.value,
      image: filename,
      userID: user.username,
      type: 'Post',
    };
    await API.graphql({
      query: createPost,
      variables: { input: newPost },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    });
    setFileStatus(true);
    setSelectedLocation('');
    setSelectedLocationResult(false);

    //reset form
    resetFormHandler();
  }

  async function searchLocation(event: string) {
    const searchOptions = { maxResults: 10, language: 'en' };
    const results = await Geo.searchByText(event, searchOptions);
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
    setLocationSearchResult(false);
    setSelectedLocationResult(true);
  }

  function removeLocation() {
    setSelectedLocation('');
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
          <GrPowerReset onClick={resetFormHandler} />
        </div>
        <div id="form">
          <h3>
            ʕ •ᴥ•ʔ ☆<br></br>New Post
          </h3>
          <label>Location of Photo</label>
          <SearchField
            label="Location Search"
            id="searchfield"
            placeholder="Search here..."
            onSubmit={searchLocation}
          />
          <div>
            {locationSearchResult ? (
              <div>
                {locationSearch.map(locationResult => (
                  <div
                    className="locationsearchresults"
                    key={locationResult.label}>
                    <ul>
                      <li>{locationResult.label}</li>
                    </ul>
                    <AiOutlineCheckCircle
                      onClick={() =>
                        locationResult.label &&
                        selectLocation(locationResult.label)
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="locationsearchresults">
                <h5>No results</h5>
              </div>
            )}
            {selectedLocationResult ? (
              <div id="selectedlocation">
                <h5>Location&ensp;|</h5>
                <p>
                  &ensp;
                  {selectedLocation}
                </p>
                <TiDeleteOutline onClick={removeLocation} />
              </div>
            ) : (
              ''
            )}
          </div>
          <form onSubmit={e => savePost(e)}>
            <label htmlFor="picdate">Date of Photo</label>
            <input
              id="picdate"
              name="date"
              type="date"
              max={currentDate}
              onClick={dismissAlert}
            />
            <label id="contentlabel" htmlFor="content">
              Background Story
            </label>
            <TextAreaField
              size="large"
              autoComplete="off"
              id="content"
              name="content"
              placeholder="Enter Text Here"
              onClick={dismissAlert}
              label={'Background Story'}
              labelHidden={true}
            />
            <input
              id="fileupload"
              name="fileupload"
              type="file"
              accept="image/*"
              onChange={e => imageOnChangeHandler(e)}></input>
            <div id="formimage">
              <img id="frame" alt="" src={currentImage} />
              {/* Took out name prope, possible  break here: 'name = "frame"' */}
            </div>
            <button id="submitbutton" type="submit">
              <BsUpload />
            </button>
          </form>
        </div>
        <div id="uploadalert">
          {fileStatus ? (
            <Alert variation="success" isDismissible={true}>
              File Uploaded
            </Alert>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};
