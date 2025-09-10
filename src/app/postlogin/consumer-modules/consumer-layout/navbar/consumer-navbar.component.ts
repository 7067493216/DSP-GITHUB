import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// import { ConsumerLoginService } from 'src/app/auth/authservices/consumer-login.service';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';
import { RouteRoleConstants } from 'src/app/auth/authservices/route-role-constants';
import { NscCoreService } from 'src/app/postlogin/ht-nsc/services/nsc-core.service';
import { CryptoService } from 'src/app/shared-services/crypto.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SearchKeyStatusService } from 'src/app/shared-services/search-key-status.service';
import { ConsumerLoginService } from '../../services/consumer-login.service';
import { ConsumerSearchBarComponent } from './search-bar/consumer-search-bar.component';



@Component({
  selector: 'app-consumer-navbar',
  templateUrl: './consumer-navbar.component.html',
  styleUrls: ['./consumer-navbar.component.css']
})
export class ConsumerNavbarComponent implements OnInit, OnDestroy {
  isBhopalDiscom: boolean = false;
  unsubscribe$: Subject<void> = new Subject();
  searchKey;
  isSearchkey: string;
  encrypted: string;
  constructor(
    private router: Router,
    private crypto: CryptoService,
    private sharedData: SearchKeyStatusService,
    private nscCoreService: NscCoreService,
    private notificationService: NotificationService,
    private consumerLoginService: ConsumerLoginService,
    public role: RoleConstantsService,
    private location: Location,
    private dialog: MatDialog,
    private jwtHelperService: JwtHelperService
  ) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit() {
    const discomId = this.jwtHelperService.decodeToken(sessionStorage.getItem('token')).discomName;
    if (discomId == "BPL") {
      this.isBhopalDiscom = true;
    } else {
      this.isBhopalDiscom = false;
    }


    this.sharedData.getData.subscribe(message => this.isSearchkey = message)
    sessionStorage.setItem('SearchKey', '');
  }
  setSearchkey() {
    const encrypted = this.crypto.textEncrypt(this.searchKey);
    if (!this.consumerLoginService.roleMatch(RouteRoleConstants.user_canSearch)) {
      this.notificationService.warn('You are not authorized to perform this action');
    } else {
      if (this.searchKey != undefined && (this.searchKey.toString().length > 5 && this.searchKey.toString().length < 15)) {

        this.searchKey = this.searchKey.trim();


        this.nscCoreService.consumerRecordExistence(this.searchKey)
          .pipe(takeUntil(this.unsubscribe$)).subscribe(
            data => {
              if (data['code'] === '200') {
                sessionStorage.setItem('SearchKey', encrypted);
                if (sessionStorage["SearchKey"] !== "" || sessionStorage["SearchKey"] !== undefined) {
                  if (Array.isArray(data['list'])) {
                    if (data['list'][0].isPDC) {
                      this.isSearchkey = 'pdcConsumer';
                    } else {
                      this.isSearchkey = 'connectedConsumer';
                    }
                    setTimeout(() => {
                      this.sharedData.pushData(this.isSearchkey);
                      this.gotToPage();
                    }, 1);
                  } else {
                    this.notificationService.warn('List should not be null');
                  }
                  //   this.gotToPage();
                } else {
                  this.notificationService.warn('Somethings not right! please retry again');
                }

              } else {
                this.notificationService.warn(data['message']);

                // this.notificationService.warn('Record not found!,Please use advance search');
                this.openDialog();
                /*  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                 this.dashboardRouting()); */
                // this.location.back();
                this.isSearchkey = null;
                sessionStorage.removeItem('SearchKey');
                this.sharedData.pushData(null);
              }
            }
          );
      } else {
        this.openDialog();
        // this.notificationService.warn('Invalid Input');
        this.isSearchkey = null;
        this.sharedData.pushData(null);
      }
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ConsumerSearchBarComponent, {
      width: '100%',
      height: '500px',
    })
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(consumerId => {
      if (consumerId != null && consumerId != true) {
        this.searchKey = consumerId;
        this.setSearchkey();
      }
    });
  }
  navigation() {

  }
  gotToPage(): void {
    // something
    setTimeout(() => {
      if (this.router.url === '/consumer-dashboard') {
        this.router.navigateByUrl('/consumer-control/current-status');
        // this.router.navigateByUrl('/consumer-control/personal-info');
      } else {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          // this.router.navigateByUrl('/consumer-control/personal-info'));
          this.router.navigateByUrl('/consumer-control/current-status'));
      }
    }, 1); // 1000 is millisecond
  }
  cleanSearchKey() {
    sessionStorage.removeItem('SearchKey');
    this.isSearchkey = null;
    this.sharedData.pushData(null);
    this.router.navigate(['/consumer/dashboard']);

  }
  openMeterMeUrl() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigateByUrl('/meter/meter-me-replacement'));
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
