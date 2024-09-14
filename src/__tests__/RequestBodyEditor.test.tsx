import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import RequestBodyEditor from '../components/RequestBodyEditor';
import '@testing-library/jest-dom';
describe('RequestBodyEditor', () => {
  it('renders correctly and switches between modes', () => {
    const mockOnBodyChange = vi.fn();
    render(
      <RequestBodyEditor onBodyChange={mockOnBodyChange} initialBody="" />,
    );

    expect(screen.getByRole('combobox')).toHaveValue('json');
    expect(
      screen.queryByPlaceholderText(/Enter plain text request body here/i),
    ).not.toBeInTheDocument();

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'text' },
    });

    expect(
      screen.getByPlaceholderText(/Enter plain text request body here/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Request Body:/i)).not.toBeInTheDocument();
  });

  it('calls onBodyChange with text data when text is updated', () => {
    const mockOnBodyChange = vi.fn();
    render(
      <RequestBodyEditor onBodyChange={mockOnBodyChange} initialBody="" />,
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'text' },
    });

    const textarea = screen.getByPlaceholderText(
      /Enter plain text request body here/i,
    );
    fireEvent.change(textarea, {
      target: { value: 'This is a plain text body' },
    });

    expect(mockOnBodyChange).toHaveBeenCalledWith('This is a plain text body');
  });
});
