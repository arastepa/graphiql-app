import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from '../app/not-found';
import { describe, expect, it } from 'vitest';

describe('NotFound Component', () => {
  it('renders the NotFound component correctly', () => {
    render(<NotFound />);

    const titleElement = screen.getByText(/Sorry, Page Not Found/i);
    expect(titleElement).toBeInTheDocument();

    const imageElement = screen.getByAltText(/not found image/i);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      'src',
      expect.stringContaining('not-found.svg'),
    );

    const paragraphElement = screen.getByText(
      /Could not found requested resource/i,
    );
    expect(paragraphElement).toBeInTheDocument();
  });
});
