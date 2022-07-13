import { Authenticator, Image, View, Text } from '@aws-amplify/ui-react';
import './index.css';
import '@aws-amplify/ui-react/styles.css';
import { Header } from './components/header-comp';
import { NewPost } from './pages/newPost-page';
import { Dashboard } from './pages/dashboard-page';
import { Account } from './pages/account-page';
import { Friends } from './pages/friends-page';
import { UserFriend } from './pages/userFriend-page';
import { useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App({ signOut, user }) {
  const [friends, setFriends] = useState([]);
  const [currentFriend, setCurrentFriend] = useState();

  const components = {
    Header() {
      return (
        <View textAlign='center' margin={30}>
          <Image alt='Nanji logo' src='/logo_transparent.png' />
        </View>
      );
    },

    Footer() {
      return (
        <View textAlign='center' margin={10}>
          <a
            href='https://youtu.be/VP4_ufbt_Dg'
            style={{
              textDecoration: 'none',
              color: 'grey',
              padding: 10,
              borderRadius: 5,
              margin: 5,
            }}
          >
            Checkout the Beta video here
          </a>
        </View>
      );
    },
  };

  return (
    <>
      <Authenticator components={components}>
        {({ signOut, user }) => (
          <>
            <Header
              signOut={signOut}
              user={user}
              currentFriend={currentFriend}
            />
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
                    <Friends
                      user={user}
                      friends={friends}
                      setFriends={setFriends}
                    />
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
        )}
      </Authenticator>
    </>
  );
}

export default App;
