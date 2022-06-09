
import '../css/header.css'
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import { MdOutlineAddPhotoAlternate, MdOutlineLogout } from 'react-icons/md';
import { Auth } from 'aws-amplify';


export function Header({signOut, user}) {

    const name = user.attributes.given_name + ' ' + user.attributes.family_name

    return (
        <div className='header'>
            <a id="nanji" href='/'>Nanji</a>
        <Router>
        <nav>
        <h3>{name}</h3>
            <div id="nav-buttons">
                <a href='/newPost'><MdOutlineAddPhotoAlternate /></a>
                <button onClick={signOut}><MdOutlineLogout /></button>
            </div>
        </nav>
        </Router>
        </div>
    )
}

