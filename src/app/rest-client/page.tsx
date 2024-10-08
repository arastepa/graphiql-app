'use client';
import { FC, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from '@/styles/Rest.module.css';
import errStyles from '@/styles/Error.module.css';
import { encode } from 'base64-url';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import RequestBodyEditor from '@/components/RequestBodyEditor';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';

type MethodName = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type RestClientPayload = {
  method: MethodName;
  type: 'REST';
  endpoint: string;
  headers: { key: string; value: string }[];
  variables: string;
  timestamp: string;
  body: string;
};

type RestClientProps = {
  searchParams: Record<string, never> | { timestamp: string };
};

const findItemByTimestamp = (
  timestamp?: string,
): Record<string, never> | RestClientPayload => {
  if (!timestamp) return {};

  const historyData = JSON.parse(
    typeof window !== 'undefined'
      ? localStorage.getItem('requestHistory') || '[]'
      : '[]',
  ) as RestClientPayload[];

  return historyData.find((item) => item.timestamp === timestamp) || {};
};

const RestClient: FC<RestClientProps> = ({ searchParams }) => {
  const requestDataFromHistory = findItemByTimestamp(searchParams?.timestamp);

  const {
    method: initialMethod = 'GET',
    endpoint: initialEndpoint = '',
    headers: initialHeaders = [
      { key: 'Content-Type', value: 'application/json' },
    ],
    variables: initialVariables = '{}',
    body: initialBody = '',
  } = requestDataFromHistory;

  const [method, setMethod] = useState(initialMethod);
  const [endpoint, setEndpoint] = useState(initialEndpoint);
  const [headers, setHeaders] = useState(initialHeaders);
  const [body, setBody] = useState<string>(initialBody);
  const [variables, setVariables] = useState<string>(initialVariables);
  const [varErr, setVarErr] = useState<string>('');
  const { isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push('/signin');
  }, [isAuthenticated, router]);

  const substituteVariables = (text: string, variables: object) => {
    return text.replace(/\{\{(.*?)\}\}/g, (_, key) => {
      return variables[key.trim()] || `{{${key}}}`;
    });
  };

  const handleMethodChange = (e) => {
    const newMethod = e.target.value;
    setMethod(newMethod);
  };

  const handleAddHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleHeaderChange = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const handleVariableChange = (value: string) => {
    try {
      JSON.parse(value);
      setVariables(value);
      setVarErr('');
    } catch (err) {
      if (err instanceof SyntaxError) setVarErr('Invalid JSON');
    }
  };

  const handleRequest = async () => {
    try {
      const parsedVariables = JSON.parse(variables);

      // Substitute variables in the endpoint and body
      const finalEndpoint = substituteVariables(endpoint, parsedVariables);
      const finalBody =
        body && (method === 'POST' || method === 'PUT')
          ? substituteVariables(body, parsedVariables)
          : '';

      const encodedEndpoint = encode(finalEndpoint);
      const encodedBody =
        (method === 'POST' || method === 'PUT') && finalBody
          ? encode(finalBody)
          : '';

      let url = `/rest-client/${method}/${encodedEndpoint}`;
      if (encodedBody) url += `/${encodedBody}`;

      const queryParams = new URLSearchParams();
      headers.forEach((header) => {
        if (header.key) {
          queryParams.append(
            `header_${encode(header.key)}`,
            encode(header.value),
          );
        }
      });

      if (variables && parsedVariables) {
        queryParams.append('variables', encode(variables));
      }

      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }

      const requestHistory = JSON.parse(
        typeof window !== 'undefined'
          ? localStorage.getItem('requestHistory') || '[]'
          : '[]',
      );
      requestHistory.push({
        type: 'REST',
        method,
        endpoint,
        body,
        headers,
        variables,
        timestamp: new Date().toISOString(),
      });
      if (typeof window !== 'undefined')
        localStorage.setItem('requestHistory', JSON.stringify(requestHistory));

      router.push(url);
    } catch (error) {
      console.error('Request handling error:', error);
      setError(
        'An error occurred while processing your request. Please try again.',
      );
      toast.error('An error occurred while processing your request.');
    }
  };

  return (
    <div
      className={`${styles.restClient} ${pathname === '/rest-client' ? styles.client : ''}`}
    >
      <main>
        <div className={styles.clientWrapper}>
          <div className={styles.clientHeader}>
            <select value={method} onChange={handleMethodChange}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input
              className={styles.endpoint_url}
              type="text"
              placeholder="Endpoint URL"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
            />
          </div>

          <div className={styles.headerSection}>
            <h3 className={styles.headerText}>Headers</h3>
            <button onClick={handleAddHeader}>Add Header</button>
            {headers.map((header, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Header Key"
                  value={header.key}
                  onChange={(e) =>
                    handleHeaderChange(index, 'key', e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Header Value"
                  value={header.value}
                  onChange={(e) =>
                    handleHeaderChange(index, 'value', e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          <div className={styles.bodySection}>
            <h3>Body</h3>
            <RequestBodyEditor onBodyChange={setBody} initialBody={body} />
          </div>

          <div className={styles.variablesSection}>
            <h3>Variables</h3>
            {varErr && <div className={errStyles.error}>{varErr}</div>}
            <CodeMirror
              value={variables}
              height="100px"
              extensions={[langs.json(), EditorView.lineWrapping]}
              onChange={(value) => handleVariableChange(value)}
              theme="light"
            />
          </div>

          {error && <div className={errStyles.error}>{error}</div>}

          <button onClick={handleRequest}>Send Request</button>
        </div>
      </main>
    </div>
  );
};

export default RestClient;
