'use client';

import React, { useState } from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import styles from '@/styles/Graphiql.module.css';
import { encode } from 'base64-url';
import { useRouter } from 'next/navigation';
import { graphql } from 'cm6-graphql';
import { formatGraphQL } from '@/utils/prettify';
import { langs } from '@uiw/codemirror-extensions-langs';

export type RestClientPayload = {
  type: 'GRAPHQL';
  endpoint: string;
  headers: { key: string; value: string }[];
  variables: string;
  timestamp: string;
  query: string;
};

const findItemByTimestamp = (
  timestamp?: string,
): Record<string, never> | RestClientPayload => {
  if (!timestamp) return {};

  const historyData = JSON.parse(
    localStorage.getItem('requestHistory') || '[]',
  ) as RestClientPayload[];

  return historyData.find((item) => item.timestamp === timestamp) || {};
};

export const GraphiQLClient = ({ searchParams }) => {
  const requestDataFromHistory = findItemByTimestamp(searchParams?.timestamp);

  const {
    endpoint: initialEndpoint = '',
    headers: initialHeaders = [],
    variables: initialVariables = '{}',
    query: initialQuery = '',
  } = requestDataFromHistory;

  const router = useRouter();
  const [endpointUrl, setEndpointUrl] = useState<string>(initialEndpoint);
  const [sdlUrl, setSdlUrl] = useState<string>(
    initialEndpoint ? `${initialEndpoint}?sdl` : '',
  );
  const [query, setQuery] = useState<string>(initialQuery);
  const [variables, setVariables] = useState<string>(initialVariables);
  const [varErr, setVarErr] = useState('');
  const [headers, setHeaders] =
    useState<Record<string, string>[]>(initialHeaders);
  const [documentation, setDocumentation] = useState<string | null>(null);
  const [showDocumentation, setShowDocumentation] = useState<boolean>(false);

  const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setEndpointUrl(url);
    setSdlUrl(`${url}?sdl`);
    fetchSchema();
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const updateHeader = (index: number, key: string, value: string) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index] = { key, value };
    setHeaders(updatedHeaders);
  };

  const fetchSchema = async () => {
    try {
      const response = await fetch(`${endpointUrl}?sdl`);
      if (response.ok) {
        const schema = await response.text();
        if (schema) {
          setDocumentation(schema);
          setShowDocumentation(true);
        } else {
          setDocumentation(null);
          setShowDocumentation(false);
        }
      } else {
        console.error('Failed to fetch schema:', response.status);
        setDocumentation(null);
        setShowDocumentation(false);
      }
    } catch (error) {
      console.error('Error fetching schema:', error);
      setDocumentation(null);
      setShowDocumentation(false);
    }
  };

  const redirectToEncodedUrl = () => {
    if (endpointUrl && query) {
      const encodedEndpointUrl = encode(endpointUrl);
      const body = JSON.stringify({
        query,
        variables: JSON.parse(variables || '{}'),
      });
      const encodedBody = encode(body);

      const queryParams = new URLSearchParams();
      headers.forEach((header) => {
        if (header.key) {
          queryParams.append(
            `header_${encode(header.key)}`,
            encode(header.value),
          );
        }
      });

      const requestHistory = JSON.parse(
        localStorage.getItem('requestHistory') || '[]',
      );
      requestHistory.push({
        type: 'GRAPHQL',
        endpoint: endpointUrl,
        query,
        variables,
        headers,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('requestHistory', JSON.stringify(requestHistory));

      router.push(
        `/graphiql//GRAPHQL/${encodedEndpointUrl}/${encodedBody}?${queryParams.toString()}`,
      );
    }
  };

  const prettifyQuery = async () => {
    try {
      const formatted = formatGraphQL(query);
      setQuery(formatted);
    } catch (err) {
      console.error('Error formatting query:', err);
    }
  };

  const handleVariableChange = async (value: string) => {
    try {
      const parsed = JSON.parse(value);
      const formatted = JSON.stringify(parsed, null, 2);
      setVarErr('');
      setVariables(formatted);
    } catch (err) {
      if (err instanceof SyntaxError) setVarErr('invalid json');
    }
  };

  return (
    <div className={styles.graphiqlClient}>
      <div className="main-content">
        <div className={styles.clientSection}>
          <div className={styles.inputs}>
            <div>
              <label>Endpoint URL:</label>
              <input
                type="text"
                value={endpointUrl}
                onChange={handleEndpointChange}
              />
            </div>
            <br />
            <div>
              <label>SDL URL:</label>
              <input
                type="text"
                value={sdlUrl}
                onChange={(e) => setSdlUrl(e.target.value)}
                className={styles.sdl}
              />
            </div>
          </div>

          <div className="headers-section">
            <button onClick={addHeader}>Add Header</button>
            {headers.map((header, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Header Key"
                  value={header.key}
                  onChange={(e) =>
                    updateHeader(index, e.target.value, header.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Header Value"
                  value={header.value}
                  onChange={(e) =>
                    updateHeader(index, header.key, e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          <div className="editor-section">
            <label>Query:</label>
            <CodeMirror
              value={query}
              onChange={(value) => {
                setQuery(value);
              }}
              height="200px"
              extensions={[graphql(), EditorView.lineWrapping]}
            />
            <button onClick={prettifyQuery}>Prettify</button>
            <br />
            <div>
              <label>Variables:</label>
              {varErr ? <p>{varErr}</p> : ''}
              <CodeMirror
                id="variablesEditor"
                value={variables}
                onChange={(value) => {
                  handleVariableChange(value);
                }}
                height="100px"
                extensions={[langs.json(), EditorView.lineWrapping]}
              />
            </div>
          </div>

          <button onClick={redirectToEncodedUrl}>Run Query</button>
          {showDocumentation && (
            <div className={styles.documentation}>
              <h3>Schema Documentation:</h3>
              <CodeMirror
                value={documentation || ''}
                height="400px"
                extensions={[graphql(), EditorView.lineWrapping]}
                readOnly
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GraphiQLClient;
