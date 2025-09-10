import { Component, OnInit, Inject, OnDestroy, ɵConsole } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ManageUserService } from '../../services/manage-user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject();
  basicdetails: Array<any> = [];
  userRoles: Array<any> = [];
  maskAadhaarNo: string = null;


  constructor(
    private manageUserService: ManageUserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserDetailsComponent>,
  ) { }

  ngOnInit() {
    this.viewUserById();
  }
  viewUserById() {

    console.log("viewUserById is call :");

    this.manageUserService.viewUserById(this.data.userId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.basicdetails = data['list'];
      console.log(this.basicdetails)
      this.filedMaskFormat();
      console.log("user basic details:", this.basicdetails);
      const rolesdetails = this.basicdetails.filter(rolesList => rolesList.userRoles);
      this.userRoles = rolesdetails[0].userRoles;
    });
  }

  onClose() {
    this.dialogRef.close();
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  filedMaskFormat() {

    console.log("maskFormat call !!!");
    // let aadhaarNo = String(646799434921);

    let aadhaarNo = this.basicdetails[0]?.aadharNo;
    let sliced = aadhaarNo.slice(-4);
    this.maskAadhaarNo = String(sliced).padStart(aadhaarNo.length, "*")
    console.log('maskAadhaarNo :- ', this.maskAadhaarNo);
    return this.maskAadhaarNo;
  }
}
