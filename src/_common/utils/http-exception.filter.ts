import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import * as moment from 'moment';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();
    const obj = exception.getResponse();
    const msg =
      typeof obj === 'string' ? obj : JSON.parse(JSON.stringify(obj)).message;

    const stack = exception.stack || '';
    const functionName =
      stack.split('\n')[1]?.trim().split(' ')[1] || 'unknown';

    this.logger.error({
      message: msg,
      status: status,
      url: request.url,
      functionName: functionName,
    });

    response.status(status).send({
      statusCode: status,
      timestamp: moment().format(),
      message: msg,
      path: request.url,
      functionName: functionName,
    });
  }
}
