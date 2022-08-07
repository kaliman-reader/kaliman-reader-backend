import { APIGatewayProxyResult } from 'aws-lambda';
import { BaseHandler } from '../interfaces/base-handler.interface';
import { LambdaEvent } from '../interfaces/lambda-event.interface';

export class IndexHandler implements BaseHandler {
	handle(
		event: LambdaEvent
	): Promise<APIGatewayProxyResult> {
		return Promise.resolve({
			statusCode: 200,
			body: JSON.stringify({
				message: 'Hello World',
			}),
		});
	}
}
