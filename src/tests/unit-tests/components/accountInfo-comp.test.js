import { AccountInfo } from '../../../components/accountInfo-comp';
import { render, screen } from '@testing-library/react';

it('should render the accounInfo component with the right information', async () => {
  const setUser = {
    attributes: {
      given_name: 'John',
      family_name: 'Doe',
      preferred_username: 'Johnny',
      email: 'john.doe@email.com',
    },
  };
  render(<AccountInfo user={setUser} />);

  const givenName = screen.getByText('John');
  const familyName = screen.getByText(/Doe/);
  const preferredUsername = screen.getByText(/Johnny/);
  const email = screen.getByText(/john.doe@email.com/);

  expect(givenName).toHaveTextContent('John');
  expect(familyName).toHaveTextContent('Doe');
  expect(preferredUsername).toHaveTextContent('Johnny');
  expect(email).toHaveTextContent('john.doe@email.com');
});
