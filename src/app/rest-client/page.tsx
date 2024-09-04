'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Rest.module.css';
import { encode } from 'base64-url';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

const RestClient = () => {
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const { isAuthenticated } = useAuth();

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
    const encodedEndpoint = encode(endpoint);
    const encodedBody = body ? encode(JSON.stringify(JSON.parse(body))) : '';
    const queryParams = headers
      .map((header) => `${encode(header.key)}=${encode(header.value)}`)
      .join('&');

    let url = `/rest-client/${method}/${encodedEndpoint}`;
    if (encodedBody) url += `/${encodedBody}`;
    if (queryParams) url += `?${queryParams}`;

    router.push(url);
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

          <button onClick={handleRequest}>Send Request</button>
        </div>
      </main>
    </div>
  );
};

export default RestClient;
