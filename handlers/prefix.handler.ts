import { APIGatewayProxyResult } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { BaseHandler } from '../interfaces/base-handler.interface';
import { LambdaEvent } from '../interfaces/lambda-event.interface';

export class PrefixHandler implements BaseHandler {
	constructor(private s3: S3, private bucketName: string) {}
	async handle(event: LambdaEvent): Promise<APIGatewayProxyResult> {
		const query = new URLSearchParams(event.rawQueryString);
		const prefix = query.get('prefix') || undefined;
		const prefixes = await this.getFolders(prefix);
		return {
			statusCode: 200,
			body: JSON.stringify(prefixes),
		};
	}

	private async getFolders(prefix?: string): Promise<S3.ObjectList | S3.CommonPrefixList | undefined> {
		const result = await this.s3
			.listObjects({
				Bucket: this.bucketName,
				Prefix: prefix,
				Delimiter: '/',
			})
			.promise();
		if (result.CommonPrefixes && result.CommonPrefixes?.length > 0) {
			return result.CommonPrefixes;
		}
		console.log(result);
		return result.Contents;
	}
}
