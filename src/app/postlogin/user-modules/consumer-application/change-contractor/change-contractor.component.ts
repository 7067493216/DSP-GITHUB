import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PdfService } from '../../services/pdf.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ContractorChangePayload } from '../../models/contractorChangePayload';


@Component({
  selector: 'app-change-contractor',
  templateUrl: './change-contractor.component.html',
  styleUrls: ['./change-contractor.component.css']
})
export class ChangeContractorComponent implements OnInit {

  consumerApplicationDetail: any;
  contractorDetails: any;
  checkedBoolean: boolean = false;
  remarkForm: FormGroup;
  currentDate: string;
  currentUserName: any
  token: any
  docContractorReselctionFile:any;
  submitted:boolean = false

  // contractorChangePayload:ContractorChangePayload = new ContractorChangePayload();

  constructor(
    private spinnerService: SpinnerService,
    private url: GenerateUrl,
    private fb: FormBuilder,
    private http: HttpClient,
    private consumerApplicationService: ConsumerApplicationService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ChangeContractorComponent>,
    private pdfService: PdfService,

  ) {
    console.log(this.data.row, "ttttttttttttyyyyyyyyyyuuuuuuuuuuu");
    this.consumerApplicationDetail = this.data.row
    this.currentDate = this.formatDate(new Date());
    this.currentUserName = sessionStorage.getItem("currentUserName");
    console.log(this.currentUserName, "currentUserName");
    this.token = sessionStorage.getItem("usertoken");

  }

  formatDate(date: Date): string {
    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() + 1); // Months are 0-based in JS
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  buildForm() {
    this.remarkForm = this.fb.group({
      remark: ["", Validators.required],
      docContractorReselctionFile:["",Validators.required]
    })
  }

  ondocContractorReselctionFile(e:any){
    this.docContractorReselctionFile = e.target.files[0];
  }



  ngOnInit(): void {
    this.consumerApplicationService.getContractorDetails(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((contractor: any) => {
      if (contractor['code'] == "200") {
        this.contractorDetails = contractor['list'][0];
        console.log(' this contractor Details', this.contractorDetails);
      } else {
        console.log(contractor, "contractorcontractorcontractorcontractor");

      }
    })

    this.buildForm();

  }

  onCheckBoxChange(e: any) {
    console.log(e, "$$$$$$$$$$$$$event.............");
    this.checkedBoolean = e.target.checked

  }


  clickMethod(name: string) {
    if (confirm("Are you sure to change Contractor")) {
      console.log("Implement delete functionality here");
    }
  }

  onSubmit() {
    this.submitted = true

    if (this.remarkForm.invalid) {
      this.notificationService.error("Invalid Form !");
      return;
    }


    if (confirm("Are you sure you want to accept Contractor change request? Once submitted, this action can't be rollback.")) {


      let formData: FormData = new FormData();
      let gmAccepted = true
      formData.append("consumerApplicationNumber", this.consumerApplicationDetail?.consumerApplicationNo)
      formData.append("conReselectionDGMOANDMName", this.currentUserName)
      formData.append("conReselectionDate", this.currentDate)
      formData.append("conReselectionRemark", this.remarkForm.value.remark)
      formData.append("gmAccepted", "true");
      formData.append("docContractorReselctionFile", this.docContractorReselctionFile);

     
      this.consumerApplicationService.ContractorChangeRequestByDgm(formData, this.token).subscribe((response: any) => {
        console.log(response, "response.........................................................");
        if (response.code == "200") {
          this.notificationService.success("submitted Successfully");
          this.onClose();
        } else {
          this.notificationService.warn(response.message);
          return
        }

      }, (error: any) => {
        this.notificationService.warn(error);
        return
      }
      )


    }

  }



  onClose() {
    this.dialogRef.close();
  }


}
