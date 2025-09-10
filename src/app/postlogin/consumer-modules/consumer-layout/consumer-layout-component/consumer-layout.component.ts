import { Component, OnInit } from '@angular/core';
import { fromEvent, merge, Observable, ReplaySubject, Subscription, timer } from 'rxjs';
import { startWith, switchMapTo, takeUntil } from 'rxjs/operators';

import { DialogService } from 'src/app/shared-services/dialog.service';
import { ConsumerLoginService } from '../../services/consumer-login.service';


@Component({
    selector: 'app-consumer-layout',
    templateUrl: './consumer-layout.component.html',
    styleUrls: ['./consumer-layout.component.css']
})
export class ConsumerLayoutComponent implements OnInit {

 
    title = 'DEPOSIT-SCHEME_ANGULAR';
    isLoggedIn: boolean = false;
    // session-timeout-related
    sessionHandling: Subscription;
    click$: Observable<any>;
    keyboard$: Observable<any>;
    // session-timeout-related close
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    constructor(
        public consumerLoginService: ConsumerLoginService,
        private dialogService: DialogService,
    ) {
    }

    ngOnInit() {
        console.log('hello ');
        console.log('userLoginService', this.consumerLoginService.currentConsumerName);
        console.info("%cStop!", "color: red; font-size: 3rem; font-weight:bold;");
        console.info("%cThis is a browser feature intended for developers.\nUsing this console may allow attackers to impersonate you and steal your information using an attack called Self_XSS.\nDo not enter or paste code that you do not understand", "font-weight:bold;");
        /******************vivek 16-10-2022 */
        this.consumerLoginService.isAuthenticated();
        /******************vivek 16-10-2022 */


        // this.resetTimer();
        this.consumerLoginService.isLoggedIn.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
            this.isLoggedIn = value;
            // if (value) {
            //     this.resetTimer();
            // }
        });
    }
    //  Session timeOut Pop Up related
    resetTimer() {
        this.click$ = fromEvent(document, 'click');
        this.keyboard$ = fromEvent(document, 'keyup')
        const warningTime = timer(30 * 60000)
        this.sessionHandling = merge(this.click$, this.keyboard$).pipe(startWith(undefined), switchMapTo(warningTime)).subscribe(x => {
            this.sessionHandling.unsubscribe()
            if (this.consumerLoginService.currentConsumerName !== null) {
                this.dialogService.openTimeoutDialog('')
                    .afterClosed().subscribe(res => {
                        if (res) {
                            this.consumerLoginService.logout();
                            this.ngOnDestroy();
                        } else {
                            this.resetTimer()
                        }
                    });
            }
        }
        );
    }

    async ngOnDestroy() {
        this.destroyed$?.next(true);
        this.destroyed$?.complete();
        this.sessionHandling?.unsubscribe()
    }

}  