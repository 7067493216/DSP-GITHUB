import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReturnMaterialBigObject, ReturnMaterialMainObject, ReturnMaterialSmallObject } from '../../models/returnMaterialModel';
import { NotificationService } from 'src/app/shared-services/notification.service';

@Component({
  selector: 'app-return-material-component',
  templateUrl: './return-material-component.component.html',
  styleUrls: ['./return-material-component.component.css']
})
export class ReturnMaterialComponentComponent implements OnInit {

  returnMaterialForm: FormGroup;
  buttonDisableBoolean: boolean = false

  //   export class ReturnMaterialBigObject {
  //     rowName: any;
  //     consumerApplicationNumber: any;
  //     rowData: any
  // }

  // export class ReturnMaterialSmallObject {
  //     yearOfInstallation: any
  //     assetNo: any
  //     location: any
  //     quantity: any
  //     valueOfTimeOfInstallation: any
  //     consumerApplicationNumber: any

  // }

  // export class ReturnMaterialMainObject {
  //     returnMaterialData:any
  // }



  returnMaterialBigObject1: ReturnMaterialBigObject = new ReturnMaterialBigObject();
  returnMaterialBigObject2: ReturnMaterialBigObject = new ReturnMaterialBigObject();
  returnMaterialBigObject3: ReturnMaterialBigObject = new ReturnMaterialBigObject();
  returnMaterialBigObject4: ReturnMaterialBigObject = new ReturnMaterialBigObject();
  returnMaterialBigObject5: ReturnMaterialBigObject = new ReturnMaterialBigObject();
  returnMaterialBigObject6: ReturnMaterialBigObject = new ReturnMaterialBigObject();
  returnMaterialBigObject7: ReturnMaterialBigObject = new ReturnMaterialBigObject();
  returnMaterialBigObject8: ReturnMaterialBigObject = new ReturnMaterialBigObject();
  returnMaterialBigObject9: ReturnMaterialBigObject = new ReturnMaterialBigObject();

  returnMaterialSmallObject1: ReturnMaterialSmallObject = new ReturnMaterialSmallObject();
  returnMaterialSmallObject2: ReturnMaterialSmallObject = new ReturnMaterialSmallObject();
  returnMaterialSmallObject3: ReturnMaterialSmallObject = new ReturnMaterialSmallObject();
  returnMaterialSmallObject4: ReturnMaterialSmallObject = new ReturnMaterialSmallObject();
  returnMaterialSmallObject5: ReturnMaterialSmallObject = new ReturnMaterialSmallObject();
  returnMaterialSmallObject6: ReturnMaterialSmallObject = new ReturnMaterialSmallObject();
  returnMaterialSmallObject7: ReturnMaterialSmallObject = new ReturnMaterialSmallObject();
  returnMaterialSmallObject8: ReturnMaterialSmallObject = new ReturnMaterialSmallObject();
  returnMaterialSmallObject9: ReturnMaterialSmallObject = new ReturnMaterialSmallObject();

  returnMaterialMainObject: ReturnMaterialMainObject = new ReturnMaterialMainObject();

  finalArray: Array<any> = [];

  consumerApplicationDetail: any
  natureOfWorkTypeId: any;
  submitted: boolean = false;
  checkBoxBoolean1: boolean = true;
  checkBoxBoolean2: boolean = true;
  checkBoxBoolean3: boolean = true;
  checkBoxBoolean4: boolean = true;
  checkBoxBoolean5: boolean = true;
  checkBoxBoolean6: boolean = true;
  checkBoxBoolean7: boolean = true;
  checkBoxBoolean8: boolean = true;
  checkBoxBoolean9: boolean = true;


  constructor(
    private spinnerService: SpinnerService,
    private url: GenerateUrl,
    private fb: FormBuilder,
    private http: HttpClient,
    private consumerApplicationService: ConsumerApplicationService,
    private notificationService: NotificationService,
    // private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ReturnMaterialComponentComponent>,
  ) {
    this.consumerApplicationDetail = this.data.row;
    console.log(this.consumerApplicationDetail, "consumerApplicationDetail...consumerApplicationDetail....consumerApplicationDetail......consumerApplicationDetail");

    this.natureOfWorkTypeId = this.consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId;

    let accessLeveOfUser = sessionStorage.getItem('accessLeveOfUser');
    console.log(JSON.parse(accessLeveOfUser), ".......................fffffffff............");
    // this.accessLevelofStc = JSON.parse(accessLeveOfUser)
  }

  ngOnInit(): void {
    // this.FormBuild();
    this.returnMaterialForm = this.fb.group({
      yearOfInstallation1: ['', Validators.required],
      assetNo1: ['', Validators.required],
      location1: ['', Validators.required],
      quantity1: ['', Validators.required],
      valueOfTimeOfInstallation1: ['', Validators.required],

      yearOfInstallation2: ['', Validators.required],
      assetNo2: ['', Validators.required],
      location2: ['', Validators.required],
      quantity2: ['', Validators.required],
      valueOfTimeOfInstallation2: ['', Validators.required],

      yearOfInstallation3: ['', Validators.required],
      assetNo3: ['', Validators.required],
      location3: ['', Validators.required],
      quantity3: ['', Validators.required],
      valueOfTimeOfInstallation3: ['', Validators.required],

      yearOfInstallation4: ['', Validators.required],
      assetNo4: ['', Validators.required],
      location4: ['', Validators.required],
      quantity4: ['', Validators.required],
      valueOfTimeOfInstallation4: ['', Validators.required],

      yearOfInstallation5: ['', Validators.required],
      assetNo5: ['', Validators.required],
      location5: ['', Validators.required],
      quantity5: ['', Validators.required],
      valueOfTimeOfInstallation5: ['', Validators.required],

      yearOfInstallation6: ['', Validators.required],
      assetNo6: ['', Validators.required],
      location6: ['', Validators.required],
      quantity6: ['', Validators.required],
      valueOfTimeOfInstallation6: ['', Validators.required],

      yearOfInstallation7: ['', Validators.required],
      assetNo7: ['', Validators.required],
      location7: ['', Validators.required],
      quantity7: ['', Validators.required],
      valueOfTimeOfInstallation7: ['', Validators.required],

      yearOfInstallation8: ['', Validators.required],
      assetNo8: ['', Validators.required],
      location8: ['', Validators.required],
      quantity8: ['', Validators.required],
      valueOfTimeOfInstallation8: ['', Validators.required],

      yearOfInstallation9: ['', Validators.required],
      assetNo9: ['', Validators.required],
      location9: ['', Validators.required],
      quantity9: ['', Validators.required],
      valueOfTimeOfInstallation9: ['', Validators.required],

      ApplicationNo: [this.consumerApplicationDetail.consumerApplicationNo]

    })
  }

  get returnMaterialFormControls() {
    return this.returnMaterialForm.controls;
  }

  checkboxSelectionChange1(e: any) {
    console.log(e.target.checked, "1111111111111111111111111111111111111111111111");

    if (e.target.checked == true) {
      this.checkBoxBoolean1 = true;
      this.returnMaterialForm.controls['yearOfInstallation1'].enable();
      this.returnMaterialForm.controls['yearOfInstallation1'].reset();

      this.returnMaterialForm.controls['assetNo1'].enable();
      this.returnMaterialForm.controls['assetNo1'].reset();

      this.returnMaterialForm.controls['location1'].enable();
      this.returnMaterialForm.controls['location1'].reset();

      this.returnMaterialForm.controls['quantity1'].enable();
      this.returnMaterialForm.controls['quantity1'].reset();

      this.returnMaterialForm.controls['valueOfTimeOfInstallation1'].enable();
      this.returnMaterialForm.controls['valueOfTimeOfInstallation1'].reset();
    } else {
      this.checkBoxBoolean1 = false;
      this.returnMaterialForm.controls['yearOfInstallation1'].disable();
      this.returnMaterialForm.controls['yearOfInstallation1'].reset();

      this.returnMaterialForm.controls['assetNo1'].disable();
      this.returnMaterialForm.controls['assetNo1'].reset();

      this.returnMaterialForm.controls['location1'].disable();
      this.returnMaterialForm.controls['location1'].reset();

      this.returnMaterialForm.controls['quantity1'].disable();
      this.returnMaterialForm.controls['quantity1'].reset();

      this.returnMaterialForm.controls['valueOfTimeOfInstallation1'].disable();
      this.returnMaterialForm.controls['valueOfTimeOfInstallation1'].reset();
    }

  }

  checkboxSelectionChange2(e: any) {
    console.log(e.target.checked, "2222222222222222222222222222222222222222");

    if (e.target.checked == true) {
      this.checkBoxBoolean2 = true;
      this.returnMaterialForm.controls['yearOfInstallation2'].enable();
      this.returnMaterialForm.controls['yearOfInstallation2'].reset();

      this.returnMaterialForm.controls['assetNo2'].enable();
      this.returnMaterialForm.controls['assetNo2'].reset();

      this.returnMaterialForm.controls['location2'].enable();
      this.returnMaterialForm.controls['location2'].reset();

      this.returnMaterialForm.controls['quantity2'].enable();
      this.returnMaterialForm.controls['quantity2'].reset();

      this.returnMaterialForm.controls['valueOfTimeOfInstallation2'].enable();
      this.returnMaterialForm.controls['valueOfTimeOfInstallation2'].reset();
    } else {
      this.checkBoxBoolean2 = false;
      this.returnMaterialForm.controls['yearOfInstallation2'].disable();
      this.returnMaterialForm.controls['yearOfInstallation2'].reset();

      this.returnMaterialForm.controls['assetNo2'].disable();
      this.returnMaterialForm.controls['assetNo2'].reset();

      this.returnMaterialForm.controls['location2'].disable();
      this.returnMaterialForm.controls['location2'].reset();

      this.returnMaterialForm.controls['quantity2'].disable();
      this.returnMaterialForm.controls['quantity2'].reset();

      this.returnMaterialForm.controls['valueOfTimeOfInstallation2'].disable();
      this.returnMaterialForm.controls['valueOfTimeOfInstallation2'].reset();
    }


  }

  checkboxSelectionChange3(e: any) {
    console.log(e.target.checked, "333333333333333333333333333333333333");

    if (e.target.checked == true) {
      this.checkBoxBoolean3 = true;
      this.returnMaterialForm.controls['yearOfInstallation3'].enable();
      this.returnMaterialForm.controls['yearOfInstallation3'].reset();

      this.returnMaterialForm.controls['assetNo3'].enable();
      this.returnMaterialForm.controls['assetNo3'].reset();

      this.returnMaterialForm.controls['location3'].enable();
      this.returnMaterialForm.controls['location3'].reset();

      this.returnMaterialForm.controls['quantity3'].enable();
      this.returnMaterialForm.controls['quantity3'].reset();

      this.returnMaterialForm.controls['valueOfTimeOfInstallation3'].enable();
      this.returnMaterialForm.controls['valueOfTimeOfInstallation3'].reset();
    } else {
      this.checkBoxBoolean3 = false;
      this.returnMaterialForm.controls['yearOfInstallation3'].disable();
      this.returnMaterialForm.controls['yearOfInstallation3'].reset();

      this.returnMaterialForm.controls['assetNo3'].disable();
      this.returnMaterialForm.controls['assetNo3'].reset();

      this.returnMaterialForm.controls['location3'].disable();
      this.returnMaterialForm.controls['location3'].reset();

      this.returnMaterialForm.controls['quantity3'].disable();
      this.returnMaterialForm.controls['quantity3'].reset();

      this.returnMaterialForm.controls['valueOfTimeOfInstallation3'].disable();
      this.returnMaterialForm.controls['valueOfTimeOfInstallation3'].reset();
    }


  }

  checkboxSelectionChange4(e: any) {
    console.log(e.target.checked, "444444444444444444444444444444444444444444444444");

    if (e.target.checked == true) {
      this.checkBoxBoolean4 = true;
      this.returnMaterialForm.controls['yearOfInstallation4'].enable();
      this.returnMaterialForm.controls['yearOfInstallation4'].reset();

      this.returnMaterialForm.controls['assetNo4'].enable();
      this.returnMaterialForm.controls['assetNo4'].reset();

      this.returnMaterialForm.controls['location4'].enable();
      this.returnMaterialForm.controls['location4'].reset();

      this.returnMaterialForm.controls['quantity4'].enable();
      this.returnMaterialForm.controls['quantity4'].reset();

      this.returnMaterialForm.controls['valueOfTimeOfInstallation4'].enable();
      this.returnMaterialForm.controls['valueOfTimeOfInstallation4'].reset();
    } else {
      this.checkBoxBoolean4 = false;
      this.returnMaterialForm.controls['yearOfInstallation4'].disable();
      this.returnMaterialForm.controls['yearOfInstallation4'].reset();

      this.returnMaterialForm.controls['assetNo4'].disable();
      this.returnMaterialForm.controls['assetNo4'].reset();

      this.returnMaterialForm.controls['location4'].disable();
      this.returnMaterialForm.controls['location4'].reset();

      this.returnMaterialForm.controls['quantity4'].disable();
      this.returnMaterialForm.controls['quantity4'].reset();

      this.returnMaterialForm.controls['valueOfTimeOfInstallation4'].disable();
      this.returnMaterialForm.controls['valueOfTimeOfInstallation4'].reset();
    }


  }

  checkboxSelectionChange5(e: any) {
    console.log(e.target.checked, "555555555555555555555555555555555555555555555");

    if (e.target.checked == true) {
      this.checkBoxBoolean5 = true;
      this.returnMaterialForm.controls['yearOfInstallation5'].enable();
      this.returnMaterialForm.controls['yearOfInstallation5'].reset();

      this.returnMaterialForm.controls['assetNo5'].enable();
      this.returnMaterialForm.controls['assetNo5'].reset();

      this.returnMaterialForm.controls['location5'].enable();
      this.returnMaterialForm.controls['location5'].reset();

      this.returnMaterialForm.controls['quantity5'].enable();
      this.returnMaterialForm.controls['quantity5'].reset();

      this.returnMaterialForm.controls['valueOfTimeOfInstallation5'].enable();
      this.returnMaterialForm.controls['valueOfTimeOfInstallation5'].reset();
    } else {
      this.checkBoxBoolean5 = false;
      this.returnMaterialForm.controls['yearOfInstallation5'].disable();
      this.returnMaterialForm.controls['yearOfInstallation5'].reset();

      this.returnMaterialForm.controls['assetNo5'].disable();
      this.returnMaterialForm.controls['assetNo5'].reset();

      this.returnMaterialForm.controls['location5'].disable();
      this.returnMaterialForm.controls['location5'].reset();

      this.returnMaterialForm.controls['quantity5'].disable();
      this.returnMaterialForm.controls['quantity5'].reset();

      this.returnMaterialForm.controls['valueOfTimeOfInstallation5'].disable();
      this.returnMaterialForm.controls['valueOfTimeOfInstallation5'].reset();
    }


  }

  checkboxSelectionChange6(e: any) {
    console.log(e.target.checked, "6666666666666666666666666666666666666666666666");

    if (e.target.checked == true) {
      this.checkBoxBoolean6 = true;
      this.returnMaterialForm.controls['yearOfInstallation6'].enable();
      this.returnMaterialForm.controls['yearOfInstallation6'].reset();

      this.returnMaterialForm.controls['assetNo6'].enable();
      this.returnMaterialForm.controls['assetNo6'].reset();

      this.returnMaterialForm.controls['location6'].enable();
      this.returnMaterialForm.controls['location6'].reset();

      this.returnMaterialForm.controls['quantity6'].enable();
      this.returnMaterialForm.controls['quantity6'].reset();

      this.returnMaterialForm.controls['valueOfTimeOfInstallation6'].enable();
      this.returnMaterialForm.controls['valueOfTimeOfInstallation6'].reset();
    } else {
      this.checkBoxBoolean6 = false;
      this.returnMaterialForm.controls['yearOfInstallation6'].disable();
      this.returnMaterialForm.controls['yearOfInstallation6'].reset();

      this.returnMaterialForm.controls['assetNo6'].disable();
      this.returnMaterialForm.controls['assetNo6'].reset();

      this.returnMaterialForm.controls['location6'].disable();
      this.returnMaterialForm.controls['location6'].reset();

      this.returnMaterialForm.controls['quantity6'].disable();
      this.returnMaterialForm.controls['quantity6'].reset();

      this.returnMaterialForm.controls['valueOfTimeOfInstallation6'].disable();
      this.returnMaterialForm.controls['valueOfTimeOfInstallation6'].reset();
    }


  }

  checkboxSelectionChange7(e: any) {
    console.log(e.target.checked, "777777777777777777777777777777777777777777");

    if (e.target.checked == true) {
      this.checkBoxBoolean7 = true;
      this.returnMaterialForm.controls['yearOfInstallation7'].enable();
      this.returnMaterialForm.controls['yearOfInstallation7'].reset();

      this.returnMaterialForm.controls['assetNo7'].enable();
      this.returnMaterialForm.controls['assetNo7'].reset();

      this.returnMaterialForm.controls['location7'].enable();
      this.returnMaterialForm.controls['location7'].reset();

      this.returnMaterialForm.controls['quantity7'].enable();
      this.returnMaterialForm.controls['quantity7'].reset();

      this.returnMaterialForm.controls['valueOfTimeOfInstallation7'].enable();
      this.returnMaterialForm.controls['valueOfTimeOfInstallation7'].reset();
    } else {
      this.checkBoxBoolean7 = false;
      this.returnMaterialForm.controls['yearOfInstallation7'].disable();
      this.returnMaterialForm.controls['yearOfInstallation7'].reset();

      this.returnMaterialForm.controls['assetNo7'].disable();
      this.returnMaterialForm.controls['assetNo7'].reset();

      this.returnMaterialForm.controls['location7'].disable();
      this.returnMaterialForm.controls['location7'].reset();

      this.returnMaterialForm.controls['quantity7'].disable();
      this.returnMaterialForm.controls['quantity7'].reset();

      this.returnMaterialForm.controls['valueOfTimeOfInstallation7'].disable();
      this.returnMaterialForm.controls['valueOfTimeOfInstallation7'].reset();
    }


  }

  checkboxSelectionChange8(e: any) {
    console.log(e.target.checked, "88888888888888888888888888888888888888888");

    if (e.target.checked == true) {
      this.checkBoxBoolean8 = true;
      this.returnMaterialForm.controls['yearOfInstallation8'].enable();
      this.returnMaterialForm.controls['yearOfInstallation8'].reset();

      this.returnMaterialForm.controls['assetNo8'].enable();
      this.returnMaterialForm.controls['assetNo8'].reset();

      this.returnMaterialForm.controls['location8'].enable();
      this.returnMaterialForm.controls['location8'].reset();

      this.returnMaterialForm.controls['quantity8'].enable();
      this.returnMaterialForm.controls['quantity8'].reset();

      this.returnMaterialForm.controls['valueOfTimeOfInstallation8'].enable();
      this.returnMaterialForm.controls['valueOfTimeOfInstallation8'].reset();
    } else {
      this.checkBoxBoolean8 = false;
      this.returnMaterialForm.controls['yearOfInstallation8'].disable();
      this.returnMaterialForm.controls['yearOfInstallation8'].reset();

      this.returnMaterialForm.controls['assetNo8'].disable();
      this.returnMaterialForm.controls['assetNo8'].reset();

      this.returnMaterialForm.controls['location8'].disable();
      this.returnMaterialForm.controls['location8'].reset();

      this.returnMaterialForm.controls['quantity8'].disable();
      this.returnMaterialForm.controls['quantity8'].reset();

      this.returnMaterialForm.controls['valueOfTimeOfInstallation8'].disable();
      this.returnMaterialForm.controls['valueOfTimeOfInstallation8'].reset();
    }


  }

  checkboxSelectionChange9(e: any) {
    console.log(e.target.checked, "99999999999999999999999999999999999999999999999");

    if (e.target.checked == true) {
      this.checkBoxBoolean9 = true;
      this.returnMaterialForm.controls['yearOfInstallation9'].enable();
      this.returnMaterialForm.controls['yearOfInstallation9'].reset();

      this.returnMaterialForm.controls['assetNo9'].enable();
      this.returnMaterialForm.controls['assetNo9'].reset();

      this.returnMaterialForm.controls['location9'].enable();
      this.returnMaterialForm.controls['location9'].reset();

      this.returnMaterialForm.controls['quantity9'].enable();
      this.returnMaterialForm.controls['quantity9'].reset();

      this.returnMaterialForm.controls['valueOfTimeOfInstallation9'].enable();
      this.returnMaterialForm.controls['valueOfTimeOfInstallation9'].reset();
    } else {
      this.checkBoxBoolean9 = false;
      this.returnMaterialForm.controls['yearOfInstallation9'].disable();
      this.returnMaterialForm.controls['yearOfInstallation9'].reset();

      this.returnMaterialForm.controls['assetNo9'].disable();
      this.returnMaterialForm.controls['assetNo9'].reset();

      this.returnMaterialForm.controls['location9'].disable();
      this.returnMaterialForm.controls['location9'].reset();

      this.returnMaterialForm.controls['quantity9'].disable();
      this.returnMaterialForm.controls['quantity9'].reset();

      this.returnMaterialForm.controls['valueOfTimeOfInstallation9'].disable();
      this.returnMaterialForm.controls['valueOfTimeOfInstallation9'].reset();
    }


  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitted = true;
    this.finalArray = [];
    console.log(this.returnMaterialForm, "55555555555555555555555555555555555555555");

    if (this.returnMaterialForm.invalid) {
      this.notificationService.error("Invalid Form !");
      return
    } else {

      this.returnMaterialSmallObject1.yearOfInstallation = this.returnMaterialForm.value.yearOfInstallation1;
      this.returnMaterialSmallObject1.assetNo = this.returnMaterialForm.value.assetNo1
      this.returnMaterialSmallObject1.location = this.returnMaterialForm.value.location1
      this.returnMaterialSmallObject1.quantity = this.returnMaterialForm.value.quantity1
      this.returnMaterialSmallObject1.valueOfTimeOfInstallation = this.returnMaterialForm.value.valueOfTimeOfInstallation1
      this.returnMaterialSmallObject1.consumerApplicationNumber = this.returnMaterialForm.value.ApplicationNo;  /// accountCode
      this.returnMaterialSmallObject1.accountCode = 10.544

      this.returnMaterialSmallObject2.yearOfInstallation = this.returnMaterialForm.value.yearOfInstallation2;
      this.returnMaterialSmallObject2.assetNo = this.returnMaterialForm.value.assetNo2
      this.returnMaterialSmallObject2.location = this.returnMaterialForm.value.location2
      this.returnMaterialSmallObject2.quantity = this.returnMaterialForm.value.quantity2
      this.returnMaterialSmallObject2.valueOfTimeOfInstallation = this.returnMaterialForm.value.valueOfTimeOfInstallation2
      this.returnMaterialSmallObject2.consumerApplicationNumber = this.returnMaterialForm.value.ApplicationNo
      this.returnMaterialSmallObject2.accountCode = 10.545

      this.returnMaterialSmallObject3.yearOfInstallation = this.returnMaterialForm.value.yearOfInstallation3;
      this.returnMaterialSmallObject3.assetNo = this.returnMaterialForm.value.assetNo3
      this.returnMaterialSmallObject3.location = this.returnMaterialForm.value.location3
      this.returnMaterialSmallObject3.quantity = this.returnMaterialForm.value.quantity3
      this.returnMaterialSmallObject3.valueOfTimeOfInstallation = this.returnMaterialForm.value.valueOfTimeOfInstallation3
      this.returnMaterialSmallObject3.consumerApplicationNumber = this.returnMaterialForm.value.ApplicationNo
      this.returnMaterialSmallObject3.accountCode = 10.546

      this.returnMaterialSmallObject4.yearOfInstallation = this.returnMaterialForm.value.yearOfInstallation4;
      this.returnMaterialSmallObject4.assetNo = this.returnMaterialForm.value.assetNo4
      this.returnMaterialSmallObject4.location = this.returnMaterialForm.value.location4
      this.returnMaterialSmallObject4.quantity = this.returnMaterialForm.value.quantity4
      this.returnMaterialSmallObject4.valueOfTimeOfInstallation = this.returnMaterialForm.value.valueOfTimeOfInstallation4
      this.returnMaterialSmallObject4.consumerApplicationNumber = this.returnMaterialForm.value.ApplicationNo
      this.returnMaterialSmallObject4.accountCode = 10.601

      this.returnMaterialSmallObject5.yearOfInstallation = this.returnMaterialForm.value.yearOfInstallation5;
      this.returnMaterialSmallObject5.assetNo = this.returnMaterialForm.value.assetNo5
      this.returnMaterialSmallObject5.location = this.returnMaterialForm.value.location5
      this.returnMaterialSmallObject5.quantity = this.returnMaterialForm.value.quantity5
      this.returnMaterialSmallObject5.valueOfTimeOfInstallation = this.returnMaterialForm.value.valueOfTimeOfInstallation5
      this.returnMaterialSmallObject5.consumerApplicationNumber = this.returnMaterialForm.value.ApplicationNo
      this.returnMaterialSmallObject5.accountCode = 10.602

      this.returnMaterialSmallObject6.yearOfInstallation = this.returnMaterialForm.value.yearOfInstallation6;
      this.returnMaterialSmallObject6.assetNo = this.returnMaterialForm.value.assetNo6
      this.returnMaterialSmallObject6.location = this.returnMaterialForm.value.location6
      this.returnMaterialSmallObject6.quantity = this.returnMaterialForm.value.quantity6
      this.returnMaterialSmallObject6.valueOfTimeOfInstallation = this.returnMaterialForm.value.valueOfTimeOfInstallation6
      this.returnMaterialSmallObject6.consumerApplicationNumber = this.returnMaterialForm.value.ApplicationNo
      this.returnMaterialSmallObject6.accountCode = 10.603

      this.returnMaterialSmallObject7.yearOfInstallation = this.returnMaterialForm.value.yearOfInstallation7;
      this.returnMaterialSmallObject7.assetNo = this.returnMaterialForm.value.assetNo7
      this.returnMaterialSmallObject7.location = this.returnMaterialForm.value.location7
      this.returnMaterialSmallObject7.quantity = this.returnMaterialForm.value.quantity7
      this.returnMaterialSmallObject7.valueOfTimeOfInstallation = this.returnMaterialForm.value.valueOfTimeOfInstallation7
      this.returnMaterialSmallObject7.consumerApplicationNumber = this.returnMaterialForm.value.ApplicationNo
      this.returnMaterialSmallObject7.accountCode = 10.622

      this.returnMaterialSmallObject8.yearOfInstallation = this.returnMaterialForm.value.yearOfInstallation8;
      this.returnMaterialSmallObject8.assetNo = this.returnMaterialForm.value.assetNo8
      this.returnMaterialSmallObject8.location = this.returnMaterialForm.value.location8
      this.returnMaterialSmallObject8.quantity = this.returnMaterialForm.value.quantity8
      this.returnMaterialSmallObject8.valueOfTimeOfInstallation = this.returnMaterialForm.value.valueOfTimeOfInstallation8
      this.returnMaterialSmallObject8.consumerApplicationNumber = this.returnMaterialForm.value.ApplicationNo
      this.returnMaterialSmallObject8.accountCode = 10.623

      this.returnMaterialSmallObject9.yearOfInstallation = this.returnMaterialForm.value.yearOfInstallation9;
      this.returnMaterialSmallObject9.assetNo = this.returnMaterialForm.value.assetNo9
      this.returnMaterialSmallObject9.location = this.returnMaterialForm.value.location9
      this.returnMaterialSmallObject9.quantity = this.returnMaterialForm.value.quantity9
      this.returnMaterialSmallObject9.valueOfTimeOfInstallation = this.returnMaterialForm.value.valueOfTimeOfInstallation9
      this.returnMaterialSmallObject9.consumerApplicationNumber = this.returnMaterialForm.value.ApplicationNo
      this.returnMaterialSmallObject9.accountCode = 10.631

      //////////////////////////////////////////

      this.returnMaterialBigObject1.consumerApplicationNumber = this.returnMaterialForm.value.ApplicationNo;
      this.returnMaterialBigObject1.rowName = 'SUBSTATION TRANSFORMER & KIOSKS 100 KV & ABOVE'; // accountCode
      this.returnMaterialBigObject1.rowData = this.returnMaterialSmallObject1;
      this.returnMaterialBigObject1.accountCode = 10.544
      if (this.checkBoxBoolean1 == true) {
        this.finalArray.push(this.returnMaterialBigObject1);
      }


      this.returnMaterialBigObject2.consumerApplicationNumber = this.returnMaterialForm.value.ApplicationNo;
      this.returnMaterialBigObject2.rowName = 'SUBSTATION TRANSFORMER & KIOSKS BELOW 100 KV'
      this.returnMaterialBigObject2.rowData = this.returnMaterialSmallObject2;
      this.returnMaterialBigObject2.accountCode = 10.545
      if (this.checkBoxBoolean2 == true) {
        this.finalArray.push(this.returnMaterialBigObject2);
      }


      this.returnMaterialBigObject3.consumerApplicationNumber = this.returnMaterialForm.value.ApplicationNo;
      this.returnMaterialBigObject3.rowName = 'LINE TRANSFORMER BELOW 100 KVA'
      this.returnMaterialBigObject3.rowData = this.returnMaterialSmallObject3;
      this.returnMaterialBigObject3.accountCode = 10.546
      if (this.checkBoxBoolean3 == true) {
        this.finalArray.push(this.returnMaterialBigObject3);
      }


      this.returnMaterialBigObject4.consumerApplicationNumber = this.returnMaterialForm.value.ApplicationNo;
      this.returnMaterialBigObject4.rowName = 'OVERHEAD LINES ON STEEL SUPPORT AT VOLTAGE > 66 KV'
      this.returnMaterialBigObject4.rowData = this.returnMaterialSmallObject4;
      this.returnMaterialBigObject4.accountCode = 10.601
      if (this.checkBoxBoolean4 == true) {
        this.finalArray.push(this.returnMaterialBigObject4);
      }


      this.returnMaterialBigObject5.consumerApplicationNumber = this.returnMaterialForm.value.ApplicationNo;
      this.returnMaterialBigObject5.rowName = 'OVERHEAD LINES ON STEEL SUPPORT AT VOL.BL. 132 &66'
      this.returnMaterialBigObject5.rowData = this.returnMaterialSmallObject5;
      this.returnMaterialBigObject5.accountCode = 10.602
      if (this.checkBoxBoolean5 == true) {
        this.finalArray.push(this.returnMaterialBigObject5);
      }


      this.returnMaterialBigObject6.consumerApplicationNumber = this.returnMaterialForm.value.ApplicationNo;
      this.returnMaterialBigObject6.rowName = 'OVERHEAD LINES ON R.C. SUPPORT'
      this.returnMaterialBigObject6.rowData = this.returnMaterialSmallObject6;
      this.returnMaterialBigObject6.accountCode = 10.603
      if (this.checkBoxBoolean6 == true) {
        this.finalArray.push(this.returnMaterialBigObject6);
      }


      this.returnMaterialBigObject7.consumerApplicationNumber = this.returnMaterialForm.value.ApplicationNo;
      this.returnMaterialBigObject7.rowName = 'LINE CABLE NETWORK UNDER KMPS'
      this.returnMaterialBigObject7.rowData = this.returnMaterialSmallObject7;
      this.returnMaterialBigObject7.accountCode = 10.622
      if (this.checkBoxBoolean7 == true) {
        this.finalArray.push(this.returnMaterialBigObject7);
      }


      this.returnMaterialBigObject8.consumerApplicationNumber = this.returnMaterialForm.value.ApplicationNo;
      this.returnMaterialBigObject8.rowName = 'LINE CABLE NETWORK UNDER KAY'
      this.returnMaterialBigObject8.rowData = this.returnMaterialSmallObject8;
      this.returnMaterialBigObject8.accountCode = 10.623
      if (this.checkBoxBoolean8 == true) {
        this.finalArray.push(this.returnMaterialBigObject8);
      }


      this.returnMaterialBigObject9.consumerApplicationNumber = this.returnMaterialForm.value.ApplicationNo;
      this.returnMaterialBigObject9.rowName = 'METERING EQUIPMENTS'
      this.returnMaterialBigObject9.rowData = this.returnMaterialSmallObject9;
      this.returnMaterialBigObject9.accountCode = 10.631
      if (this.checkBoxBoolean9 == true) {
        this.finalArray.push(this.returnMaterialBigObject9);
      }


      console.log(this.finalArray, "this.finalArray..........................................");


      this.returnMaterialMainObject.returnMaterialData = this.finalArray;

      this.consumerApplicationService.returnMaterialSubmit(this.returnMaterialMainObject).subscribe((data: any) => {
        console.log(data, "daattaaaaa.....................................................................");
        if (data.code == "200") {
          this.notificationService.success("Data Submitted Successfully !");
          this.buttonDisableBoolean = true;
          this.onClose();
        } else {
          this.notificationService.warn(data.message);
          this.buttonDisableBoolean = false;
          return
        }

      }, (error: any) => {
        this.notificationService.error(error);
        this.buttonDisableBoolean = false;
        return
      }
      )

    }


  }

}

