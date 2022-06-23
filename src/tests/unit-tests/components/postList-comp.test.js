import './mockJsdom';
import { PostList } from '../../../components/postList-comp';
import { render, screen } from '@testing-library/react';
import { posts } from './component-mocks';

describe('postList Tests', () => {
  it('should render a list of posts given an array of posts', () => {
    render(
      <PostList
        currentFriend={undefined}
        posts={posts}
        setPosts={() => {}}
        setAllPosts={() => {}}
      />,
    );

    const postsDisplayed = screen.getAllByTestId('post');
    expect(postsDisplayed.length).toBe(7);
  });
});
