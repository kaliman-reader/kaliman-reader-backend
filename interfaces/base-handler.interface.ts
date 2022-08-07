import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export interface BaseHandler {
	handle(
		event: APIGatewayEvent & { rawQueryString: string }
	): Promise<APIGatewayProxyResult>;
}
