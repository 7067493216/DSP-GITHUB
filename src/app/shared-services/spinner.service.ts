import { EventEmitter, Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinnerViewComponent } from '../postlogin/message-pages/spinner-view/spinner-view.component';

@Injectable()
export class SpinnerService {
    constructor(private router: Router, private dialog: MatDialog) {
    }
    start(message?): MatDialogRef<SpinnerViewComponent> {

        const dialogRef = this.dialog.open(SpinnerViewComponent, {
            disableClose: true,
            data: message === '' || message === undefined ? 'Loading...' : message
        });
        return dialogRef;
    }

    stop(ref: MatDialogRef<SpinnerViewComponent>) {
        ref.close();
    }
}
