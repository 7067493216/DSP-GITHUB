import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConeectionPraddaiForNgbComponent } from '../coneection-praddai-for-ngb/coneection-praddai-for-ngb.component';

@Component({
  selector: 'app-popup-for-confirmation-for-ngb-data-push',
  templateUrl: './popup-for-confirmation-for-ngb-data-push.component.html',
  styleUrls: ['./popup-for-confirmation-for-ngb-data-push.component.css']
})
export class PopupForConfirmationForNgbDataPushComponent implements OnInit {

   consumerApplicationDetail: any;
    checkBoolean:boolean = false;
  
    constructor(
      private spinnerService: SpinnerService,
      private url: GenerateUrl,
      private fb: FormBuilder,
      private http: HttpClient,
      private dialog: MatDialog,
      private consumerApplicationService: ConsumerApplicationService,
      private notificationService: NotificationService,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<PopupForConfirmationForNgbDataPushComponent>,
    ) {
      this.consumerApplicationDetail = this.data.row;
      console.log(this.consumerApplicationDetail, "consumerApplicationDetail...consumerApplicationDetail....consumerApplicationDetail......consumerApplicationDetail");
    }
  
    ngOnInit(): void {
  
    }
  
    onClose() {
      this.dialogRef.close();
    }
  
    onCheckboxSelection(e:any){
      console.log(e,"eeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      this.checkBoolean = e.checked;
      
    }

    onSubmit(){
      if(this.checkBoolean==true){
 const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '90vw';
      dialogConfig.height = '90vh';
      dialogConfig.data = { row: this.consumerApplicationDetail };
      const dialogRef = this.dialog.open(ConeectionPraddaiForNgbComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
         this.onClose();
      });
      }else{
        this.notificationService.warn("please select checkbox first !");
        return
      }
    }
  

}
