import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../postlogin/message-pages/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }



  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  };
  noDurationConfig: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'top'
  };

  public success(message: string) {
    this.config.panelClass = ['notification','success'];
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message: message, snackType: 'success' },
      ... this.config
    });
  }
  public warn(message: string) {
    this.config.panelClass = ['notification','warn'];
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message: message, snackType: 'warn' },
      ... this.config
    });
  }
  public error(message: string) {
    this.config.panelClass = ['notification','error'];
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message: message, snackType: 'error' },
      ... this.config
    });
  }
  public info(message: string) {
    this.config.panelClass = ['notification','info'];
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message: message, snackType: 'info' },
      ... this.config
    });
  }

  public noDurationSuccess(message: string) {
    this.noDurationConfig.panelClass = ['notification','success'];
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message: message, snackType: 'success' },
      ... this.noDurationConfig
    });
  }
  public noDurationWarn(message: string) {
    this.noDurationConfig.panelClass = ['notification','warn'];
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message: message, snackType: 'warn' },
      ... this.noDurationConfig
    });
  }
}
