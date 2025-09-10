import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IvrsConfirmationByJePayload } from '../../models/ivrsConfirmationByJePayload';

@Component({
  selector: 'app-ivrs-confirmation-by-je',
  templateUrl: './ivrs-confirmation-by-je.component.html',
  styleUrls: ['./ivrs-confirmation-by-je.component.css']
})
export class IvrsConfirmationByJeComponent implements OnInit {

  consumerApplicationDetail: any;
  supplyVoltageString: string = '';
  natureOfWorkTypeId: any;
  ivrsConfirmationByJePayload: IvrsConfirmationByJePayload = new IvrsConfirmationByJePayload();
  ivrsDetails: any;
  ivrsForm: FormGroup;
  isFormSubmit: boolean = false;
  GetDetailsBoolean: boolean = false;
  checkBoxSelectBoolean: boolean = false;
  newCheckBoxSelectBoolean:boolean = false;


  constructor(
    private spinnerService: SpinnerService,
    private url: GenerateUrl,
    private fb: FormBuilder,
    private http: HttpClient,
    private consumerApplicationService: ConsumerApplicationService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<IvrsConfirmationByJeComponent>,
  ) {
    this.consumerApplicationDetail = this.data.row;
    console.log(this.consumerApplicationDetail, "consumerApplicationDetail...consumerApplicationDetail....consumerApplicationDetail......consumerApplicationDetail");
    this.natureOfWorkTypeId = this.consumerApplicationDetail?.natureOfWorkTypeId;
    let accessLeveOfUser = sessionStorage.getItem('accessLeveOfUser');
  }

  ngOnInit(): void {
    this.buildForm()

  }

  onNewCheckboxSelect(e:any){
    console.log(e,"eee,,,,,,,,,,,,,,,,"); 
    this.newCheckBoxSelectBoolean = e.checked;
    if(this.newCheckBoxSelectBoolean==false){
      this.ivrsForm.get("ivrsNo").disable();
    }else{
      this.ivrsForm.get("ivrsNo").enable();
    }
    
  }

  buildForm() {
    this.ivrsForm = this.fb.group({
      ivrsNo: ['', Validators.compose([Validators.required, Validators.maxLength(11), Validators.pattern("^[NH][0-9_-]{10,10}$")])]
    });
    this.ivrsForm.get("ivrsNo").disable();
  }

  get ivrsFormControls() {
    return this.ivrsForm.controls;
  }

  onClose() {
    this.dialogRef.close();
  }

  getDetailsByIvrsNo() {
    // let ivrsNoNew = "N2412025890"
    this.consumerApplicationService.getDetailsByIvrsNo(this.ivrsForm.value.ivrsNo).subscribe((resp: any) => {
      console.log(resp, ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
      if (resp?.status == 200) {
        this.notificationService.success("Data Retrieve Successfully...");
        this.ivrsDetails = resp?.object[0];
        this.GetDetailsBoolean = true
      } else {
        this.notificationService.warn(resp?.message);
        return
      }
    })
  }



  onGetDetails() {
    this.getDetailsByIvrsNo();
  }

  onSubmit() {
    this.isFormSubmit = true
    this.ivrsConfirmationByJePayload.address = this.ivrsDetails.address;
    this.ivrsConfirmationByJePayload.connectionDate = this.ivrsDetails.connection_date;
    this.ivrsConfirmationByJePayload.connectionType = this.ivrsDetails.connection_type;
    this.ivrsConfirmationByJePayload.consumerApplicationNo = this.consumerApplicationDetail.consumerApplicationNo;
    this.ivrsConfirmationByJePayload.consumerName = this.ivrsDetails.consumer_name
    this.ivrsConfirmationByJePayload.contractDemand = this.ivrsDetails.contract_demand
    this.ivrsConfirmationByJePayload.contractDemandUnit = this.ivrsDetails.contract_demand_unit
    this.ivrsConfirmationByJePayload.createdOn = this.ivrsDetails.created_on
    this.ivrsConfirmationByJePayload.dtrName = this.ivrsDetails.dtr_name
    this.ivrsConfirmationByJePayload.feederName = this.ivrsDetails.feeder_name
    this.ivrsConfirmationByJePayload.groupNo = this.ivrsDetails.group_no
    this.ivrsConfirmationByJePayload.ivrs = this.ivrsDetails.ivrs
    this.ivrsConfirmationByJePayload.locationCode = this.ivrsDetails.location_code
    this.ivrsConfirmationByJePayload.meteringStatus = this.ivrsDetails.metering_status
    this.ivrsConfirmationByJePayload.phase = this.ivrsDetails.phase
    this.ivrsConfirmationByJePayload.premiseType = this.ivrsDetails.premise_type
    this.ivrsConfirmationByJePayload.primaryMobileNo = this.ivrsDetails.primary_mobile_no
    this.ivrsConfirmationByJePayload.purposeOfInstallation = this.ivrsDetails.purpose_of_installation
    this.ivrsConfirmationByJePayload.readingDiaryNo = this.ivrsDetails.reading_diary_no
    this.ivrsConfirmationByJePayload.sanctionedLoad = this.ivrsDetails.sanctioned_load
    this.ivrsConfirmationByJePayload.sanctionedLoadUnit = this.ivrsDetails.sanctioned_load_unit
    this.ivrsConfirmationByJePayload.tariffCategory = this.ivrsDetails.tariff_category
    this.ivrsConfirmationByJePayload.tariffCode = this.ivrsDetails.tariff_code

    this.consumerApplicationService.ivrsConfirmationByJe(this.ivrsConfirmationByJePayload).subscribe((response: any) => {
      console.log(response, "response...................");
      if (response?.code == "201") {
        this.notificationService.success(response?.message);
        this.onClose();
      } else {
        this.notificationService.warn(response?.message);
        return
      }
    })
  }

  onCheckboxSelect(e: any) {
    console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeee...............");
    this.checkBoxSelectBoolean = e.checked
  }

  

}
