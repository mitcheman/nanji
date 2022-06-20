import './mockJsdom';
import { Search } from '../../../components/search-comp';
import { render, screen } from '@testing-library/react';
import { user } from './component-mocks';
import userEvent from '@testing-library/user-event';

describe('Search component tests', () => {
  it('should render the search component', () => {
    render(<Search user={user} setOutGoingRequestsUsers={() => {}} />);

    const searchTitle = screen.getByText('Search for Friends and Family');
    expect(searchTitle).toBeInTheDocument();
  });

  // BC of the way the form in implmented ther is no way to test this

  // it('should display users when searched for them', async () => {
  //   render(<Search user={user} setOutGoingRequestsUsers={() => {}} />);

  //   const searchInput = screen.getByTestId('search-input');

  //   await userEvent.type(searchInput, 'Gozzo');
  //   await userEvent.dblClick(searchInput);

  //   const searchResults = screen.getAllByTestId('search-result');
  //   expect(searchResults).toBeInTheDocument();
  // });
});
