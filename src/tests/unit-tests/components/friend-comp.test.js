import { Friend } from '../../../components/friend-comp';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { friends } from './component-mocks';

it("should render a friend's info", () => {
  render(<Friend friend={friends[0]} />);

  const fullName = screen.getByText(/Jhon Doe/);
  const preferredUsername = screen.getByText(/Jhonny/);

  expect(fullName).toHaveTextContent('Name | Jhon Doe');
  expect(preferredUsername).toHaveTextContent('Username | Jhonny');
});

// Test not working, have to revisit!!
// it('should redirect to friends dshboard when you click on it', async () => {
//   const friendInfo = {
//     id: 'eifefiief-ii32839240-2nefn2n4in29f',
//     given_name: 'Jhon',
//     family_name: 'Doe',
//     preferred_username: 'Jhonny',
//   };

//   const history = createMemoryHistory();

//   render(
//     <MemoryRouter histroy={history}>
//       <Friend friend={friendInfo} />
//     </MemoryRouter>,
//   );

//   const friendsLink = screen.getByTestId('friendalink');

//   console.log(friendsLink, 'friendsLink');

//   await userEvent.click(friendsLink);

//   console.log(history.location.pathname);

//   expect(history.location.pathname).toBe(
//     '/user/eifefiief-ii32839240-2nefn2n4in29f',
//   );

//   // expect(screen.getByText('Current Profile')).toBeInTheDocument();
// });
