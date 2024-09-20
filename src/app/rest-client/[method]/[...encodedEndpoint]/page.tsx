import { decode } from 'base64-url';
import RestClient from '../../page';
import styles from '@/styles/Rest.module.css';
import ResponseSection from '@/components/ResponseSection';

export default async function ResponsePage({
  params,
  searchParams,
}: {
  params: { method: string; encodedEndpoint: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const method = params.method;
  const endpoint = decode(params.encodedEndpoint[0]);
  const encodedBody = params.encodedEndpoint[1];

  const body = encodedBody ? decode(encodedBody) : undefined;
  const headers = Object.keys(searchParams)
    .filter((key) => key.startsWith('header_'))
    .reduce(
      (acc, key) => {
        const paramValue = searchParams[key];
        acc[decode(key.replace('header_', ''))] = Array.isArray(paramValue)
          ? decode(paramValue.join(', '))
          : decode(paramValue || '');
        return acc;
      },
      {} as Record<string, string>,
    );

  const getBody = () => {
    if (!body) return undefined;
    if (headers['Content-Type'] === 'application/json') {
      try {
        return JSON.stringify(JSON.parse(body));
      } catch (error) {
        console.error('Error parsing body as JSON:', error);
        return body;
      }
    }
    return body;
  };

  const fetchResponse = async () => {
    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          ...headers,
          'Content-Type':
            headers['Content-Type'] || 'application/x-www-form-urlencoded',
        },
        body: getBody(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        status: response.status,
        statusText: response.statusText,
        data,
      };
    } catch (error) {
      console.error('Fetch error:', error);
      return {
        status: 500,
        statusText: 'Internal Server Error',
        data: null,
      };
    }
  };

  const { status, statusText, data } = await fetchResponse();

  return (
    <div className={styles.restContainer}>
      <RestClient searchParams={undefined} />
      <ResponseSection
        responseCode={status}
        responseStatus={statusText}
        responseBody={data}
      />
    </div>
  );
}
