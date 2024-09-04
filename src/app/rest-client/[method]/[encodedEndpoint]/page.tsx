import { decode } from 'base64-url';
import RestClient from '../../page';
import styles from '@/styles/Resp.module.css';
import ResponseSection from '@/components/ResponseSection';

export default async function ResponsePage({
  params,
}: {
  params: { method: string; encodedEndpoint: string };
}) {
  const method = params.method;
  const endpoint = decode(params.encodedEndpoint);

  const fetchResponse = async () => {
    const response = await fetch(endpoint, {
      method,
      // headers,
      // body: body ? JSON.stringify(body) : undefined,
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
