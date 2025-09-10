
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../postlogin/message-pages/mat-confirm-dialog/mat-confirm-dialog.component';
import { SessionTimeoutDialogComponent } from '../auth/session-timeout-dialog/session-timeout-dialog.component';
import { RequestHandlerDialogComponent } from '../postlogin/message-pages/request-handler-dialog/request-handler-dialog.component';
import { DialogWithRemarkHandlerDialogComponent } from '../postlogin/message-pages/dialog-with-remark-handler-dialog/dialog-with-remark-handler-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openTimeoutDialog(msg) {
    return this.dialog.open(SessionTimeoutDialogComponent, {
      width: '600px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: '50px' },
      data: {
        message: msg
      }
    });
  }
  openConfirmDialog(msg) {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '430px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: '50px' },
      data: {
        message: msg
      }
    });
  }
  openRequestHandlerDialog(isIndoreDiscom,remark,description?,JeRemark?,aoRemark?) {
    return this.dialog.open(RequestHandlerDialogComponent, {
      width: '700px',
      // panelClass: 'confirm-dialog-container',
      disableClose: true,
      // position: { top: '50px' },
      data: {
        isIndoreDiscom:isIndoreDiscom,
        remark: remark,
        description:description,
        jeRemark:JeRemark,
        aoRemark:aoRemark
      }
    });
  }
  dialogwithRemarkHandlerDialog(header,buttonName) {
    return this.dialog.open(DialogWithRemarkHandlerDialogComponent, {
      width: '700px',
      disableClose: true,
      data: {
        header:header,
        buttonName:buttonName
      }
    });
  }
}
