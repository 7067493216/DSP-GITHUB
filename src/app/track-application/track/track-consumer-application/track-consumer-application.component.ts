import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApplicationViewComponent } from '../application-view/application-view.component';
import { SendOtpModel } from '../model/sendOtp';
import { VerifyOtpModel } from '../model/verifyOtp';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { TrackApplicationModel } from '../model/trackApplicationModel';

@Component({
  selector: 'app-track-consumer-application',
  templateUrl: './track-consumer-application.component.html',
  styleUrls: ['./track-consumer-application.component.css']
})
export class TrackConsumerApplicationComponent implements OnInit, AfterViewInit {
  trackForm: FormGroup;
  OtpForm: FormGroup
  dataSource: any;
  selectionType: any;
  submitted: boolean = false;
  tableShowBoolean: boolean = false;
  otpBoolean: boolean = false
  userMobileNo: any
  displayInputFieldArray: Array<any> = [];

  sendOtP: SendOtpModel = new SendOtpModel();
  verifyOtp: VerifyOtpModel = new VerifyOtpModel();
 // displayedColumns: string[] = [ 'schemeType', 'natureOfWork', 'consumerName', 'consumerApplicationNo', 'stage', 'status', 'action'];
  // , 'dcName', "Address", "loadRequest",  'registrationPaymentDate', 'demandPaymentDate'
  displayedColumns: string[] = ['consumerApplicationNo', 'consumerName', 'schemeType', 'natureOfWork',"ApplicationStatus", "action"];
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  formsBoolean:boolean = false;
  trackApplicationModel:TrackApplicationModel = new TrackApplicationModel()

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private spinnerService: SpinnerService,
  ) {

   }

  ngOnInit(): void {

    this.buildForm();
    this.otpFormBuild();

    console.log(this.trackForm, "this.trackForm.......");

   

  }


  onSelectPortal(e:any){
    console.log(e,"e..............................");
    if(e=="DSP"){
      this.displayInputFieldArray = [
        {
          id: 0, name: "------------------------------------------Nothing---------------------------------------------------------"
        },
        {
          id: 1, name: "Application Number"
        },
        {
          id: 2, name: "Mobile Number"
        }
      ];
    }else if(e=="SSP") {
      this.displayInputFieldArray = [
        {
          id: 3, name: "Mobile Number"
        }
      ];
    }

    
  }




  otpFormBuild() {
    this.OtpForm = this.fb.group({
      otp: ['', Validators.required]
    })
  }


  buildForm() {
    this.trackForm = this.fb.group({
      trackType: ['', Validators.required],
      applicationNo: [null, Validators.required],
      mobileNo: [null, Validators.required]

    })
  }






  displayInputFieldForTrackType(e: any) {
    this.trackForm.value.mobileNo = null;
    this.trackForm.value.applicationNo = null;
    console.log(this.trackForm, "this.trackForm.......");
    console.log(e.target.value, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    if (e.target.value == 1) {
      this.trackForm.value.mobileNo = null;
      this.trackForm.controls['trackType'].setValidators(Validators.required);
      this.trackForm.controls['applicationNo'].setValidators(Validators.required);
      this.trackForm.controls['mobileNo'].clearValidators();

      this.trackForm.controls['trackType'].updateValueAndValidity();
      this.trackForm.controls['applicationNo'].updateValueAndValidity();
      this.trackForm.controls['mobileNo'].updateValueAndValidity();

    }
    else if (e.target.value == 2) {
      this.trackForm.value.applicationNo = null
      this.trackForm.controls['trackType'].setValidators(Validators.required);
      this.trackForm.controls['applicationNo'].clearValidators();
      this.trackForm.controls['mobileNo'].setValidators(Validators.required);

      this.trackForm.controls['trackType'].updateValueAndValidity();
      this.trackForm.controls['applicationNo'].updateValueAndValidity();
      this.trackForm.controls['mobileNo'].updateValueAndValidity();
    } else if (e.target.value == 3) {
      this.trackForm.value.applicationNo = null
      this.trackForm.controls['trackType'].setValidators(Validators.required);
      this.trackForm.controls['applicationNo'].clearValidators();
      this.trackForm.controls['mobileNo'].setValidators(Validators.required);

      this.trackForm.controls['trackType'].updateValueAndValidity();
      this.trackForm.controls['applicationNo'].updateValueAndValidity();
      this.trackForm.controls['mobileNo'].updateValueAndValidity();

    }
    else {
      this.trackForm.value.mobileNo = null;
      this.trackForm.value.applicationNo = null
    }
    this.selectionType = e.target.value


  }


  onSubmit() {

    this.submitted = true;
    if (this.trackForm.invalid) {
      if (this.selectionType == 1) {
        this.notificationService.error('Application Number is required');
      } else if (this.selectionType == 2) {
        this.notificationService.error('Mobile Number is required');
      }else if(this.selectionType == 3){
        this.notificationService.error('Mobile Number is required');
      } else {
        this.notificationService.error("! Invali form");
      }
      return
    } else {
      console.log(this.trackForm.value, "this.trackForm.value...................");
      if (this.selectionType == 1) {
        
        this.trackForm.value.mobileNo = null;
        this.trackApplicationModel.dspApplicationNo = this.trackForm.value.applicationNo;
        this.trackApplicationModel.dspMobileNo = null
        this.trackApplicationModel.sspMobileNo = null
        
      } else if (this.selectionType == 2) {
        this.trackApplicationModel.dspMobileNo = this.trackForm.value.mobileNo;
        this.trackApplicationModel.dspApplicationNo = null
        this.trackApplicationModel.sspMobileNo = null
        this.trackForm.value.applicationNo= null
      }else if(this.selectionType == 3){
        this.trackApplicationModel.dspMobileNo = null
        this.trackApplicationModel.dspApplicationNo = null
        this.trackApplicationModel.sspMobileNo = this.trackForm.value.mobileNo;
        this.trackForm.value.applicationNo= null
      }else {
        this.trackForm.value.mobileNo = null
        this.trackForm.value.applicationNo= null
      }
      this.apiService.getApplications(this.trackApplicationModel.dspApplicationNo, this.trackApplicationModel.dspMobileNo,this.trackApplicationModel.sspMobileNo).subscribe((data: any) => {
        console.log(data, "dddaatatattatataatatta..........................");
        if (data.code == "200") {
          // this.notificationService.success("Data Retrieve Successfully !");

          if (this.selectionType == 2) {
            this.dataSource = new MatTableDataSource<any>(data.list[0]);
            this.userMobileNo = this.trackForm.value.mobileNo
          } else if (this.selectionType == 1) {
            this.dataSource = new MatTableDataSource<any>(data.list);
            this.userMobileNo = data.list[0].consumers.consumerMobileNo;
          } else {
            this.dataSource = new MatTableDataSource<any>([]);
          }

          this.getOtp();
          console.log(this.dataSource, "this.dataSource..........................");

          this.ngAfterViewInit()
          this.dataSource.sort = this.sort;
          // this.tableShowBoolean = true

        } else {
          this.notificationService.warn(data.message + " !");
          this.tableShowBoolean = false
        }

      })
    }


  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  onView(e: any) {
    console.log(e, "eeeeeeeeeeee////////////////////");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "90vw";
    dialogConfig.height = '90vh';
    dialogConfig.data = { row: e };
    const dialogRef = this.dialog.open(ApplicationViewComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // location.reload();
    });
  }

  againresendOtp() {
    this.OtpForm.reset();
    this.getOtp();
  }

  getOtp() {
    let mob = '7067493216'
    this.sendOtP.source = "Dsp";
    this.sendOtP.mobileNo = this.userMobileNo;
    // this.sendOtP.mobileNo = mob;
    //this.verifyOtp.mobileNo = "7067493216";
    //const spinnerRef = this.spinnerService.start();
    console.log(this.sendOtP, " this.sendOtP...");

    this.apiService.forGetOtpSendOnNumber(this.sendOtP).subscribe((response: any) => {
      console.log(response, "datarrrrrrrrrrrrrrrrrr");

      if (response['code'] === '200') {
        this.otpBoolean = true
        this.tableShowBoolean = false
        this.OtpForm.reset();
        this.notificationService.success('OTP has been sent to your Mobile Number');
      } else if (response['code'] === '100') {
        this.otpBoolean = false;
        this.tableShowBoolean = false
        this.notificationService.warn(response['message']);
      } else {
        this.notificationService.warn(response['message']);
        this.otpBoolean = false
        this.tableShowBoolean = false
      }
    })
    console.log("lo bhai mai bhi chal gaya");

  }




  //this.userUnlockForm.controls["otp"].markAsUntouched();
  OtpVerifySubmit() {
    let mob = '7067493216'
    this.verifyOtp.source = "Dsp";
    this.verifyOtp.mobileNo = this.userMobileNo;
    // this.verifyOtp.mobileNo = mob;
    //this.verifyOtp.mobileNo = "7067493216";
    this.verifyOtp.otp = this.OtpForm.value.otp;
    console.log(this.verifyOtp, "zzzzzzzzzzzzzzzzzzzzzzzz");


    this.apiService.forVerifyOtp(this.verifyOtp).subscribe((response: any) => {
      console.log(response, "response????????????????????????");
      if (response['code'] === '200') {
        this.otpBoolean = false
        this.tableShowBoolean = true;
        this.notificationService.success("Data Retrieve Successfully !");
      } else if (response['code'] === '100') {
        this.otpBoolean = true
        this.tableShowBoolean = false
        this.notificationService.warn(response['message']);
        return
      } else {
        this.otpBoolean = true
        this.tableShowBoolean = false
        this.notificationService.warn(response['message']);

        return
      }
    })

  }



}
