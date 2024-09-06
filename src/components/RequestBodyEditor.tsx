import React, { useEffect, useState } from 'react';
import { JsonEditor, JsonData } from 'json-edit-react';
import { isObjectEmpty } from '@/utils/common';
import styles from '../styles/RequestBodyEditor.module.css';

interface RequestBodyEditorProps {
  onBodyChange: (payload: string) => void;
}

const RequestBodyEditor: React.FC<RequestBodyEditorProps> = ({
  onBodyChange,
}) => {
  const [bodyJson, setBodyJson] = useState<Record<string, JsonData>>({});
  const [bodyText, setBodyText] = useState<string>('');
  const [mode, setMode] = useState<'json' | 'text'>('json');

  useEffect(() => {
    if (mode === 'text') {
      setBodyText(
        isObjectEmpty(bodyJson) ? '' : JSON.stringify(bodyJson, null, 2),
      );
      setBodyJson({});

      return;
    }
    setBodyText('');
  }, [mode]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = e.target.value;
    setBodyText(textValue);
    onBodyChange(textValue);
  };

  const handleJsonChange = (newData: Record<string, JsonData>) => {
    setBodyJson(newData);
    onBodyChange(JSON.stringify(newData, null, 2)); // Prettify and notify parent
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
          value={bodyText} // Show the JSON as text
          onChange={handleTextChange}
          placeholder="Enter plain text request body here"
        />
      )}
    </div>
  );
};

export default RequestBodyEditor;
