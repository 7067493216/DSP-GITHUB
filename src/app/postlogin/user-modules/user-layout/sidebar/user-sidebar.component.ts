import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { SearchKeyStatusService } from 'src/app/shared-services/search-key-status.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserLoginService } from '../../services/user-login.service';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsumerApplicationService } from '../../services/consumer-application.service';





@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  events: string[] = [];
  isSearchkey = false;
  panelOpenState = false;
  notificationsCount: number;
  isBhopalDiscom: boolean = false;
  time = new Date();
  timer;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  roleForm: FormGroup;
  roleList = [];
  foraccessLeveOfUser:any
  DistributionCenterList:Array<any> = [];
  dcSwitchForm:FormGroup
  
divisionList:Array<any>=[];
currentUserId:any
currentRoleOfUser:any


  constructor(
    private breakpointObserver: BreakpointObserver,
    public userLoginService: UserLoginService,
    public role: RoleConstantsService,
    private sharedData: SearchKeyStatusService,
    private jwtHelperService: JwtHelperService,
    private fb:FormBuilder,
    private consumerApplicationService:ConsumerApplicationService,
    
  ) {
    this.foraccessLeveOfUser = JSON.parse(sessionStorage.getItem('accessLeveOfUser'));
    this.currentUserId=this.foraccessLeveOfUser?.userId;
    this.currentRoleOfUser = JSON.parse(sessionStorage.getItem('currentRoleOfUser'));
   // console.log(this.foraccessLeveOfUser?.userId=="9999999999",this.currentUserId ,"yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",this.currentRoleOfUser?.roleCode=="Admin",this.currentRoleOfUser?.roleCode);
    // this.currentRoleOfUser = JSON.parse(sessionStorage.getItem('currentRoleOfUser'));
    this.roleList = this.foraccessLeveOfUser.userRoles;
    
    this.roleForm = this.fb.group({
      roleOfuser: [""]
    })
   }

   onRoleChange(e: any) {
    console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee..................................................................................");
    if (sessionStorage.getItem("currentRoleOfUser")) {
      sessionStorage.removeItem("currentRoleOfUser");
      console.log("ifff");
      let userRole = JSON.stringify(e.value);
      sessionStorage.setItem("currentRoleOfUser", userRole);

    } else {
      console.log("elseee");
      let userRole = JSON.stringify(e.value);
      sessionStorage.setItem("currentRoleOfUser", userRole)
    }
    location.reload();
  }

  ngOnInit() {
    this.notificationsCount = 1 || 0;
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);

    const discomId = this.jwtHelperService.decodeToken(sessionStorage.getItem('usertoken')).discomName;
    console.log(discomId);
    if (discomId == "BPL") {
      this.isBhopalDiscom = true;
    } else {
      this.isBhopalDiscom = false;
    }

    const userRoles = this.jwtHelperService.decodeToken(sessionStorage.getItem('usertoken')).roles as Array<string>
    console.log("userRoles :-", userRoles);

    this.getUserAccessDcList(this.foraccessLeveOfUser.userId)

  }
  logout() {
    this.userLoginService.logout();
    sessionStorage.removeItem('SearchKey');
  }
  cleanSearchKey(drawer:any) {
    drawer.close()
    sessionStorage.removeItem('SearchKey');
    this.isSearchkey = false;
    this.sharedData.pushData(null);
  }
  ngOnDestroy() {
    clearInterval(this.timer);
  }


  onDcChange(e:any){
console.log(e,"eeeeeeeeeeeeeeeeeeeeeee");
this.userLoginService.switchDc.next(e.value);
sessionStorage.setItem("switchedDcId",e.value);
// UserLoginService // switchDc
location.reload();
  }

  onDivisionChange(e:any){
    console.log(e,"eeeeeeeeeeeeeeeeeeeeeee");
this.userLoginService.switchDivision.next(e.value);
sessionStorage.setItem("switchedDivisionId",e.value);
location.reload();
  }

getUserAccessDcList(userId:any){
  this.consumerApplicationService.getUserDcsAccessList(userId).subscribe((resp:any)=>{
    console.log(resp,"resp......................");
    if(resp){
      this.DistributionCenterList = resp?.DistributionCenter;
      if(this.DistributionCenterList?.length>0){
        this.dcSwitchForm = this.fb.group({
          dc:["",Validators.required],
          division:[""]
        })
      }
      this.divisionList = resp?.division;
      if(this.divisionList?.length>0){
        this.dcSwitchForm = this.fb.group({
          dc:[""],
          division:["",Validators.required]
        })
      }
// switchDivision
      
    }else{

    }
    
})
}

}
