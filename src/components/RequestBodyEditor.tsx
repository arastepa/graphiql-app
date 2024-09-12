import React, { useEffect, useState, useRef } from 'react';
import { JsonEditor, JsonData } from 'json-edit-react';
import { isObjectEmpty } from '@/utils/common';
import styles from '../styles/RequestBodyEditor.module.css';

interface RequestBodyEditorProps {
  onBodyChange: (payload: string) => void;
  initialBody: string;
}

const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

type BodyType = 'json' | 'text';

const getInitialBodyConfig = (initialBody: string) => {
  if (initialBody === '') {
    return { initialType: 'json', initialBodyText: '', initialBodyJSON: {} };
  }

  if (isJsonString(initialBody)) {
    return {
      initialType: 'json',
      initialBodyText: '',
      initialBodyJSON: JSON.parse(initialBody),
    };
  }

  return {
    initialType: 'text',
    initialBodyText: initialBody,
    initialBodyJSON: {},
  };
};

const RequestBodyEditor: React.FC<RequestBodyEditorProps> = ({
  onBodyChange,
  initialBody,
}) => {
  const [bodyJson, setBodyJson] = useState<Record<string, JsonData>>(
    getInitialBodyConfig(initialBody).initialBodyJSON,
  );
  const [bodyText, setBodyText] = useState<string>(
    getInitialBodyConfig(initialBody).initialBodyText,
  );
  const [mode, setMode] = useState<BodyType>(
    getInitialBodyConfig(initialBody).initialType as BodyType,
  );

  const previousModeRef = useRef(getInitialBodyConfig(initialBody).initialType);
  useEffect(() => {
    if (mode === 'text' && previousModeRef.current !== 'text') {
      setBodyText(
        isObjectEmpty(bodyJson) ? '' : JSON.stringify(bodyJson, null, 2),
      );
      setBodyJson({});

      previousModeRef.current = 'text';
      return;
    }
    if (mode === 'json' && previousModeRef.current !== 'json') {
      setBodyText('');
      previousModeRef.current === 'json';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = e.target.value;
    setBodyText(textValue);
    onBodyChange(textValue);
  };

  const handleJsonChange = (newData: Record<string, JsonData>) => {
    setBodyJson(newData);
    onBodyChange(JSON.stringify(newData, null, 2));
  };

  return (
    <div>
      <div>
        <select
          className={styles.select}
          value={mode}
          onChange={(e) => setMode(e.target.value as 'json' | 'text')}
        >
          <option value="json">JSON</option>
          <option value="text">Plain Text</option>
        </select>
      </div>
      {mode === 'json' ? (
        <JsonEditor
          className={styles['custom-json-editor']}
          data={bodyJson}
          setData={(data) => {
            handleJsonChange(data as unknown as Record<string, JsonData>);
          }}
          rootName="Request Body"
          theme="monoLight"
        />
      ) : (
        <textarea
          style={{ width: '100%', height: '300px' }}
          value={bodyText}
          onChange={handleTextChange}
          placeholder="Enter plain text request body here"
        />
      )}
    </div>
  );
};

export default RequestBodyEditor;
