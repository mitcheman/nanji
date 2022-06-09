import { withAuthenticator } from '@aws-amplify/ui-react';
import './index.css';
import '@aws-amplify/ui-react/styles.css';
import { Header } from './components/header-comp';
import { NewPost } from './pages/newPost-page';
import { Dashboard } from './pages/dashboard-page';
import { Account } from './pages/account-page';
import { Friends } from './pages/friends-page';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App({ signOut, user }) {
  return (
    <>
      <div>
        <header></header>
        <Header signOut={signOut} user={user} />
      </div>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/Friends' element={<Friends user={user} />} />
          <Route path='/NewPost' element={<NewPost user={user} />} />
          <Route
            path='/Account'
            element={<Account user={user} signOut={signOut} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default withAuthenticator(App, console.log('banana'));
