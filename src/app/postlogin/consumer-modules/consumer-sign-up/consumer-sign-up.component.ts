import {
  Component,
  Inject,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CryptoService } from "src/app/shared-services/crypto.service";
import { NotificationService } from "src/app/shared-services/notification.service";
import { SpinnerService } from "src/app/shared-services/spinner.service";
import { ConsumerSignupService } from "../services/consumer-signup.service";
import {
  emailValidator,
  mobPattern,
  matchingPasswords,
  pwdPattern,
  empnumberlength,
  aadharPattern,
  panCardPattern,
  panNoPattern,
  onlycharPattern,
} from "src/app/utils/app-validators";
import { AsyncValidatorService } from "src/app/shared-services/async-validator.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CrudType } from "src/app/shared-enum/crudType";
import { ConsumerSignupRequest } from "../models/consumer-signup-request.model";
// import { ConsumerSignupRequest } from "../../user-modules/models/consumer-signup-request.model";

@Component({
  selector: "app-consumer-sign-up",
  templateUrl: "./consumer-sign-up.component.html",
  styleUrls: ["./consumer-sign-up.component.css"],
})
export class ConsumerSignUpComponent implements OnInit, OnDestroy {
  // @ViewChild('aadharDoc') aadharDocElement: ElementRef;
  // @ViewChild('panDoc') panDocElement: ElementRef;
  // @ViewChild('electricityBillDoc') electricityBillDocElement: ElementRef;
  // @ViewChild('residentialProofDoc') residentialProofDocElement: ElementRef;

  // aadharDoc;
  // panDoc;
  // electricityBillDoc;
  // residentialProofDoc;

  unsubscribe$: Subject<void> = new Subject();
  consumeSignUpFg: FormGroup;
  isFormSubmit: boolean = false;
  signUpModel: ConsumerSignupRequest = new ConsumerSignupRequest();
  hide1 = true;
  hide2 = true;
  // aadharFileName: string = 'Select Aadhar File...';
  // aadharRequired: boolean = true;
  // aadharUploaded: boolean = false;

  // panFileName: string = 'Select Pan File...';
  // panRequired: boolean = true;
  // panUploaded: boolean = false;

  // electricityBillFileName: string = 'Select Electricity bill File...';
  // electricityBillRequired: boolean = true;
  // electricityBillUploaded: boolean = false;

  // residentialProofFileName: string = 'Select Residential proof File...';
  // residentialProofRequired: boolean = true;
  // residentialProofUploaded: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private consumerSignupService: ConsumerSignupService,
    private crypto: CryptoService,
    private spinnerService: SpinnerService,
    private sanitizer: DomSanitizer,
    private asyncValidator: AsyncValidatorService // @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  crudType = CrudType.create;

  // aadharUpload() {
  //   if (this.aadharDocElement.nativeElement.files[0] != undefined) {
  //     this.aadharDoc = this.aadharDocElement.nativeElement.files[0];
  //     this.aadharUploaded = true;
  //     this.aadharFileName = this.aadharDoc.name;
  //   }
  // }

  // panUpload() {
  //   if (this.panDocElement.nativeElement.files[0] != undefined) {
  //     this.panDoc = this.panDocElement.nativeElement.files[0];
  //     this.panUploaded = true;
  //     this.panFileName = this.panDoc.name;
  //   }
  // }

  // energyBillUpload() {
  //   if (this.electricityBillDocElement.nativeElement.files[0] != undefined) {
  //     this.electricityBillDoc = this.electricityBillDocElement.nativeElement.files[0];
  //     this.electricityBillUploaded = true;
  //     this.electricityBillFileName = this.electricityBillDoc.name;
  //   }
  // }

  // residentialProofUpload() {
  //   if (this.residentialProofDocElement.nativeElement.files[0] != undefined) {
  //     this.residentialProofDoc = this.residentialProofDocElement.nativeElement.files[0];
  //     this.residentialProofUploaded = true;
  //     this.residentialProofFileName = this.residentialProofDoc.name;
  //   }
  // }

  ngOnDestroy() {
    console.log("Call on ngOnDestroy !!!");

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initializeForm() {
    console.log("Call on initializeForm !!!");

    // if (this.data.crudType === CrudType.create) {
    //   this.consumeSignUpFg.reset();
    // } else {
    // }
  }
  getHttpResponce() {
    console.log("Call on getHttpResponce !!!");
  }

  get consumeSignUpFormControls() {
    return this.consumeSignUpFg.controls;
  }

  // variable to be needed on asyncValidators
  // crudType = this.data.crudType;
  // rowId = this.data.userId;
  ngOnInit() {
    console.log("Call on ngOnInit !!!");

    this.consumeSignUpFg = this.fb.group(
      {
        consumerId: [""],
        consumerName: [
          null,
          Validators.compose([Validators.required, onlycharPattern]),
        ],
        address: ["", Validators.compose([Validators.required])],
        ivrsNo: [""],
        // ivrsNo: ['', Validators.compose([Validators.required])],
        // consumerMobileNo: ['', Validators.compose([Validators.required])],
        // consumerEmailId: ['', Validators.compose([Validators.required])],
        // aadharNo: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(12)])],
        // panNo: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
        consumerMobileNo: [
          null,
          {
            validators: [Validators.required, mobPattern],
            asyncValidators: [
              this.asyncValidator.AsyncValidator(
                "consumer",
                this.crudType,
                "",
                "consumerMobileNo"
              ),
            ],
            updateOn: "blur",
          },
        ],
        consumerEmailId: [
          null,
          {
            validators: [Validators.required, emailValidator],
            asyncValidators: [
              this.asyncValidator.AsyncValidator(
                "consumer",
                this.crudType,
                "",
                "consumerEmailId"
              ),
            ],
            updateOn: "blur",
          },
        ],
        // aadharNo: [null, { validators: [Validators.required, aadharPattern], asyncValidators: [this.asyncValidator.AsyncValidator('consumer', this.crudType, '', 'aadharNo')], updateOn: 'blur' }],
        // panNo: [null, { validators: [Validators.required, panNoPattern], asyncValidators: [this.asyncValidator.AsyncValidator('consumer', this.crudType, '', 'panNo')], updateOn: 'blur' }],
        password: ["", Validators.compose([Validators.required, pwdPattern])],
        confirmPassword: ["", Validators.required],
      },
      { validator: matchingPasswords("password", "confirmPassword") }
    );

    this.initializeForm();
    this.getHttpResponce();

    console.log("consumeSignUpFg :- ", this.consumeSignUpFg);
  }

  onSubmit() {
    console.log("Call on onSubmit !!!");

    console.log("this.consumeSignUpFg.value", this.consumeSignUpFg);

    this.isFormSubmit = true;

    // if (this.aadharRequired && !this.aadharUploaded) {
    //   return;
    // }

    // if (this.panRequired && !this.panUploaded) {
    //   return;
    // }

    // if (this.electricityBillRequired && !this.electricityBillUploaded) {
    //   return;
    // }

    // if (this.residentialProofRequired && !this.residentialProofUploaded) {
    //   return;
    // }

    // var formData = new FormData();
    // formData.append('consumerSignUpForm', JSON.stringify(this.consumeSignUpFg.value));
    // formData.append('docAadhar', this.aadharDoc);
    // formData.append('docPan', this.panDoc);
    // formData.append('electricityBill', this.electricityBillDoc);
    // formData.append('docResidentialProof', this.residentialProofDoc);

    // onClose() {

    //   console.log("Call on onClose !!!");

    //   this.consumeSignUpFg.reset();
    //   this.dialogRef.close();
    // }
    this.signUpModel.consumerEmailId =
      this.consumeSignUpFg.value.consumerEmailId;
    this.signUpModel.consumerMobileNo =
      this.consumeSignUpFg.value.consumerMobileNo;
    this.signUpModel.consumerName = this.consumeSignUpFg.value.consumerName;
    this.signUpModel.consumerPassword = this.consumeSignUpFg.value.password;
    this.signUpModel.address = this.consumeSignUpFg.value.address;
    if (this.consumeSignUpFg.valid) {
      console.log(
        "inside if blolck<>><><<<<><><><><><<>>>>>>",
        this.signUpModel
      );
      if (this.crudType === CrudType.create) {
        this.consumerSignupService
          .addNewConsumer(this.signUpModel)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((data) => {
            console.log("inside service");
            if (data["code"] == "201") {
              // this.onClose();
              const responce = data["list"];
              this.notificationService.success(
                "New consumer" +
                  responce["consumerId"] +
                  " :: Successfully Signup!"
              );
              this.router.navigate(["/consumer/login"]);
              this.notificationService.success(data["message"]);
            } else {
              this.notificationService.warn(data["message"]);
            }
          });
      }

      // else {

      //   this.consumerSignupService.updateNewApplication(this.data.consumerApplicationId, formData).pipe(takeUntil(this.unsubscribe$)).subscribe(
      //     data => {
      //       if (data['code'] == '204') {
      //         this.onClose();
      //         this.notificationService.success(data['message']);
      //       } else {
      //         this.notificationService.warn(data['message']);
      //       }
      //     });
      // }
    }
  }
}
