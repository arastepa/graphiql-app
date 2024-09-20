import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import { describe, it, expect, vi } from 'vitest';
import GraphiQLClient from '@/app/graphiql/page';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';
import { User } from 'firebase/auth';
import { FC, HTMLProps } from 'react';
import { ResponseProvider } from '@/context/ResponseContext';

interface CodeMirrorProps extends HTMLProps<HTMLDivElement> {
  'data-testid': string;
}

interface CodeMirrorModule {
  default: FC<CodeMirrorProps>;
}
vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@uiw/react-codemirror', async (importOriginal) => {
  const actual = (await importOriginal()) as CodeMirrorModule;
  return {
    ...actual,
    default: vi.fn(({ 'data-testid': testId }: { 'data-testid': string }) => (
      <div data-testid={testId} />
    )),
  };
});

const mockPush = vi.fn();
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('GraphiQLClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: undefined,
      signIn: function (): Promise<User> {
        throw new Error('Function not implemented.');
      },
      signUp: function (): Promise<User> {
        throw new Error('Function not implemented.');
      },
      logOut: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
    });

    render(
      <ResponseProvider>
        <GraphiQLClient searchParams={{ timestamp: '' }} />
      </ResponseProvider>,
    );

    expect(screen.getByLabelText(/Endpoint URL:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/SDL URL:/)).toBeInTheDocument();
    expect(screen.getByTestId('codemirror-query')).toBeInTheDocument();
    expect(screen.getByTestId('codemirror-variables')).toBeInTheDocument();
  });

  it('handles endpoint URL change', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: undefined,
      signIn: function (): Promise<User> {
        throw new Error('Function not implemented.');
      },
      signUp: function (): Promise<User> {
        throw new Error('Function not implemented.');
      },
      logOut: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
    });

    render(<GraphiQLClient searchParams={{ timestamp: '' }} />);

    act(() => {
      fireEvent.change(screen.getByLabelText(/Endpoint URL:/), {
        target: { value: 'http://new-endpoint.com' }, // Provide a full URL
      });
    });

    const sdlUrlInput = screen.getByLabelText(/SDL URL:/) as HTMLInputElement;

    await waitFor(() => {
      expect(sdlUrlInput.value).toBe('http://new-endpoint.com?sdl');
    });
  });

  it('adds a header and updates it', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: undefined,
      signIn: function (): Promise<User> {
        throw new Error('Function not implemented.');
      },
      signUp: function (): Promise<User> {
        throw new Error('Function not implemented.');
      },
      logOut: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
    });

    render(<GraphiQLClient searchParams={{ timestamp: '' }} />);

    act(() => {
      fireEvent.click(screen.getByText(/Add Header/));
    });

    const headerInputs = screen.getAllByPlaceholderText(
      /Header Key/,
    ) as HTMLInputElement[];
    const valueInputs = screen.getAllByPlaceholderText(
      /Header Value/,
    ) as HTMLInputElement[];

    act(() => {
      fireEvent.change(headerInputs[0], { target: { value: 'Authorization' } });
    });

    act(() => {
      fireEvent.change(valueInputs[0], { target: { value: 'Bearer token' } });
    });

    waitFor(() => {
      expect(headerInputs[0].value).toBe('Authorization');
      expect(valueInputs[0].value).toBe('Bearer token');
    });
  });

  it('handles authentication redirect', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      user: undefined,
      signIn: function (): Promise<User> {
        throw new Error('Function not implemented.');
      },
      signUp: function (): Promise<User> {
        throw new Error('Function not implemented.');
      },
      logOut: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
    });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<GraphiQLClient searchParams={{ timestamp: '' }} />);

    expect(mockPush).toHaveBeenCalledWith('/signin');
  });
});
