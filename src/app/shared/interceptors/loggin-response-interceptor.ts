import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const logginResponseInterceptor: HttpInterceptorFn = (req, next) => {
  let start = performance.now();
  console.log('get the start time of the request ' + start + 'ms');
  console.log('get the end time of the request ' + performance.now() + 'ms');
  console.log('get the time the request took to be executed ' + (performance.now() - start) + 'ms');

  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url,'returned a response with status',event.status);
        console.log(req.url, 'returned a response with body', event.body);
        console.log( req.url,'returned a response with headers', event.headers);
        console.log(req.url, 'returned a response with type', event.type);
        console.log(req.url, 'returned a response with url', event.url);
        console.log( req.url, 'returned a response with clone', event.clone);
      }
    })
  );
};
