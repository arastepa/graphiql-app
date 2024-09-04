'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Rest.module.css';
import { encode } from 'base64-url';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';

const RestClient = () => {
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
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
        (method === 'POST' || method === 'PUT') && body
          ? encode(JSON.stringify(JSON.parse(body)))
          : '';

      // Construct the URL for the ResponsePage
      let url = `/rest-client/${method}/${encodedEndpoint}`;
      if (encodedBody) url += `/${encodedBody}`; // Include encoded body for POST/PUT

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

      // Append query parameters to the URL
      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }

      // Redirect to the constructed URL
      router.push(url);

      // Reset the form
      setEndpoint('');
      setHeaders([{ key: '', value: '' }]);
      setBody('');
      setError(null);
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
              type="text"
              placeholder="Endpoint URL"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
            />
          </div>

          <div className={styles.headerSection}>
            <h3>Headers</h3>
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
            <textarea
              placeholder="JSON/Text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}

          <button onClick={handleRequest}>Send Request</button>
        </div>
      </main>
    </div>
  );
};

export default RestClient;
