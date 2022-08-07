import { APIGatewayProxyResult } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { IndexHandler } from './handlers/index.handler';
import { PrefixHandler } from './handlers/prefix.handler';
import { ObjectHandler } from './handlers/object.handler';
import { BaseHandler } from './interfaces/base-handler.interface';
import { LambdaEvent } from './interfaces/lambda-event.interface';

const BUCKET_NAME = process.env.BUCKET_NAME;
const s3 = new S3();

export const handler = async (
	event: LambdaEvent
): Promise<APIGatewayProxyResult> => {
	console.log('EVENT', event);

	const handlers: Record<string, BaseHandler> = {
		'/': new IndexHandler(),
		'/prefixes/': new PrefixHandler(s3, BUCKET_NAME!),
		'/objects/': new ObjectHandler(s3, BUCKET_NAME!),
	};

	return handlers[event.rawPath].handle(event);
};
