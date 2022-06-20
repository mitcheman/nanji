import { Header } from '../../../components/header-comp';
import { render, screen } from '@testing-library/react';
import { Auth } from 'aws-amplify';

it('should render a header for users own dashboard if on computer', () => {
  const currentFriend = undefined;
  const user = {
    attributes: {
      given_name: 'Jhon',
      family_name: 'Doe',
    },
  };
  render(
    <Header user={user} currentFriend={currentFriend} signOut={Auth.signOut} />,
  );

  const nanjiText = screen.getByText('Nanji');
  expect(nanjiText).toBeInTheDocument();

  const usersFullName = screen.getByText('Jhon Doe');
  expect(usersFullName).toBeInTheDocument();

  const friends = screen.getByTestId('friends');
  expect(friends).toBeInTheDocument();
  const newPost = screen.getByTestId('newPost');
  expect(newPost).toBeInTheDocument();
  const account = screen.getByTestId('account');
  expect(account).toBeInTheDocument();
  const signOut = screen.getByTestId('signOut');
  expect(signOut).toBeInTheDocument();
});

it('should display a header for friends when in their dashboard', () => {
  const currentFriend = {
    given_name: 'Captain',
    family_name: 'Jack Sparrow',
  };
  const user = {
    attributes: {
      given_name: 'Jhon',
      family_name: 'Doe',
    },
  };

  render(
    <Header user={user} currentFriend={currentFriend} signOut={Auth.signOut} />,
  );

  const friendsFullName = screen.getByText('Captain Jack Sparrow');
  expect(friendsFullName).toBeInTheDocument();
});
