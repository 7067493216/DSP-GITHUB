import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-revise-demand-details',
  templateUrl: './revise-demand-details.component.html',
  styleUrls: ['./revise-demand-details.component.css']
})
export class ReviseDemandDetailsComponent implements OnInit {

  consumerApplicationDetail:any
  natureOfWorkTypeId:any;
  erpReviseData:any
  openTableBoolean:boolean = false

  constructor(
    private spinnerService: SpinnerService,
    private url: GenerateUrl,
    private http: HttpClient,
    private fb: FormBuilder,
    private pdfService: PdfService,
    private consumerApplicationService: ConsumerApplicationService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ReviseDemandDetailsComponent>,
  ) {
    this.consumerApplicationDetail = this.data.row;
    console.log(this.consumerApplicationDetail, "this.consumerApplicationDetail ............");
    this.natureOfWorkTypeId = this.consumerApplicationDetail.natureOfWorkTypeId
  }

  ngOnInit(): void {

    this.consumerApplicationService.getErpRevisedData(this.consumerApplicationDetail.revisedErpNumber, this.consumerApplicationDetail.consumerApplicationNo, 1).subscribe((response:any)=>{
      console.log(response,"addddddddddddddddddaaaaaaaaaaaaattttttttttttttaaaaaaaaaaaaaaa............................");
      if (response?.code == "200") {
        this.erpReviseData = response.list[0];
        this.notificationService.success("! Data Retrieve Successfully")
        console.log(this.erpReviseData, "erpReviseData............");
        this.openTableBoolean = true
      } else {
        this.openTableBoolean = false;
        this.erpReviseData = null;
        this.notificationService.error("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
        return
      }
    })
  }


  onClose() {
    this.dialogRef.close();
  }

  downloadPdf(): void {
   
     this.pdfService.generatePdf('elementIdToCapture', 'Revise-Demand-Details.pdf');
  

  }

}
