import { APIGatewayProxyResult } from "aws-lambda";
import { S3 } from "aws-sdk";
import { BaseHandler } from "../interfaces/base-handler.interface";
import { LambdaEvent } from '../interfaces/lambda-event.interface';

const SIGNED_URL_EXPIRATION = 3600

export class ObjectHandler implements BaseHandler {
  constructor(private s3: S3, private bucketName: string) {}

  async handle(
		event: LambdaEvent
	): Promise<APIGatewayProxyResult> {
    const query = new URLSearchParams(event.rawQueryString);
    const signedUrl = this.s3.getSignedUrl('getObject', {
      Key: query.get('key') || undefined,
      Bucket: this.bucketName,
      Expires: SIGNED_URL_EXPIRATION,
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        url: signedUrl,
      })
    }
  }
}