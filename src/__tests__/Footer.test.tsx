import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../components/Footer';

describe('Footer Component', () => {
  test('renders GitHub links', () => {
    render(<Footer />);
    const githubLinks = [
      'https://github.com/arastepa',
      'https://github.com/guranda26',
      'https://github.com/PaytsarHarutyunyan',
    ];

    githubLinks.forEach((link) => {
      const githubLinkElements = screen.getAllByRole('link', {
        name: /git icon/i,
      });
      const githubLinkElement = githubLinkElements.find(
        (el) => el.getAttribute('href') === link,
      );

      expect(githubLinkElement).toBeInTheDocument();
    });
  });

  test('renders current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(currentYear)).toBeInTheDocument();
  });

  test('renders RS School logo link', () => {
    render(<Footer />);
    const rsSchoolLink = screen.getByRole('link', { name: /logo rs/i });
    expect(rsSchoolLink).toBeInTheDocument();
    expect(rsSchoolLink).toHaveAttribute('href', 'https://rs.school/');
  });
});
