import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { pwdPattern, matchingPasswords } from 'src/app/utils/app-validators';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConsumerLoginService } from '../services/consumer-login.service';
import { PasswordChangeService } from '../services/password-change.service';



@Component({
  selector: 'app-change-password',
  templateUrl: './consumer-change-password.component.html',
  styleUrls: ['./consumer-change-password.component.css']
})
export class ConsumerChangePasswordComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject();
  changepasswodFg: FormGroup;
  loginId: string;
  hide = true;
  hide1=true;
  hide2=true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private titleService: Title,
    private passwordChangeService: PasswordChangeService,
    private jwtHelperService: JwtHelperService,
    private consumerLoginService: ConsumerLoginService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Change Password');
    this.changepasswodFg = this.fb.group({
      oldpassword: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, pwdPattern])],
      confirmPassword: ['', Validators.required]
    }, { validator: matchingPasswords('password', 'confirmPassword') });
    const token = sessionStorage.getItem("consumertoken") ? JSON.parse(sessionStorage.getItem("consumertoken")) : null;
    this.loginId = this.jwtHelperService.decodeToken(token)['sub'];
  }
  onSubmit() {
    const formData: any = {}
    formData.loginId = this.loginId;
    formData.newPassword = this.changepasswodFg.get('password').value;
    formData.oldPassword = this.changepasswodFg.get('oldpassword').value;
    this.passwordChangeService.changePwd(formData).pipe(takeUntil(this.unsubscribe$)).subscribe(
      data => {
        console.log(data);
        if (data['code'] === '200') {
          this.notificationService.success(data['message']);

          this.logout();
        } else {
          this.notificationService.warn(data['message']);
        }
      });
  }
  logout() {
    this.consumerLoginService.logout();
    sessionStorage.removeItem('SearchKey');
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
