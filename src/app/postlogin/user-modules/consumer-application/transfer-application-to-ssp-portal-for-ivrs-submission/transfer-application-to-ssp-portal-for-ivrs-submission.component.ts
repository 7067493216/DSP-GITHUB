import { Component, Inject, OnInit } from '@angular/core';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-transfer-application-to-ssp-portal-for-ivrs-submission',
  templateUrl: './transfer-application-to-ssp-portal-for-ivrs-submission.component.html',
  styleUrls: ['./transfer-application-to-ssp-portal-for-ivrs-submission.component.css']
})
export class TransferApplicationToSspPortalForIvrsSubmissionComponent implements OnInit {
  consumerApplicationDetail: any;
  checkBoolean:boolean = false;

  constructor(
    private spinnerService: SpinnerService,
    private url: GenerateUrl,
    private fb: FormBuilder,
    private http: HttpClient,
    private consumerApplicationService: ConsumerApplicationService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TransferApplicationToSspPortalForIvrsSubmissionComponent>,
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

  onSubmit() {
    if(this.checkBoolean==false){
      this.notificationService.warn("Please select checkbox first !");
      return
    }else{
      this.consumerApplicationService.transferApplicationToSspPortalForIvrsSubmission(this.consumerApplicationDetail?.consumerApplicationNo,this.consumerApplicationDetail?.applicationStatusId).subscribe((response: any) => {
        console.log(response, "rrrrrrrrrrrr");
        if (response?.code == "200") {
          this.notificationService.success(response?.message);
          this.onClose();
        } else {
          this.notificationService.warn(response?.message);
          return
        }
      })
    }
    
  }




}
