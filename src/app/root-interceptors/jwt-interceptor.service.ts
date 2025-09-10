import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    console.log("request----", request);
    console.log("request.url----", request.url);

    let userRequest = request.url.includes("/user/");

    let consumerRequest = request.url.includes("/consumer/");

    if (userRequest) {

      if (sessionStorage.getItem('usertoken') != null) {
        const clonedReq = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('usertoken').slice(1, -1))
        });
        return next.handle(clonedReq).pipe(
          tap(
            succ => { },
            err => {
              const errorCode = err.status * 1
              if (errorCode == 401) {
                sessionStorage.removeItem('usertoken');
                this.router.navigate(['/message-pages/access-denied']);
              }
              else if (errorCode == 403)
                this.router.navigate(['/message-pages/forbidden']);
            }
          )
        )
      }


    } else if (consumerRequest) {

      if (sessionStorage.getItem('consumertoken') != null) {
        const clonedReq = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('consumertoken').slice(1, -1))
        });
        return next.handle(clonedReq).pipe(
          tap(
            succ => { },
            err => {
              const errorCode = err.status * 1
              if (errorCode == 401) {
                sessionStorage.removeItem('consumertoken');
                this.router.navigate(['/message-pages/access-denied']);
              }
              else if (errorCode == 403)
                this.router.navigate(['/message-pages/forbidden']);
            }
          )
        )
      }


    }
    return next.handle(request.clone());
  }

}
