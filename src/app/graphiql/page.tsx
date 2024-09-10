'use client';

import React, { useState } from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import styles from '@/styles/Graphiql.module.css';
import { encode } from 'base64-url';
import { useRouter } from 'next/navigation';
import { graphql } from 'cm6-graphql';
import { formatGraphQL } from '@/utils/prettify';
import { langs } from '@uiw/codemirror-extensions-langs';

export const GraphiQLClient = () => {
  const router = useRouter();
  const [endpointUrl, setEndpointUrl] = useState<string>('');
  const [sdlUrl, setSdlUrl] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [variables, setVariables] = useState<string>('{}');
  const [varErr, setVarErr] = useState('');
  const [headers, setHeaders] = useState<Record<string, string>[]>([]);

  const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setEndpointUrl(url);
    setSdlUrl(`${url}?sdl`);
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const updateHeader = (index: number, key: string, value: string) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index] = { key, value };
    setHeaders(updatedHeaders);
  };

  const redirectToEncodedUrl = () => {
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

    router.push(
      `/graphiql//GRAPHQL/${encodedEndpointUrl}/${encodedBody}?${queryParams.toString()}`,
    );
  };

  const prettifyQuery = async () => {
    try {
      const formatted = formatGraphQL(query);
      setQuery(formatted);
    } catch (err) {
      console.log(err);
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
        </div>
      </div>
    </div>
  );
};

export default GraphiQLClient;
