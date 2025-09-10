import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from 'src/app/shared-services/spinner.service';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

    constructor(public spinnerService: SpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const spinnerRef = this.spinnerService.start('loading...');
        return next.handle(req).pipe(
            finalize(() => this.spinnerService.stop(spinnerRef))
        );
    }
}
