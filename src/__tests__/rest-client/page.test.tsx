import { render, screen, fireEvent } from '@testing-library/react';
import RestClient from '../../app/rest-client/page';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(() => '/rest-client'),
}));

describe('RestClient', () => {
  const mockPush = vi.fn();
  const mockIsAuthenticated = true;

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: mockIsAuthenticated,
    });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with initial state', () => {
    render(<RestClient />);

    expect(screen.getByText(/Headers/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Endpoint URL/i)).toBeInTheDocument();
    expect(screen.getByText(/Send Request/i)).toBeInTheDocument();
  });

  it('changes the HTTP method', () => {
    render(<RestClient />);

    const methodSelect = screen.getByDisplayValue('GET');
    fireEvent.change(methodSelect, { target: { value: 'POST' } });

    expect(methodSelect).toHaveValue('POST');
  });

  it('adds a header', () => {
    render(<RestClient />);

    const addHeaderButton = screen.getByText(/Add Header/i);
    fireEvent.click(addHeaderButton);

    const headerKeyInput = screen.getAllByPlaceholderText(/Header Key/i);
    const headerValueInput = screen.getAllByPlaceholderText(/Header Value/i);

    fireEvent.change(headerKeyInput[0], { target: { value: 'Authorization' } });
    fireEvent.change(headerValueInput[0], {
      target: { value: 'Bearer token' },
    });

    expect(headerKeyInput[0]).toHaveValue('Authorization');
    expect(headerValueInput[0]).toHaveValue('Bearer token');
  });

  it('handles request and constructs the URL correctly', async () => {
    render(<RestClient />);

    const endpointInput = screen.getByPlaceholderText(/Endpoint URL/i);
    fireEvent.change(endpointInput, { target: { value: '/api/test' } });

    const methodSelect = screen.getByDisplayValue('GET');
    fireEvent.change(methodSelect, { target: { value: 'GET' } });

    const sendRequestButton = screen.getByText(/Send Request/i);
    fireEvent.click(sendRequestButton);

    expect(mockPush).toHaveBeenCalledWith('/rest-client/GET/L2FwaS90ZXN0');
  });

  it('redirects to signin if not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });
    render(<RestClient />);

    expect(mockPush).toHaveBeenCalledWith('/signin');
  });
});
