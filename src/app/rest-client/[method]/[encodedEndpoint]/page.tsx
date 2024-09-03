// app/[method]/[encodedEndpoint]/page.tsx
import { decode } from 'base64-url';
import RestClient from '../../page';
import styles from '@/styles/Resp.module.css';
export default async function ResponsePage({
  params,
}: {
  params: { method: string; encodedEndpoint: string };
}) {
  const method = params.method;
  const endpoint = decode(params.encodedEndpoint);
  //   const body = params?.encodedBody
  //     ? JSON.parse(decode(params?.encodedBody))
  //     : null;

  //   const headers: Record<string, string> = {};
  //   searchParams.forEach((value, key) => {
  //     headers[decode(key)] = decode(value);
  //   });

  // Example fetch request (you may want to use a custom fetch function)
  const fetchResponse = async () => {
    const response = await fetch(endpoint, {
      method,
      //   headers,
      //   body: body ? JSON.stringify(body) : undefined,
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
      <div>
        <h3>Response</h3>
        <div>Status: {status}</div>
        <div>Status Text: {statusText}</div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
