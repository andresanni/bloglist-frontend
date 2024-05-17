import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import { beforeEach } from 'vitest';

describe('<Blog />', () => {
  let mockBlog;
  let mockUser;
  let mockHandleIncrementLikes;
  let mockHandleDelete;
  let container;

  beforeEach(() => {
    mockBlog = {
      title: 'Third post by Rafita',
      author: {
        username: 'rafita',
        id: '663d0c2e6311aad75b05654f',
      },
      url: 'http://pepeito',
      likes: 364,
      id: '663d73c6079c8364d7addc68',
    };
    mockUser = {
      token: '...',
      username: 'andres',
      id: '663d0c466311aad75b056551',
    };

    mockHandleDelete = vi.fn();
    mockHandleIncrementLikes = vi.fn();

    container = render(
      <Blog
        user={mockUser}
        blog={mockBlog}
        handleDelete={mockHandleDelete}
        handleIncrementLikes={mockHandleIncrementLikes}
      />
    ).container;
  });

  test('shows title and author, but not URL and likes in initial list', () => {
    const titleElement = screen.getByText(mockBlog.title);
    const authorElement = screen.getByText(mockBlog.author.username);

    const URLElement = screen.queryByText(mockBlog.url);
    const likesElement = screen.queryByText(mockBlog.likes);

    expect(titleElement).toBeDefined();
    expect(authorElement).toBeDefined();
    expect(URLElement).toBeNull();
    expect(likesElement).toBeNull();
  });

  test('URL and likes are shown once view button is clicked', async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText('view');
    await user.click(viewButton);

    const URLElement = screen.queryByText(mockBlog.url);
    const likesElement = screen.queryByText(mockBlog.likes);

    expect(URLElement).toBeDefined();
    expect(likesElement).toBeDefined();
  });

  test('increment likes function is called many times when pressing like button', async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText('view');
    await user.click(viewButton);

    const likeButton = screen.getByText('like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandleIncrementLikes.mock.calls).toHaveLength(2);
  });
});
