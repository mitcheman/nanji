
import '../css/header.css'
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import { MdOutlineAddPhotoAlternate, MdOutlineLogout } from 'react-icons/md';
import { BsPersonLinesFill } from 'react-icons/bs'

export function Header({signOut, user}) {

    const name = user.attributes.given_name + ' ' + user.attributes.family_name

    return (
        <div className='header'>
            <a id="nanji" href='/'>Nanji</a>
        <Router>
        <nav>
        <a id="username" href='/Account'>{name}</a>
            <div id="nav-buttons">
                <a href='/Friends'><BsPersonLinesFill /></a>
                <a href='/newPost'><MdOutlineAddPhotoAlternate /></a>
                <button onClick={signOut}><MdOutlineLogout /></button>
            </div>
        </nav>
        </Router>
        </div>
    )
}

