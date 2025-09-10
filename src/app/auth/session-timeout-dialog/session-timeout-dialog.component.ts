import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { ConsumerLoginService } from '../authservices/consumer-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-timeout-dialog',
  templateUrl: './session-timeout-dialog.component.html',
  styleUrls: ['./session-timeout-dialog.component.css']
})
export class SessionTimeoutDialogComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<SessionTimeoutDialogComponent>,
    // private consumerLoginService: ConsumerLoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.startTimer();
  }
  progressbarValue = 300;
  timeLeft: number = 300;
  timer: string = '5:00';
  interval;



  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.timer = new Date(this.timeLeft * 1000).toISOString().substr(14, 5)


        this.progressbarValue = this.timeLeft * 100 / 300;
      } else {
        this.pauseTimer();
        this.closeDialog();

        // this.consumerLoginService.logout();

      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  


  closeDialog() {
    this.dialogRef.close(false);
    this.pauseTimer();
    
    

  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
