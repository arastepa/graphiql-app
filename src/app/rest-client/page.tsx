'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Rest.module.css';

const RestClient = () => {
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);
  const router = useRouter();

  const handleMethodChange = (e) => {
    const newMethod = e.target.value;
    setMethod(newMethod);
    router.push(`/rest-client/${newMethod}`);
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
    const res = await fetch(endpoint, {
      method,
      headers: headers.reduce((acc, { key, value }) => {
        if (key && value) acc[key] = value;
        return acc;
      }, {}),
      body: method !== 'GET' ? body : undefined,
    });
    const result = await res.json();
    setResponse({
      status: res.status,
      data: JSON.stringify(result, null, 2),
    });
  };

  return (
    <div className={styles.restClient}>
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

          {response && (
            <div className="response-section">
              <h3>Response</h3>
              <p>Status: {response.status}</p>
              <pre>{response.data}</pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RestClient;
