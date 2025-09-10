import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationService } from '../shared-services/notification.service';

@Injectable()
export class NotifyInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) { }
  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'POST') {
      return next.handle(req);
    }
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const responceCode = event.status * 1
          if (responceCode=== 201) {
            this.notificationService.success(' request has been fulfilled & record successful Added');
          } else if (responceCode === 204) {
            this.notificationService.success(' request has been fulfilled & record successful Updated');
          }
        }
      })
    );
  }
}
