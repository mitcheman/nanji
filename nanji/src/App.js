import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Header } from './components/header-comp';
import { NewPost } from './pages/newPost-page';
import { Dashboard } from './pages/dashboard-page';

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
          <Route path='/NewPost' element={<NewPost user={user} />} />
        </Routes>
      </Router>
    </>
  );
}

export default withAuthenticator(App);
