import { FriendsList } from '../../../components/friendsList-comp';
import { render, screen } from '@testing-library/react';
import { friends, user, setFriends } from './component-mocks';
// import { getFriends } from '../utils/friendRequests';

jest.mock('../../../utils/friendRequests', () => ({
  getFriends: async () => {},
}));

it('should render a list of friends components, given an array of friends', async () => {
  render(<FriendsList user={user} friends={friends} setFriends={setFriends} />);

  const friendJhon = screen.getByText('Name | Jhon Doe');
  const friendVito = screen.getByText('Name | Vito Corleone');
  const friendKane = screen.getByText('Name | Citizen Kane');

  expect(friendJhon).toBeDefined();
  expect(friendVito).toBeDefined();
  expect(friendKane).toBeDefined();
});
