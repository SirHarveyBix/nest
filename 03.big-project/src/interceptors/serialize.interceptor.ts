import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // run before a requets is handled
    console.log('before handler', context);
    return next.handle().pipe(
      map((data: any) =>
        //run before th response is sent out
        console.log('before response', data),
      ),
    );
  }
}
