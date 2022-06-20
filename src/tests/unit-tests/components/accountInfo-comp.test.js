import { AccountInfo } from '../../../components/accountInfo-comp';
import { render, screen } from '@testing-library/react';
import { user } from './component-mocks';

it('should render the accounInfo component with the right information', async () => {
  render(<AccountInfo user={user} />);

  const givenName = screen.getByText('John');
  const familyName = screen.getByText(/Doe/);
  const preferredUsername = screen.getByText(/Johnny/);
  const email = screen.getByText(/john.doe@email.com/);

  expect(givenName).toHaveTextContent('John');
  expect(familyName).toHaveTextContent('Doe');
  expect(preferredUsername).toHaveTextContent('Johnny');
  expect(email).toHaveTextContent('john.doe@email.com');
});
