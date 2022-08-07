import { APIGatewayEvent } from 'aws-lambda';

export type LambdaEvent = APIGatewayEvent & {
	rawQueryString: string;
	rawPath: string;
};
