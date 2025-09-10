import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { UserLoginService } from '../../services/user-login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SendOtpModel } from '../../models/sendOtp';
import { VerifyOtpModel } from '../../models/verifyOtp';
// import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-successful-genrate-work-completion',
  templateUrl: './successful-genrate-work-completion.component.html',
  styleUrls: ['./successful-genrate-work-completion.component.css']
})
export class SuccessfulGenrateWorkCompletionComponent implements OnInit {
  sucessWorkComplationForm: FormGroup;
  otpVerificationForm: FormGroup;
  userApplicationUrl: string = this.url.userApplicationUrl;
  consumerContextPath: string = this.url.consumerContextPath;
  userContextPath: string = this.url.userContextPath;
  consumerApplicationDetail: any;
  contractorDetails: any;
  workComplicationDetail: any;
  loginUser: any;
  showTextFild: boolean = false;
  goFormGo: boolean = false;
  submitted: boolean = false
  enabledOTP: boolean = false;
  invalidUser: boolean = false;
  openForm: boolean = false;
  sendOtP: SendOtpModel = new SendOtpModel();
  verifyOtp: VerifyOtpModel = new VerifyOtpModel();
  applicationDate: Date;
  userMobileNo: any
  fillDate: boolean = false
  completeDate: any;
  filePathObject:any;
  showFileDocs:boolean = false;
  maxDate:Date



  constructor(private fb: FormBuilder,
    private consumerApplicationService: ConsumerApplicationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<SuccessfulGenrateWorkCompletionComponent>,
    private spinnerService: SpinnerService,
    private url: GenerateUrl,
    private http: HttpClient,
    private userLoginService: UserLoginService,

  ) {
    console.log(this.data,"rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    this.consumerApplicationDetail = data.row;
    let userDetails = JSON.parse(sessionStorage.getItem('accessLeveOfUser'));
    console.log(userDetails, "ddddddddddd..........................dddddddddddddd");
    this.userMobileNo = userDetails.mobileNo;

     this.maxDate = new Date();
    this.maxDate.setMonth(this.maxDate.getMonth())
  }

  ngOnInit() {
    this.unlockTheFormbuild();
    this.buildForm();


    const today = new Date();
    const day: any = today.getDate();
    let month: any = today.getMonth() + 1;
    const year: any = today.getFullYear();


    if (month < 10) {
      month = '0' + month;
      // console.log(month,'INSIDE IF');
    } else {
      month = month;
      //  console.log(month,"INSIDE ELSE")
    }
    // this.completeDate =year+"-"+month+"-"+day;

    // this.completeDate = day + "-" + month + "-" + year;
    this.completeDate = year + "-" + month + "-" + day;
    console.log(this.completeDate, "this.completeDate");

    if (this.sucessWorkComplationForm.valid) {
      this.fillDate = false;
    }
    this.loginUser = this.userLoginService.currentUserName
    console.log("ngOnInit is calling !!!!!!!!!!!!!!!!!!!!!!!!!");

    // this.consumerApplicationService.getConsumerAplicationDetails(this.data.consumerApplicationId).subscribe((consumerApplicationData: any) => {
    //   console.log('consumerApplicationData', consumerApplicationData);
    //   this.consumerApplicationDetail = consumerApplicationData.list[0];
    //   console.log(this.consumerApplicationDetail, "gggggggggggggggggggggggggggggggggggg");
    //   if (consumerApplicationData['code'] == "200") {
    //     console.log(this.consumerApplicationDetail, "uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuurrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmm");
        this.consumerApplicationService.getworkComplicationDataAllDate(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((workComplicationDataAllDate: any) => {
          console.log('workComplicationDataAllDate', workComplicationDataAllDate);
          this.workComplicationDetail = workComplicationDataAllDate;
          console.log(" this.workComplicationDetail", this.workComplicationDetail);
        });
        this.consumerApplicationService.getContractorDetails(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((contractor: any) => {
          console.log(contractor, "yuytyyytdfyyuytud...............................");
          if (contractor['code'] == "200") {
            this.contractorDetails = contractor['list'][0];
            console.log(' this contractor Details', this.contractorDetails);
            this.getContractorFilePath(this.consumerApplicationDetail?.consumerApplicationNo, this.contractorDetails?.USER_ID);
          }
        })      //  contractorDetails.contractorName

    //   }
    // })

    //*************** */


    //  /work-status/get/
    // let workComplicationDataAllDate = await this.http.get(this.userContextPath + '/work-status/get/' + this.consumerApplicationDetail.consumerApplicationNo).toPromise();
    // console.log('workComplicationDataAllDate', workComplicationDataAllDate);

    // this.workComplicationDetail = workComplicationDataAllDate;
    // console.log(" this.workComplicationDetail", this.workComplicationDetail);


    // this.consumerApplicationService.getworkComplicationDataAllDate(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((workComplicationDataAllDate: any) => {
    //   console.log('workComplicationDataAllDate', workComplicationDataAllDate);
    //   this.workComplicationDetail = workComplicationDataAllDate;
    //   console.log(" this.workComplicationDetail", this.workComplicationDetail);
    // })


    ///********************** */


    // let contractor = await this.http.get(this.consumerContextPath + '/qc-portal/conforbid/' + this.consumerApplicationDetail.consumerApplicationNo).toPromise();
    // console.log('contractor', contractor);
    // if (contractor['code'] == "200") {
    //   this.contractorDetails = contractor['list'][0];
    //   console.log(' this contractor Details', this.contractorDetails);
    // }

    // this.consumerApplicationService.getContractorDetails(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((contractor:any)=>{
    //   console.log(contractor,"yuytyyytdfyyuytud...............................");

    //   if (contractor['code'] == "200") {
    //     this.contractorDetails = contractor['list'][0];
    //     console.log(' this contractor Details', this.contractorDetails);
    //   }
    // })




  }

  onDownload(path: any) {

    if(this.url.baseUrl=="https://rooftop-uat.mpcz.in:8888"){
      window.open("https://qcdev.mpcz.in:8080" + path, "_blank", "popup=yes")
    }else{
      window.open("https://qcportal.mpcz.in" + path, "_blank", "popup=yes")
    }

    
    // https://qcdev.mpcz.in:8080/media/tkc_bid_not_participated/challan_pdf/sodapdf-converted_KQv0PA5.pdf
    // https://qcportal.mpcz.in/tkc/bid_not_participated_docs
    // https://qcportal.mpcz.in/media/tkc_bid_not_participated/
  }

  getContractorFilePath(consumerApplicationNo:any,contactorUserId:any) {
    // let a = 'SV1707125529920'
    // let b = 4322
    this.consumerApplicationService.getFilePathForContractorDocuments(consumerApplicationNo, contactorUserId).subscribe((resp: any) => {
      console.log(resp, "filePathDetails..........................///////////////////////////..............////  this.consumerApplicationDetail?.consumerApplicationNo ////  this.contractorDetails.contractorId //////............/////////////");
      // consumer_application_no=SV1707125529920&User_Id=4322
      // this.consumerApplicationDetail?.consumerApplicationNo,this.contractorDetails.contractorId
      if (resp?.status == 200) {
        this.filePathObject = resp.data;
        this.showFileDocs = true;
      } else {
        this.showFileDocs = false;
      }
    })
  }


  buildForm() {
    this.applicationDate = new Date("1947-08-15");
    this.sucessWorkComplationForm = this.fb.group({
      dateOfDgmOandM: ['', Validators.required],
      workComplationChangedByDgmOrendum: ['', Validators.required],
      workComplationChangedReason: ['', Validators.required],
      consumerApplicationId: ['']
    })
  }

  unlockTheFormbuild() {
    this.otpVerificationForm = this.fb.group({
      otp: ["", Validators.required]
    })
  }

  getOtp() {
    if (this.sucessWorkComplationForm.invalid) {
      this.fillDate = true;
      this.notificationService.error("! please choose date first")
      return
    }
    this.sendOtP.source = "Dsp";
    this.sendOtP.mobileNo = this.userMobileNo;
    //this.verifyOtp.mobileNo = "7067493216";
    //const spinnerRef = this.spinnerService.start();
    this.consumerApplicationService.forGetOtpSendOnNumber(this.sendOtP).subscribe((response: any) => {
      console.log(response, "datarrrrrrrrrrrrrrrrrr");

      if (response['code'] === '200') {
        this.invalidUser = false;
        this.enabledOTP = true;

        this.notificationService.success('OTP has been sent to your mobile');
      } else if (response['code'] === '100') {
        this.invalidUser = true;
        this.enabledOTP = false;
        this.notificationService.warn(response['message']);
      } else {
        this.notificationService.warn(response['message']);
        this.enabledOTP = false;
      }
    })


  }

  //this.userUnlockForm.controls["otp"].markAsUntouched();
  OtpVerifySubmit() {
    this.verifyOtp.source = "Dsp";
    this.verifyOtp.mobileNo = this.userMobileNo;
    //this.verifyOtp.mobileNo = "7067493216";
    this.verifyOtp.otp = this.otpVerificationForm.value.otp;
    // const spinnerRef = this.spinnerService.start();

    this.consumerApplicationService.forVerifyOtp(this.verifyOtp).subscribe((response: any) => {
      console.log(response, "response????????????????????????");
      if (response['code'] === '200') {
        // this.openForm = true;

        this.consumerApplicationService.submitWorkCompletionStatusChange(this.sucessWorkComplationForm.value).subscribe((data: any) => {

          console.log(data, "ggggggggggggggggggggggggggg");
          if (data['code'] == '201') {
            this.notificationService.success("Submitted Successfully");
            this.onClose();
          } else {
            this.notificationService.warn(data['message']);
          }

        })

        // this.notificationService.success('OTP verify Successfully');
      } else if (response['code'] === '100') {
        // this.goFormGo = false;
        this.notificationService.warn(response['message']);
      } else {
        // this.goFormGo = false;
        this.notificationService.warn(response['message']);
        //  this.enabledOTP = false;
      }
    })


  }



  onDcChangedChange(ob: MatRadioChange) {
    let mrButton: MatRadioButton = ob.source;

    var isDgmStcWantChange: boolean;
    if (mrButton.value == "true") {
      isDgmStcWantChange = true;
      this.showTextFild = true;
    } else if (mrButton.value == "false") {
      isDgmStcWantChange = false;
      this.showTextFild = false;
    }

    if (isDgmStcWantChange) {
      this.sucessWorkComplationForm.controls['workComplationChangedReason'].setValidators(Validators.required);
      this.sucessWorkComplationForm.controls['workComplationChangedReason'].updateValueAndValidity();
    } else {
      this.sucessWorkComplationForm.controls['workComplationChangedReason'].clearValidators();
      this.sucessWorkComplationForm.controls['workComplationChangedReason'].updateValueAndValidity();
    }
  }

  get formControl() {
    return this.sucessWorkComplationForm.controls;
  }

  onClose() {
    this.dialogRef.close();

  }

  submitForm() {
    this.sucessWorkComplationForm.value.consumerApplicationId = this.data.consumerApplicationId;
    this.submitted = true;
    if (this.sucessWorkComplationForm.invalid) {
      this.goFormGo = false;
      return
    } else {
      this.getOtp();
      this.goFormGo = true;
      this.otpVerificationForm.reset();
    }


  }

  resendOtp() {
    this.otpVerificationForm.reset();
    this.getOtp();
  }


}
