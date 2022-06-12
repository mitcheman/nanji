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

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App({ signOut, user }) {
  const [currentFriend, setCurrentFriend] = useState();

  return (
    <>
      <div>
        <Header signOut={signOut} user={user} currentFriend={currentFriend} />
      </div>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard user={user} />} />
          <Route path='/Friends' element={<Friends user={user} />} />
          <Route path='/NewPost' element={<NewPost user={user} />} />
          <Route
            path='/user/:id'
            element={
              <UserFriend
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
