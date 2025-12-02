import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Response } from "express";
import { Observable, tap } from "rxjs";


@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name)
    intercept(context: ExecutionContext, next: CallHandler<any>){
        const now = Date.now();
        const request = context.switchToHttp().getRequest() as Request;
        
        const method = request.method;
        const url = request.url;
        const body = request.body;

        this.logger.log(`Request: ${method} ${url} | Body: ${JSON.stringify(body)}`);
        
        return next.handle()
            .pipe(
                tap(() => {
                    const response = context.switchToHttp().getResponse() as Response;
                    const delay = Date.now() - now;
                    this.logger.log(`Response: ${response.statusCode} [${method}] | Duration: ${delay}ms`);
                })
            )
    }
}