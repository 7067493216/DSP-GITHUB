import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { StcRemarkComponent } from '../stc-remark/stc-remark.component';

@Component({
  selector: 'app-je-survey-break',
  templateUrl: './je-survey-break.component.html',
  styleUrls: ['./je-survey-break.component.css']
})
export class JeSurveyBreakComponent implements OnInit {

  jeSurveyBreakForm: FormGroup
  consumerApplicationDetail: any;
  supplyVoltageString: string = '';
  supplyVolageName: Array<any> = [];
  natureOfWorkTypeId: any
  erpEstimateDataForMkmyArray: Array<any> = [];
  EstimateAmount: Array<any> = [];
  submitted: boolean = false;
  checkedBoolean: boolean = false
  buttonSearchBoolean: boolean = false;
  newArray: Array<any> = [];
  searchBOoleanCheck: boolean = false

  constructor(
    private spinnerService: SpinnerService,
    private url: GenerateUrl,
    private fb: FormBuilder,
    private http: HttpClient,
    private consumerApplicationService: ConsumerApplicationService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<JeSurveyBreakComponent>,
  ) {
    this.consumerApplicationDetail = this.data.row;
    console.log(this.consumerApplicationDetail, "consumerApplicationDetail...consumerApplicationDetail....consumerApplicationDetail......consumerApplicationDetail");

    this.natureOfWorkTypeId = this.consumerApplicationDetail?.natureOfWorkTypeId;

    let accessLeveOfUser = sessionStorage.getItem('accessLeveOfUser');
  }

  onClose() {
    this.dialogRef.close();

  }

  buildForm() {
    this.jeSurveyBreakForm = this.fb.group({
      erpNo: ['', Validators.required]
    })
  }

  get jeSurveyBreakFormControls() {
    return this.jeSurveyBreakForm.controls
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onSearch() {
    this.submitted = true;
    if (this.jeSurveyBreakForm.invalid) {
      this.notificationService.error('Please Enter Erp Number First !');
      this.searchBOoleanCheck
      return
    } else {

      this.consumerApplicationService.getErpSerchForSurveyBreak(this.jeSurveyBreakForm.value.erpNo).subscribe((data: any) => {
        console.log(data, "ddaaatatttatatatataa.........................................");
        if (data.statusCode == "200") {
          this.searchBOoleanCheck = true
          console.log(this.searchBOoleanCheck, "this.searchBOoleanCheck.......111111111111111....");
          this.notificationService.success("Data Retreive Successfully ....111... !");
          this.newArray = data.data

        } else if (data['code'] == "406" && data['message'] == "Scheme code not matched") {
          this.notificationService.error("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
          return
        }
        else if (data['code'] == "406" && data['message'] == "Estimate is wrongly created in ERP") {
          this.notificationService.warn("ERP में एस्टीमेट गलत बनाया गया है।");
          return
        } else if (data['code'] == "406" && data['message'] == "This ERP Number Is Already Associated With Another Application Number.") {
          this.notificationService.error("This ERP Number Is Already Associated With Another Application Number => " + data['list']);
          return
        }
        else {
          this.newArray = [];
          this.notificationService.error(data['message']);
          this.searchBOoleanCheck = false
          console.log(this.searchBOoleanCheck, "this.searchBOoleanCheck............33333333333333333.........");

          return
        }

      })
      return

      // this.consumerApplicationService.getErpDetailsForSurveyBreakFirst(this.jeSurveyBreakForm.value.erpNo).subscribe((ress: any) => {
      //   console.log(ress, "resssssss.....first...............................");
      //   if (ress.statusCode == "200") {
      //     this.searchBOoleanCheck = true
      //     console.log(this.searchBOoleanCheck,"this.searchBOoleanCheck.......111111111111111....");

      //     this.notificationService.success("Data Retreive Successfully ....111... !");
      //     this.newArray = ress.data

      //   } else {
      //     this.consumerApplicationService.getErpDetailsForSurveyBreakSecond(this.jeSurveyBreakForm.value.erpNo).subscribe((responsee: any) => {
      //       console.log(responsee, "responsee.....second................");

      //       if (responsee.statusCode == "200") {
      //         this.searchBOoleanCheck = true
      //         console.log(this.searchBOoleanCheck,"this.searchBOoleanCheck..........2222222222222...");

      //         this.notificationService.success("Data Retreive Successfully ...222..... !");
      //         this.newArray = responsee.data

      //       } else {
      //         this.notificationService.warn("Something went wrong !");
      //         this.searchBOoleanCheck = false
      //         console.log(this.searchBOoleanCheck,"this.searchBOoleanCheck............33333333333333333.........");

      //         return
      //       }

      //     })
      //   }

      // })




      // if (this.natureOfWorkTypeId == 8) {
      //   this.consumerApplicationService.getErpDetailsByErpNumber(JSON.parse(this.jeSurveyBreakForm.value.erpNo), this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data: any) => {
      //     console.log(data, "Mkmy........Data......8888888888888888888888888888888...............");
      //     if (data.code == "200") {
      //       this.erpEstimateDataForMkmyArray = data.list;
      //       this.buttonSearchBoolean = true;
      //       this.notificationService.success("Data retrive Successfully");
      //     }else if(data.code=="307"){
      //       let messageFirst = "Amount more than the sanction estimate amount 195972 for for 25 DTR";
      //       let messageSecond = "Amount more than the sanction estimate amount 195972 for for 63 DTR";
      //       if(data.message===messageFirst){
      //         this.notificationService.warn("25 डीटीआर के लिए स्वीकृत प्राक्कलन राशि 195972 से अधिक राशि है।")
      //       }
      //       else if(data.message===messageSecond){
      //         this.notificationService.warn('63 डीटीआर के लिए स्वीकृत प्राक्कलन राशि 337173 से अधिक राशि है।')
      //       }
      //       return
      //   }else if(data.code=="406"){
      //       this.notificationService.error("This ERP Number Is Already Associated With Another Application Number.");
      //       return
      //   }
      //    else {
      //       this.notificationService.warn("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
      //       return;
      //   }

      //   })


      // } else {
      //   this.consumerApplicationService.getErpEstimateAmount(this.jeSurveyBreakForm.value.erpNo, this.consumerApplicationDetail.consumerApplicationId).subscribe(data => {
      //     console.log(data,"!!!!!!!!!!!!!888888888888888888888888888");

      //     if (data['code'] == "200") {
      //       console.log('222222222222', data['list']);
      //       this.EstimateAmount = data['list'];
      //       this.notificationService.success(data['message']);
      //       this.buttonSearchBoolean = true
      //     } else if(data['code'] == "406"){
      //       this.notificationService.error("This ERP Number Is Already Associated With Another Application Number.");
      //       return
      //   }
      //    else if (data['code'] == "406") {
      //       this.notificationService.warn("ERP में एस्टीमेट गलत बनाया गया है।");
      //       return
      //   }
      //   else {
      //       this.notificationService.error("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
      //       return
      //   }
      //   }, (error) => {
      //     this.notificationService.warn(error);
      //     this.buttonSearchBoolean=false
      //     return
      //   });
      // }
    }

  }

  onCheckBoxChange(e: any) {
    console.log(e, "$$$$$$$$$$$$$event.............");
    this.checkedBoolean = e.target.checked

  }

  onSubmit() {
    console.log(this.searchBOoleanCheck, "searchBOoleanCheck...................................");


    if (this.checkedBoolean == false) {
      this.notificationService.warn("Please Select Checkbox First !");
      return
    } else {
      if (this.searchBOoleanCheck == false) {
        this.notificationService.error("You have not Completed Above Process. Please Enter ERP nUMBER and Search First !");
        return
      } else {
        this.consumerApplicationService.submitJeSurveyBrerak(this.consumerApplicationDetail?.consumerApplicationNo, this.jeSurveyBreakForm.value.erpNo).subscribe((daata: any) => {
          console.log(daata, "daataa...............................");
          if (daata.code == "200") {
            this.notificationService.success("Data Submitted Successfully");
            this.onClose();
          } else {
            this.notificationService.warn(daata.message);
            return
          }

        })



      }

    }

  }

}
