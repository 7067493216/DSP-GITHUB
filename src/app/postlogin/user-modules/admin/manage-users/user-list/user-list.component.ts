import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { Subject } from 'rxjs';
import { CrudType } from 'src/app/shared-enum/crudType';
import { ManageUserService } from '../../services/manage-user.service';
import { takeUntil, finalize } from 'rxjs/operators';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { Title } from '@angular/platform-browser';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { GenerateUrl } from 'src/environments/generate-url.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  userId: number;
  adUserDetail: any;
  userRoles: string;
  crudType: CrudType;
  modalTitle: string;
  btnTitle: string;
  checked: boolean = true;
  listData: MatTableDataSource<{}>;
  userAuthUrl: string = this.url.userAuthUrl;
  displayedColumns: string[] = [
    // 'position', 'locationName', 'userId', 'userName', 'userDesignation.designationShortForm', 'userEmailId',
    'position', 'locationName', 'userId', 'userName', 'userEmailId',
    'mobileNo', 'accessLevel', 'edit', /*'accExpired', 'accLocked',*/ 'action'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  searchKey: string;

  constructor(
    private dialog: MatDialog,
    private titleService: Title,
    private manageUserService: ManageUserService,
    private spinnerService: SpinnerService,
    public role: RoleConstantsService,
    public notification: NotificationService,
    private jwtHelperService: JwtHelperService,
    private http: HttpClient,
    private url: GenerateUrl
  ) { }

  async ngOnInit() {
    // sandeep, start
    this.userRoles = this.jwtHelperService.decodeToken(sessionStorage.getItem('usertoken')).roles
    console.log("userRoles :- ", this.userRoles);

    if (this.userRoles == 'HR_MANAGER'
      || this.userRoles == 'AE_IT') {

      const userLoginId = this.jwtHelperService.decodeToken(sessionStorage.getItem('usertoken')).sub
      console.log("userLoginId :- ", userLoginId);

      let adUserData = await this.http.get(this.userAuthUrl + '/getUserByLoginId/' + userLoginId).toPromise();
      console.log('adUserData', adUserData);
      if (adUserData['code'] == "200") {
        this.adUserDetail = adUserData['list'][0];
        console.log('adUserDetail:- ', this.adUserDetail);
      }
    }

    // sandeep, end
    this.refreshUserList();
    this.titleService.setTitle('User management');
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, userId: this.userId };
    const dialogRef = this.dialog.open(SignUpComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.refreshUserList();
    });
  }
  refreshUserList() {
    const spinnerRef = this.spinnerService.start('loading');

    // sandeep, start
    if (this.userRoles == 'HR_MANAGER'
      || this.userRoles == 'AE_IT') {
      console.log("If block is work");
      this.manageUserService.getUsersByCircle(this.adUserDetail.userCircle.circleId).pipe(takeUntil(this.unsubscribe$),
        (finalize(() => { this.spinnerService.stop(spinnerRef); })))
        .subscribe((data) => {
          const list: any = data['list'];
          this.listData = new MatTableDataSource(list);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
          console.log('userDataIf :-', list);
        });
    } else {
      console.log("Else block is work");
      this.manageUserService.getUserList().pipe(takeUntil(this.unsubscribe$),
        (finalize(() => { this.spinnerService.stop(spinnerRef); })))
        .subscribe((data) => {
          const list: any = data['list'];
          this.listData = new MatTableDataSource(list);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
          console.log('userDataElse :-', list);
        });
    }

    // this.manageUserService.getUserList().pipe(takeUntil(this.unsubscribe$),
    //   (finalize(() => { this.spinnerService.stop(spinnerRef); })))
    //   .subscribe((data) => {
    //     const list: any = data['list'];
    //     this.listData = new MatTableDataSource(list);
    //     this.listData.sort = this.sort;
    //     this.listData.paginator = this.paginator;
    //   });

    // sandeep, end
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
    if (this.listData.paginator) {
      this.listData.paginator.firstPage();
    }
  }
  onCreate() {
    this.crudType = CrudType.create;
    this.modalTitle = 'Add New User';
    this.btnTitle = 'Add New';
    this.openDialog();

  }
  onEdit(adUserId) {
    this.crudType = CrudType.update;
    this.modalTitle = 'Modify User';
    this.btnTitle = 'Update';
    this.userId = adUserId;
    this.openDialog();
  }
  onView(adUserId) {

    console.log("onView is call :-", adUserId);

    this.crudType = CrudType.view;
    this.modalTitle = 'User Details';
    this.btnTitle = 'Update';
    this.userId = adUserId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, userId: this.userId };
    const dialogRef = this.dialog.open(UserDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.refreshUserList();
    });
  }

  onChange(id, row, togglestatus) {
    const userStatus: any = {};
    userStatus.adUserId = row.adUserId;
    if (id == '1' && row.accountNonExpired) {
      userStatus.isActive = row.active;
      userStatus.isAccountNonExpired = togglestatus;
      userStatus.isAccountNonLocked = row.accountNonLocked;
      this.updateStatus(userStatus);
    } else if (id == '2' && row.accountNonLocked) {
      userStatus.isActive = row.active;
      userStatus.isAccountNonExpired = row.accountNonExpired;
      userStatus.isAccountNonLocked = togglestatus;
      this.updateStatus(userStatus);
    } else if (id == '3') {
      userStatus.isActive = togglestatus;
      userStatus.isAccountNonExpired = row.accountNonExpired;
      userStatus.isAccountNonLocked = row.accountNonLocked;
      
      this.updateStatus(userStatus);
    } else {
      this.notification.warn("Action not allowed")
    }
  }
  updateStatus(userStatus) {
    console.log(userStatus,"gggffggfrrrreettttt****************");
    
    this.manageUserService.changeUserStatus(userStatus.adUserId,userStatus).pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      console.log(data,"yyyyryyryryyryryryryryyrryr******************");
      
      if (data['code'] == '201') {
        this.refreshUserList();
      } else {
        this.notification.warn(data['message'])
      }
    });
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

