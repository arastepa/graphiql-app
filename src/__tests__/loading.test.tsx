import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

import Loading from '../app/loading';

describe('Loading Component', () => {
  it('renders the loader image', () => {
    render(<Loading />);
    const loaderImage = screen.getByAltText('loader');
    expect(loaderImage).toBeInTheDocument();
    expect(loaderImage).toHaveAttribute('src');
  });

  it('has the correct loader class', () => {
    render(<Loading />);
    const loaderDiv = screen.getByRole('img');
    expect(loaderDiv.closest('div')).toHaveClass('_loader_87501d');
  });
});
