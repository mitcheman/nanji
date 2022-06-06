
import '../css/header.css'
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";


export function Header({signOut, user}) {
    return (
        <div className='header'>
            <a id="nanji" href='/'>Nanji</a>
        <Router>
        <nav>
        <h3>{user.username}</h3>
            <div id="nav-buttons">
                <a href='/newPost'>New Post</a>
                <button onClick={signOut}>Sign out</button>
            </div>
        </nav>
        </Router>
        </div>
    )
}

