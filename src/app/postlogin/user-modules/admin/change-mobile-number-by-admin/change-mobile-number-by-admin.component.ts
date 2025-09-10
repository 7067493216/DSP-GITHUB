import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { ConsumerApplicationService } from '../../services/consumer-application.service';

@Component({
  selector: 'app-change-mobile-number-by-admin',
  templateUrl: './change-mobile-number-by-admin.component.html',
  styleUrls: ['./change-mobile-number-by-admin.component.css']
})
export class ChangeMobileNumberByAdminComponent implements OnInit {

  updateForm: FormGroup;
  token: any;
  diableButtonBoolean:boolean = false;

  constructor(private fb: FormBuilder,
    private notification: NotificationService,
    private consumerApplicationService: ConsumerApplicationService
  ) {
    this.token = sessionStorage.getItem("usertoken");
    this.updateForm = this.fb.group({
      oldMobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      newMobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    }, { validator: this.mobileNumbersMustDiffer });
  }
  ngOnInit(): void {
    this.updateForm = this.fb.group(
      {
        oldMobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        newMobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      },
      {
        validators: this.mobileNumberMismatchValidator, // 👈 apply here
      }
    );
  }

  mobileNumbersMustDiffer(group: FormGroup) {
    const oldNum = group.get('oldMobile')?.value;
    const newNum = group.get('newMobile')?.value;
    return oldNum && newNum && oldNum === newNum ? { sameNumber: true } : null;
  }

  get oldMobile() { return this.updateForm.get('oldMobile'); }
  get newMobile() { return this.updateForm.get('newMobile'); }

  onSubmit() {
    console.log(this.updateForm, "this.updateForm...............");

    if (this.updateForm.invalid) {
      this.notification.warn("Invalid Form !");
      return
    } else {
      this.consumerApplicationService.changeConsumerMobileNumberByAdmin(this.updateForm.value.oldMobile, this.updateForm.value.newMobile, this.token).subscribe((resp: any) => {
        console.log(resp, "resp...................");
        if (resp?.code == "200" || resp?.code == "201" || resp?.code == "204") {
          this.notification.success(resp?.message)
          this.diableButtonBoolean = true;
        } else {
          this.notification.warn(resp?.message);
          return
        }

      })
    }


    /////  changeConsumerMobileNumberByAdmin(oldMobileNo:any,newMobileNo:any,token:any)
  }


  mobileNumberMismatchValidator(control: AbstractControl): ValidationErrors | null {
    const oldMobile = control.get('oldMobile')?.value;
    const newMobile = control.get('newMobile')?.value;

    if (oldMobile && newMobile && oldMobile === newMobile) {
      return { sameNumber: true };
    }

    return null;
  }


}
