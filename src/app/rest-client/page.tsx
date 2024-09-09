'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from '@/styles/Rest.module.css';
import { encode } from 'base64-url';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import RequestBodyEditor from '@/components/RequestBodyEditor';

const RestClient = () => {
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState<string>();
  const { isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push('/signin');
  }, [isAuthenticated, router]);

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

  const handleRequest = async () => {
    try {
      const encodedEndpoint = encode(endpoint);
      const encodedBody =
        (method === 'POST' || method === 'PUT') && body ? encode(body) : '';

      let url = `/rest-client/${method}/${encodedEndpoint}`;
      if (encodedBody) url += `/${encodedBody}`;

      // Construct query parameters for headers
      const queryParams = new URLSearchParams();
      headers.forEach((header) => {
        if (header.key) {
          queryParams.append(
            `header_${encode(header.key)}`,
            encode(header.value),
          );
        }
      });

      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }

      router.push(url);
    } catch (error) {
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
            <RequestBodyEditor onBodyChange={setBody} />
          </div>
          {error && <div className={styles.error}>{error}</div>}

          <button onClick={handleRequest}>Send Request</button>
        </div>
      </main>
    </div>
  );
};

export default RestClient;
