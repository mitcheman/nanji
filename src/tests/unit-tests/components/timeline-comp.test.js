import { Timeline } from '../../../components/timeline-comp';
import { render, screen } from '@testing-library/react';
import { user, allPosts } from './component-mocks';

describe('Timeline Component Tests', () => {
  it('should render a timeline correctly give an array of posts', () => {
    render(
      <Timeline
        user={user}
        allPosts={allPosts}
        setPosts={() => {}}
        token={undefined}
        setToken={() => {}}
      />,
    );

    const timelineTitle = screen.getByText('Timeline');
    expect(timelineTitle).toBeInTheDocument();

    const timelineDates = screen.getAllByTestId('timeline-date');
    expect(timelineDates.length).toBe(3);
    expect(timelineDates[0]).toHaveTextContent('June 2022');
  });
});
