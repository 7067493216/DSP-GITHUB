import { Component, Inject, OnInit } from '@angular/core';
import { NewApplicationService } from '../../services/new-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-load-enhancement-application-rejection',
  templateUrl: './load-enhancement-application-rejection.component.html',
  styleUrls: ['./load-enhancement-application-rejection.component.css']
})
export class LoadEnhancementApplicationRejectionComponent implements OnInit {

  checkboxBoolean: boolean = false;

  constructor(
    private newApplicationService: NewApplicationService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<LoadEnhancementApplicationRejectionComponent>,
  ) {

  }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }


  onCheckboxSelection(e: any) {
    this.checkboxBoolean = e.value
  }

  onSubmit() {
    if (this.checkboxBoolean == false) {
      this.notificationService.error("Please Select Checkbox First !");
      return
    }

    this.newApplicationService.applicationRejectionForLoadEnhancement(this.data.row.consumerApplicationNo).subscribe((resp: any) => {
      console.log(resp, ".....................................");
      if (resp?.code == "204" || resp?.code == "200" || resp?.code == "201") {
        this.notificationService.success(resp?.message);
        this.onClose();
      } else {
        this.notificationService.error(resp?.message);
        return
      }
    })

  }

}
