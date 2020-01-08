import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
// injecting local storage service
  constructor(private $localStorage: LocalStorageService) {
  }
// can access http object which sent to the server
  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
// reitrieving authentication token from local storage
    const token = this.$localStorage.retrieve('authenticationToken');
    console.log('jwt token ' + token);
    // if it valid we clone the request object and we set the authorization header with bearer token
    if (token) {
      const cloned = req.clone({

        headers: req.headers.set('Authorization',
          'Bearer ' + token)

      });
// this request will be sent to the server
      return next.handle(cloned);
    } else {

        // if not valid we just forward the request as it is without adding anything
      return next.handle(req);

    }
  }
}
