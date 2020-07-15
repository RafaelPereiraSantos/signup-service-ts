import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CaseConvertInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    return next
      .handle()
      .pipe(
        map(value => { return this.camelCaseToSnakeCase(value); }
        )
      );
  }

  private camelCaseToSnakeCase(value) {
    if (Array.isArray(value)) {
      return value.map(entry => this.camelCaseToSnakeCase(entry));
    } else if (value != null && typeof value === 'object') {
      return Object.entries(value)
        .reduce((acc, [key, oldValue]) => {
          delete acc[key];
          const sanitizedKey = key.replace(/([A-Z]+)/g, "_$1").toLowerCase();
          const sanitizedValue = this.camelCaseToSnakeCase(oldValue);

          acc[sanitizedKey] = sanitizedValue;
          return acc;
        }, {});
    }
    return value;
  };
}
