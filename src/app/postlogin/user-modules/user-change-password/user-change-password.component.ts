import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { pwdPattern, matchingPasswords } from 'src/app/utils/app-validators';

import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserLoginService } from '../services/user-login.service';
import { UserPasswordChangeService } from '../services/user-password-change.service';


@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject();
  changepasswodFg: FormGroup;
  loginId: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private titleService: Title,
    private userPasswordChangeService: UserPasswordChangeService,
    private jwtHelperService: JwtHelperService,
    private userLoginService: UserLoginService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Change Password');
    this.changepasswodFg = this.fb.group({
      oldpassword: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, pwdPattern])],
      confirmPassword: ['', Validators.required]
    }, { validator: matchingPasswords('password', 'confirmPassword') });
    const token = sessionStorage.getItem("usertoken") ? JSON.parse(sessionStorage.getItem("usertoken")) : null;
    this.loginId = this.jwtHelperService.decodeToken(token)['sub'];
  }
  onSubmit() {
    const formData: any = {}
    formData.loginId = this.loginId;
    formData.newPassword = this.changepasswodFg.get('password').value;
    formData.oldPassword = this.changepasswodFg.get('oldpassword').value;
    this.userPasswordChangeService.changePwd(formData).pipe(takeUntil(this.unsubscribe$)).subscribe(
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
    this.userLoginService.logout();
    sessionStorage.removeItem('SearchKey');
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
