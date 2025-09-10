import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NotificationService } from '../shared-services/notification.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private notificationService: NotificationService,
  ) {
  }
  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe( retry(1),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            
            this.notificationService.warn(error.error.message);
          } else {
            
            if(navigator.onLine){
            const errorCode = error.status * 1;

            switch (errorCode) {
              case 100: {   
                this.notificationService.warn('Record Not Found');
                break;
              }
              case 400: {    
                // this.router.navigateByUrl("/message-pages/bad-request");
                this.notificationService.warn('Bad-Request');
                break;
              }
              case 404: {  
                this.notificationService.warn('Record Not Found');
                break;
              }
              case 415: {    
                this.notificationService.warn('Unsupported media type');
                break;
              }
              case 500: {   
                // this.router.navigateByUrl("/message-pages/server-error");
                this.notificationService.warn('Internal-server-error');
                break;
              }
              case 503: {    
                // this.router.navigateByUrl("/message-pages/service-unavailable");
                this.notificationService.warn('service-unavailable');
                break;
              }
              default: {
                this.notificationService.warn('Somthing Went Wrong');
                break;
              }
            }
          }
          else {
            this.notificationService.warn('Please check your internet connection and try again');
            }
          }
          return throwError(error);
        })
      )
  }
}
