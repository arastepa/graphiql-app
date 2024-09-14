import { render, screen, waitFor } from '@testing-library/react';
import { decode } from 'base64-url';
import GraphiQLClient from '@/app/graphiql/page';
import ResponseGraph from '@/app/graphiql/[method]/[...encoded]/page';
import '@testing-library/jest-dom';

vi.mock('base64-url', () => ({
  decode: vi.fn(),
}));

vi.mock('@/app/graphiql/page', () => ({
  __esModule: true,
  default: vi.fn(() => <div>GraphiQL Client</div>),
}));

vi.mock('@/components/ResponseSection', () => ({
  __esModule: true,
  default: vi.fn(({ responseCode, responseStatus, responseBody }) => (
    <div>
      <div>Response Code: {responseCode}</div>
      <div>Status: {responseStatus}</div>
      <div>Body: {JSON.stringify(responseBody)}</div>
    </div>
  )),
}));

describe('ResponseGraph component', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly and handles successful request', async () => {
    (decode as jest.Mock).mockImplementation((input) => {
      if (input === 'encoded-endpoint') return '/api/graphql';
      if (input === 'encoded-body')
        return JSON.stringify({ query: '{ test }' });
      if (input === 'header_Authorization') return 'Authorization';
      return input;
    });

    mockFetch.mockResolvedValueOnce({
      status: 200,
      statusText: 'OK',
      json: async () => ({ data: { message: 'Success' } }),
    });

    const params = {
      method: 'POST',
      encoded: ['encoded-endpoint', 'encoded-body'],
    };

    const searchParams = {
      header_Authorization: 'encoded-authorization',
    };

    render(
      await ResponseGraph({
        params,
        searchParams,
      }),
    );

    expect(GraphiQLClient).toHaveBeenCalledWith(
      { searchParams: undefined },
      {},
    );

    await waitFor(() => {
      expect(screen.getByText(/Response Code: 200/)).toBeInTheDocument();
      expect(screen.getByText(/Status: OK/)).toBeInTheDocument();
      expect(
        screen.getByText(/Body: {"data":{"message":"Success"}}/),
      ).toBeInTheDocument();
    });
  });

  it('handles failed request', async () => {
    (decode as jest.Mock).mockImplementation((input) => {
      if (input === 'encoded-endpoint') return '/api/graphql';
      if (input === 'encoded-body')
        return JSON.stringify({ query: '{ test }' });
      if (input === 'header_Authorization') return 'Authorization';
      return input;
    });

    mockFetch.mockRejectedValueOnce(new Error('Request failed'));

    const params = {
      method: 'POST',
      encoded: ['encoded-endpoint', 'encoded-body'],
    };

    const searchParams = {
      header_Authorization: 'encoded-authorization',
    };

    render(
      await ResponseGraph({
        params,
        searchParams,
      }),
    );

    await waitFor(() => {
      expect(screen.getByText(/Response Code: 500/)).toBeInTheDocument();
      expect(
        screen.getByText(/Status: Internal Server Error/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Body: {"error":"Request failed"}/),
      ).toBeInTheDocument();
    });
  });
});
