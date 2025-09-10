import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-with-remark-handler-dialog',
  templateUrl: './dialog-with-remark-handler-dialog.component.html',
  styleUrls: ['./dialog-with-remark-handler-dialog.component.css']
})
export class DialogWithRemarkHandlerDialogComponent implements OnInit {
  dialogData:any={};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DialogWithRemarkHandlerDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
  onSubmit(){
    this.dialogRef.close(this.dialogData);
  }

}
