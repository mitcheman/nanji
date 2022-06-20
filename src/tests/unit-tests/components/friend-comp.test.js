import { Friend } from '../../../components/friend-comp';
import { render, screen } from '@testing-library/react';

it("should render a friend's info", async () => {
  const friendInfo = {
    id: 'eifefiief-ii32839240-2nefn2n4in29f',
    given_name: 'Jhon',
    family_name: 'Doe',
    preferred_username: 'Jhonny',
  };

  render(<Friend friend={friendInfo} />);

  const fullName = screen.getByText(/Jhon Doe/);
  const preferredUsername = screen.getByText(/Jhonny/);

  expect(fullName).toHaveTextContent('Name | Jhon Doe');
  expect(preferredUsername).toHaveTextContent('Username | Jhonny');
});
