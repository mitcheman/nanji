import { Post } from '../../../components/post-comp';
import { render, screen } from '@testing-library/react';
import { posts } from './component-mocks';
import moment from 'moment';

it('should render a post', () => {
  render(
    <Post
      post={posts[0]}
      currentFriend={undefined}
      setPosts={() => {}}
      setDeleted={() => {}}
      setAllPosts={() => {}}
    />,
  );

  const date = screen.getByTestId('date');
  expect(date).toBeInTheDocument();
  expect(date).toHaveTextContent(
    `June 18th 2022 - ${moment(posts[0].date).fromNow()}`,
  );

  const image = screen.getByAltText('Post');
  expect(image).toBeInTheDocument();
  expect(image.src).toContain(posts[0].s3ImageUrl);

  const content = screen.getByTestId('content');
  expect(content).toBeInTheDocument();
  expect(content).toHaveTextContent(posts[0].content);

  const createdDate = screen.getByTestId('creation-date');
  expect(createdDate).toBeInTheDocument();
  expect(createdDate).toHaveTextContent(
    moment(posts[0].createdAt).format('MMMM Do YYYY'),
  );
});
