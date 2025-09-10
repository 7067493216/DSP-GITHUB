import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { PremiseAddressComponent } from './premise-address/premise-address.component';
import { AdditionalInformationComponent } from './additional-information/additional-information.component';
import { AccountInformationComponent } from './account-information/account-information.component';
import { MeterDetailsComponent } from './meter-details/meter-details.component';
import { MeDetailsComponent } from './me-details/me-details.component';
import { NscCoreService } from '../services/nsc-core.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared-services/shared-data.service';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';
import { SaveNscData } from '../models/save-nsc.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-new-connection',
  templateUrl: './new-connection.component.html',
  styleUrls: ['./new-connection.component.css'],
})
export class NewConnectionComponent implements OnInit{
  unsubscribe$: Subject<void> = new Subject();
  @ViewChild('personalInfo') personalInfo: PersonalInformationComponent;
  @ViewChild('premiseAddress') premiseAddress: PremiseAddressComponent;
  @ViewChild('accountInfo') accountInfo: AccountInformationComponent;
  @ViewChild('additionalInfo') additionalInfo: AdditionalInformationComponent;
  @ViewChild('meterDetails') meterDetails: MeterDetailsComponent;
  @ViewChild('meDetails') meDetails: MeDetailsComponent;

  constructor(
    private nscCoreService: NscCoreService,
    private notificationService: NotificationService,
    private router: Router,
    private data: SharedDataService,
    public role: RoleConstantsService
  ) { }

  ngOnInit() {
  }

  saveNscForm(personalDetailFg,premiseFg,accountInfoFg,additionalFormGroup,meterDetailsFg,meFg) {
    const nscData: SaveNscData = Object.assign({},personalDetailFg,premiseFg,accountInfoFg,additionalFormGroup,meterDetailsFg,meFg);
    console.log(nscData);
    this.nscCoreService.addnsc(nscData).pipe(takeUntil(this.unsubscribe$)).subscribe(
      data => {
        if (data['code'] === '201') {
          const responce = data['list'];
          this.data.pushData(responce);
          this.notificationService.success('New consumer' + responce['consumerId'] + ' :: successfully added!');
          this.router.navigate(['/ht-nsc/nsc-view']);
          this.notificationService.success(data['message']);
        } else {
          this.notificationService.warn(data['message']);
          // this.router.navigate(['/']);
        }

      });
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
