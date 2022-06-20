import { FriendsList } from '../../../components/friendsList-comp';
import { render, screen } from '@testing-library/react';
// import { getFriends } from '../utils/friendRequests';

jest.mock('../../../utils/friendRequests', () => ({
  getFriends: async () => {},
}));

it('should render a list of friends components, given an array of friends', async () => {
  let friends = [
    {
      id: 'eifefiief-ii32839240-2nefn2n4in29f',
      given_name: 'Jhon',
      family_name: 'Doe',
      preferred_username: 'Jhonny',
    },
    {
      id: 'ifeasifn-ifeifnsef5e-aiefnenfsifef',
      given_name: 'Vito',
      family_name: 'Corleone',
      preferred_username: 'Padrino',
    },
    {
      id: 'eamcoñe-ekinenkanf-eifnienfiafaef',
      given_name: 'Citizen',
      family_name: 'Kane',
      preferred_username: 'Rosebud',
    },
  ];
  const user = {
    username: 'einainfienfineanifanefinaefna',
  };
  const setFriends = data => (friends = data);

  render(<FriendsList user={user} friends={friends} setFriends={setFriends} />);

  const friendJhon = screen.getByText('Name | Jhon Doe');
  const friendVito = screen.getByText('Name | Vito Corleone');
  const friendKane = screen.getByText('Name | Citizen Kane');

  expect(friendJhon).toBeDefined();
  expect(friendVito).toBeDefined();
  expect(friendKane).toBeDefined();
});
