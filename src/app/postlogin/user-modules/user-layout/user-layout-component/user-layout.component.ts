import { Component, OnInit } from '@angular/core';
import { fromEvent, merge, Observable, ReplaySubject, Subject, Subscription, timer } from 'rxjs';
import { startWith, switchMapTo, takeUntil } from 'rxjs/operators';

import { DialogService } from 'src/app/shared-services/dialog.service';
import { UserLoginService } from '../../services/user-login.service';

@Component({
    selector: 'app-user-layout',
    templateUrl: './user-layout.component.html',
    styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {

    title = 'DEPOSIT-SCHEME_ANGULAR';
    isLoggedIn: boolean = false;
    // session-timeout-related
    // unsubscribe$: Subject<void> = new Subject();
    sessionHandling: Subscription;
    click$: Observable<any>;
    keyboard$: Observable<any>;
    // session-timeout-related close
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    constructor(
        public userLoginService: UserLoginService,
        private dialogService: DialogService,
    ) {
    }

    ngOnInit() {
        console.log('hello');
        console.log('userLoginService', this.userLoginService.currentUserName);
        console.info("%cStop!", "color: red; font-size: 3rem; font-weight:bold;");
        console.info("%cThis is a browser feature intended for developers.\nUsing this console may allow attackers to impersonate you and steal your information using an attack called Self_XSS.\nDo not enter or paste code that you do not understand", "font-weight:bold;");
        /******************vivek 16-10-2022 */
        this.userLoginService.isAuthenticated();
        /******************vivek 16-10-2022 */


        // this.resetTimer();
        this.userLoginService.isLoggedIn.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
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
            if (this.userLoginService.currentUserName !== null) {
                this.dialogService.openTimeoutDialog('')
                    .afterClosed().subscribe(res => {
                        if (res) {
                            this.userLoginService.logout();
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