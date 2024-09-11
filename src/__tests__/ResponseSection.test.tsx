import { render, screen } from '@testing-library/react';
import ResponseSection from '../components/ResponseSection';
import '@testing-library/jest-dom';
vi.mock('@andypf/json-viewer/dist/esm/react/JsonViewer', () => {
  return {
    __esModule: true,
    default: ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>,
  };
});

describe('ResponseSection', () => {
  it('renders correctly with a valid response code and body', () => {
    render(
      <ResponseSection
        responseCode={200}
        responseStatus={null}
        responseBody='{"key": "value"}'
      />,
    );

    expect(screen.getByText(/Response Details/i)).toBeInTheDocument();
    expect(screen.getByText(/HTTP Response Code:/i)).toBeInTheDocument();
    expect(screen.getByText(/200/i)).toBeInTheDocument();
    expect(screen.getByText(/Status:/i)).toBeInTheDocument();
    expect(screen.getByText(/OK/i)).toBeInTheDocument();
    expect(screen.getByText(/Response Body:/i)).toBeInTheDocument();
  });

  it('renders correctly with a valid response code but no body', () => {
    render(
      <ResponseSection
        responseCode={404}
        responseStatus={null}
        responseBody={null}
      />,
    );

    expect(screen.getByText(/HTTP Response Code:/i)).toBeInTheDocument();
    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Status:/i)).toBeInTheDocument();
    expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Response Body:/i)).toBeInTheDocument();
    expect(screen.getByText(/No Response/i)).toBeInTheDocument();
  });

  it('renders correctly with null response code and status', () => {
    render(
      <ResponseSection
        responseCode={null}
        responseStatus={null}
        responseBody={null}
      />,
    );

    expect(screen.getByText(/HTTP Response Code:/i)).toBeInTheDocument();
    expect(screen.getAllByText(/N\/A/i)).toHaveLength(2);
    expect(screen.getByText(/Status:/i)).toBeInTheDocument();
    expect(screen.getByText(/Response Body:/i)).toBeInTheDocument();
    expect(screen.getByText(/No Response/i)).toBeInTheDocument();
  });

  it('renders correctly with an invalid response code', () => {
    render(
      <ResponseSection
        responseCode={500}
        responseStatus={null}
        responseBody={null}
      />,
    );

    expect(screen.getByText(/HTTP Response Code:/i)).toBeInTheDocument();
    expect(screen.getByText(/500/i)).toBeInTheDocument();
    expect(screen.getByText(/Status:/i)).toBeInTheDocument();
    expect(screen.getByText(/Internal Server Error/i)).toBeInTheDocument();
    expect(screen.getByText(/Response Body:/i)).toBeInTheDocument();
    expect(screen.getByText(/No Response/i)).toBeInTheDocument();
  });
});
