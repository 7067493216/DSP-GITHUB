// import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { CrudType } from 'src/app/shared-enum/crudType';
// // import moment from 'moment';
// import { Title } from '@angular/platform-browser';
// import { Subject } from 'rxjs';
// import { NotificationService } from 'src/app/shared-services/notification.service';
// import { ConsumerSignupService } from '../services/consumer-signup.service';

// @Component({
//   selector: 'app-consumer-sign-up',
//   templateUrl: './consumer-sign-up.component.html',
//   styleUrls: ['./consumer-sign-up.component.css']
// })

// export class ConsumerSignUpComponent implements OnInit, OnDestroy {
//   revenueDataFg: FormGroup;
//   consumerSignupFg: FormGroup;
//   unsubscribe$: Subject<void> = new Subject();
//   // crudType = this.data.crudType;

//   constructor(
//     private formBuilder: FormBuilder,
//     private consumerSignupService: ConsumerSignupService,
//     private notificationService: NotificationService,
//     private titleService: Title
//   ) { }

//   ngOnInit() {
//     this.titleService.setTitle('Consumer Signup');
//     this.getHttpResponce();
//     this.consumerSignupFg = this.formBuilder.group({


//     });
//   }
//   getHttpResponce() {

//   }

//   get consumerSignupFormControls() {
//     return this.consumerSignupFg.controls;
//   }

//   onSubmit() {

//     console.log("Call on ngOnInit !!!");

//     this.consumerSignupFg = this.formBuilder.group({

//       consumerId: [''],
//       consumerName: ['', Validators.compose([Validators.required])],
//       guardianName: ['', Validators.compose([Validators.required])],
//       // address: ['', Validators.compose([Validators.required])],
//       // billNo: ['', Validators.compose([Validators.required])],
//       // aadharNo: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(12)])],
//       // panNo: ['', Validators.compose([Validators.required, Validators.maxLength(10)])]

//     });
//     this.initializeForm();
//     this.getHttpResponce();

//     console.log('consumerSignupFg :- ', this.consumerSignupFg);

//   }

//   initializeForm() {

//     console.log("Call on initializeForm !!!");

//     // if (this.data.crudType === CrudType.create) {
//     //   this.consumerSignupFg.reset();
//     // } else {
//     //   // this.loadFormToEdit();
//     // }
//   }

//   ngOnDestroy() {
//     this.unsubscribe$.next();
//     this.unsubscribe$.complete();
//   }
// }
