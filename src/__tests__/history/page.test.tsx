import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import History from '../../app/history/page';
import '@testing-library/jest-dom';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

const mockLocalStorage = (function () {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

describe('History Component', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    pushMock.mockClear();
  });

  it('displays message when there is no history', () => {
    render(<History />);

    expect(
      screen.queryByText(
        (content, element) =>
          element.tagName.toLowerCase() === 'h2' &&
          content.includes('You haven’t executed any requests yet'),
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        (content, element) =>
          element.tagName.toLowerCase() === 'p' &&
          content.includes('It’s empty here. Try:'),
      ),
    ).toBeInTheDocument();

    expect(screen.queryByText('REST Client')).toBeInTheDocument();
    expect(screen.queryByText('GraphiQL Client')).toBeInTheDocument();
  });

  it('displays history items and handles click events', async () => {
    const historyData = [
      {
        type: 'REST',
        method: 'GET',
        endpoint: '/api/test',
        timestamp: '2024-01-01T00:00:00Z',
      },
      {
        type: 'GRAPHQL',
        endpoint: '/graphql/test',
        timestamp: '2024-01-02T00:00:00Z',
      },
    ];
    mockLocalStorage.setItem('requestHistory', JSON.stringify(historyData));

    render(<History />);

    expect(screen.getByText('[GET] /api/test')).toBeInTheDocument();
    expect(screen.getByText('[GRAPHQL] /graphql/test')).toBeInTheDocument();

    const restButton = screen.getByText('[GET] /api/test');
    fireEvent.click(restButton);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith(
        '/rest-client?timestamp=2024-01-01T00%3A00%3A00Z',
      );
    });

    const graphqlButton = screen.getByText('[GRAPHQL] /graphql/test');
    fireEvent.click(graphqlButton);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith(
        '/graphiql?timestamp=2024-01-02T00%3A00%3A00Z',
      );
    });
  });
});
