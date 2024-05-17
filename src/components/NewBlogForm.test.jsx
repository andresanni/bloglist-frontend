import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewBlogForm from './NewBlogForm';

describe('<NewBlogForm />', () => {
  let container;
  let mockOnSubmit;
  beforeEach(() => {
    mockOnSubmit = vi.fn();
    container = render(<NewBlogForm onSubmit={mockOnSubmit} />).container;
  });

  test('onSubmit function is called with correct args when creating a blog', async () => {
    const user = userEvent.setup();

    const titleInput = screen.getByTestId('title-input');
    const urlInput = screen.getByTestId('url-input');
    const submitButton = screen.getByText('create');

    await user.type(titleInput, 'My Title');
    await user.type(urlInput, 'My Url');

    await user.click(submitButton);

    expect(mockOnSubmit.mock.calls).toHaveLength(1);
    expect(mockOnSubmit.mock.calls[0][0]).toStrictEqual({
      url: 'My Url',
      title: 'My Title',
    });
  });
});
