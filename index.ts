import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { S3 } from 'aws-sdk';

const BUCKET_NAME = process.env.BUCKET_NAME;

export const handler = async (
	event: APIGatewayEvent & { rawQueryString: string },
	context: Context
): Promise<APIGatewayProxyResult> => {
  const query = new URLSearchParams(event.rawQueryString);
  const prefix = query.get('prefix') || undefined;
  console.log(prefix);
	const s3 = new S3();
	try {
		const result = await s3.listObjects({
      Bucket: BUCKET_NAME!,
      Prefix: prefix,
      Delimiter: '/',
    }).promise();
		console.log('COMMON PREFIXES', result.CommonPrefixes);
		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'hello world',
			}),
		};
	} catch (err) {
		console.error(err);
		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'Fatal error:' + (err as Error).message,
			}),
		};
	}
};
