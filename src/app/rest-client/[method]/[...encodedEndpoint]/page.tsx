import { decode } from 'base64-url';
import RestClient from '../../page';
import styles from '@/styles/Resp.module.css';
import ResponseSection from '@/components/ResponseSection';

export default async function ResponsePage({
  params,
  searchParams,
}: {
  params: { method: string; encodedEndpoint: string[] }; // Add encodedBody here
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const method = params.method;
  const endpoint = decode(params.encodedEndpoint[0]);
  const encodedURL = params.encodedEndpoint;
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

  const getBody = () => {
    if (!body) return undefined;
    if (headers['Content-Type'] === 'application/json') {
      return JSON.stringify(JSON.parse(body));
    }
    return body;
  };

  const fetchResponse = async () => {
    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          ...headers,
        },
        body: getBody(),
      });
      const data = await response.json();

      return {
        status: response.status,
        statusText: response.statusText,
        data,
      };
    } catch (error) {
      console.log(error);
    }
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
