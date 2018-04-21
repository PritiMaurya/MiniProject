
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MyInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token');
    // console.log('token Interceptor', token);
    if (token) {
        req = req.clone({ headers: req.headers.set('token', token) });
        // console.log('intercepter');
    }
    return next.handle(req);
  }
}
