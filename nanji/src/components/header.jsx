import '../css/header.css'
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  BrowserRouter
} from "react-router-dom";


export function Header({signOut, user}) {
    return (
        <div class="header">
            <a href='/'>Nanji</a>
        <h1>Hello {user.username}</h1>
        <Router>
        <nav>
            <a href='/newPost'>New Post</a>
            <button onClick={signOut}>Sign out</button>
        </nav>
        </Router>
        </div>
    )
}

