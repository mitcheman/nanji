import { withAuthenticator } from '@aws-amplify/ui-react';
import './index.css';
import '@aws-amplify/ui-react/styles.css';
import { Header } from './components/header-comp';
import { NewPost } from './pages/newPost-page';
import { Dashboard } from './pages/dashboard-page';
import { Account } from './pages/account-page';
import { Friends } from './pages/friends-page';
import { UserFriend } from './pages/userFriend-page';
import { useState } from 'react';

// this is the legacy branch

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App({ signOut, user }) {
  const [friends, setFriends] = useState([]);
  const [currentFriend, setCurrentFriend] = useState();

  return (
    <>
      <Header signOut={signOut} user={user} currentFriend={currentFriend} />
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <Dashboard
                user={user}
                signout={signOut}
                friends={friends}
                setFriends={setFriends}
              />
            }
          />
          <Route
            path='/Friends'
            element={
              <Friends user={user} friends={friends} setFriends={setFriends} />
            }
          />
          <Route path='/NewPost' element={<NewPost user={user} />} />
          <Route
            path='/user/:id'
            element={
              <UserFriend
                user={user}
                friends={friends}
                setFriends={setFriends}
                currentFriend={currentFriend}
                setCurrentFriend={setCurrentFriend}
              />
            }
          />
          <Route
            path='/Account'
            element={<Account user={user} signOut={signOut} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default withAuthenticator(App);
