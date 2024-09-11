import { decode } from 'base64-url';
import { GraphiQLClient } from '@/app/graphiql/page';
import ResponseSection from '@/components/ResponseSection';

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

  const body = decode(encodedBody);
  const newBody = body.replace(/\\n/g, '').replace(/\s+/g, ' ');
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
        body: newBody,
      });

      const data = await response.json();

      return {
        status: response.status,
        statusText: response.statusText,
        responseBody: data,
        responseErrors: data.errors || null,
      };
    } catch (error) {
      return {
        status: 500,
        statusText: 'Internal Server Error',
        responseBody: { error: 'Request failed' },
      };
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { status, statusText, responseBody, responseErrors } =
    await makeRequest();

  return (
    <div>
      <GraphiQLClient />
      <ResponseSection
        responseCode={status}
        responseStatus={statusText}
        responseBody={responseBody}
        responseErrors={responseErrors}
      />
    </div>
  );
}
