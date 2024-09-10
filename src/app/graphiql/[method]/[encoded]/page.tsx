import { decode } from 'base64-url';
import styles from '@/styles/Resp.module.css';
import GraphiQLClient from '../../page';

export default async function ResponseGraph({
  params,
  searchParams,
}: {
  params: { method: string; encoded: string[] }; // Add encodedBody here
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const endpoint = decode(params.encoded[0]);
  const encodedURL = params.encoded;
  const encodedBody = encodedURL[1];

  const body = encodedBody ? decode(encodedBody) : undefined;
  const headers = Object.keys(searchParams)
    .filter((key) => key.startsWith('header_'))
    .reduce(
      (acc, key) => {
        acc[decode(key.replace('header_', ''))] = Array.isArray(
          searchParams[key],
        )
          ? decode(searchParams[key].join(', '))
          : decode(searchParams[key]);
        return acc;
      },
      {} as Record<string, string>,
    );

  const makeRequest = async () => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      return {
        status: response.status,
        responseBody: data,
      };
    } catch (error) {
      return {
        status: 500,
        responseBody: { error: 'Request failed' },
      };
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { status, responseBody } = await makeRequest();

  return (
    <div className={styles.restContainer}>
      <GraphiQLClient />
      {/* <ResponseGraphiQl
        responseCode={status}
        responseStatus={statusText}
        responseBody={data}
      /> */}
    </div>
  );
}
