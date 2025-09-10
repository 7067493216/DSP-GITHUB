import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-request-handler-dialog',
  templateUrl: './request-handler-dialog.component.html',
  styleUrls: ['./request-handler-dialog.component.css']
})
export class RequestHandlerDialogComponent implements OnInit {
dialogData:any={};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<RequestHandlerDialogComponent>
  ) { }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close(this.dialogData);
  }
  onClickReject(){
    this.dialogData.approved= false;
    this.dialogData.rejected= true;
    this.dialogRef.close(this.dialogData);
  }
  onClickApprove (){
    this.dialogData.approved= true;
    this.dialogData.rejected= false;
    this.dialogRef.close(this.dialogData);  
  }
}
