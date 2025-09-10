import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
 
import { SearchKeyStatusService } from 'src/app/shared-services/search-key-status.service';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConsumerLoginService } from '../../services/consumer-login.service';
import { Router } from '@angular/router';

 
@Component({
  selector: 'app-consumer-sidebar',
  templateUrl: './consumer-sidebar.component.html',
  styleUrls: ['./consumer-sidebar.component.css']
})
export class ConsumerSidebarComponent implements OnInit, OnDestroy {
  events: string[] = [];
  isSearchkey = false;
  panelOpenState = false;
  notificationsCount: number;
  isBhopalDiscom: boolean = false;
  time = new Date();
  timer;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(
    private breakpointObserver: BreakpointObserver,
    public consumerLoginService: ConsumerLoginService,
    // public role: RoleConstantsService,
    private sharedData: SearchKeyStatusService,
    private route:Router
    // private jwtHelperService: JwtHelperService
  ) { }

  ngOnInit() {
    this.notificationsCount = 1 || 0;
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);

    // const discomId=this.jwtHelperService.decodeToken(sessionStorage.getItem('token')).discomName;
    // if (discomId=="BPL") {
    //   this.isBhopalDiscom=true;
    // } else {
    //   this.isBhopalDiscom=false;
    // } 
  }

  onNavigationClick(id:any){
console.log(id,"id............................");
this.route.navigate(["/consumer/refund-application-list"],{ queryParams: { id: id } })
  }


  logout() {
    
    localStorage.clear();
    this.consumerLoginService.logout();
    sessionStorage.removeItem('SearchKey');
  }
  cleanSearchKey(drawer) {
    localStorage.clear();
    drawer.close()
    sessionStorage.removeItem('SearchKey');
    this.isSearchkey = false;
    this.sharedData.pushData(null);
  }
  ngOnDestroy() {
    localStorage.clear();
    clearInterval(this.timer);
  }
}
