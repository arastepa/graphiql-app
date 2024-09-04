import { decode } from 'base64-url';
import RestClient from '../../page';
import styles from '@/styles/Resp.module.css';
import ResponseSection from '@/components/ResponseSection';

export default async function ResponsePage({
  params,
  searchParams,
}: {
  params: { method: string; encodedEndpoint: string; encodedBody?: string }; // Add encodedBody here
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const method = params.method;
  const endpoint = decode(params.encodedEndpoint);

  const body =
    method !== 'GET' && params.encodedBody
      ? JSON.parse(decode(params.encodedBody))
      : undefined;

  const headers = Object.keys(searchParams)
    .filter((key) => key.startsWith('header_'))
    .reduce(
      (acc, key) => {
        acc[key.replace('header_', '')] = Array.isArray(searchParams[key])
          ? searchParams[key].join(', ')
          : searchParams[key];
        return acc;
      },
      {} as Record<string, string>,
    );

  const fetchResponse = async () => {
    const response = await fetch(endpoint, {
      method,
      headers: {
        ...headers,
        'Content-Type': method !== 'GET' ? 'application/json' : undefined,
      },
      body: method !== 'GET' ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    return {
      status: response.status,
      statusText: response.statusText,
      data,
    };
  };

  const { status, statusText, data } = await fetchResponse();

  return (
    <div className={styles.restContainer}>
      <RestClient />
      <ResponseSection
        responseCode={status}
        responseStatus={statusText}
        responseBody={data}
      />
    </div>
  );
}
