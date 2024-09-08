'use client'; // Ensure this is included for client components

import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import UserSection from '../components/UserSection';
import '@testing-library/jest-dom';

describe('UserSection', () => {
  it('renders the component correctly', () => {
    const username = 'John Doe';
    render(<UserSection username={username} />);

    expect(screen.getByText(/Welcome Back,/)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();

    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('GraphiQL Client')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
  });
});
