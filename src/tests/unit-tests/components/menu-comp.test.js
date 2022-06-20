import { Menu } from '../../../components/menu-comp';
import { render, screen } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import userEvent from '@testing-library/user-event';
import { friends, user, setFriends, posts, allPosts } from './component-mocks';

jest.mock('../../../utils/friendRequests', () => ({
  getFriends: async () => {},
}));

it('should render a menu with the users timeline and friends when on computer', () => {
  render(
    <Menu
      user={user}
      friends={friends}
      setFriends={setFriends}
      signOut={Auth.signOut}
      allPosts={allPosts}
      posts={posts}
      setPosts={() => {}}
      token={undefined}
      setToken={() => {}}
    />,
  );

  const dates = screen.getAllByText(
    /(\b\d{1,2}\D{0,3})?\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)\D?(\d{1,2}\D?)?\D?((19[7-9]\d|20\d{2})|\d{2})/,
  );
  expect(dates.length).toBe(3);
  expect(dates[0]).toHaveTextContent('June 2022');
});

it('should toggle between timeline and friends when clicked on their particular buttons', async () => {
  render(
    <Menu
      user={user}
      friends={friends}
      setFriends={setFriends}
      signOut={Auth.signOut}
      allPosts={allPosts}
      posts={posts}
      setPosts={() => {}}
      token={undefined}
      setToken={() => {}}
    />,
  );

  const selectFriendsDisplay = screen.getByTestId('toggleMenuToFriends');
  await userEvent.click(selectFriendsDisplay);
  const friendsMenuTtile = screen.getByText('Friends and Family');
  expect(friendsMenuTtile).toBeInTheDocument();

  const selectTimelineDisplay = screen.getByTestId('toggleMenuToTimeline');
  await userEvent.click(selectTimelineDisplay);
  const timelineMenuTitle = screen.getByText('Timeline');
  expect(timelineMenuTitle).toBeInTheDocument();
});
