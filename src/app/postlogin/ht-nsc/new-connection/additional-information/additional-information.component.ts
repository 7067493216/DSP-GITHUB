import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
import { AccountInfoService } from '../../services/account-info.service';

@Component({
  selector: 'app-additional-information',
  templateUrl: './additional-information.component.html',
  styleUrls: ['./additional-information.component.css']
})
export class AdditionalInformationComponent implements OnInit {
  public additionalFormGroup: FormGroup;
  unsubscribe$: Subject<void> = new Subject();
  sanctionLoadValue:number;
  PurposeList:{};
  purposeOfGmc:{};
  connectionDate:Date;
  constructor(
    private formBuilder: FormBuilder,
    private accInfoService: AccountInfoService
  ) { 
    this.additionalFormGroup = this.formBuilder.group({
      sanctionLoad: ['', Validators.required],
      contractDemand: ['', Validators.required],
      tempContractDemand: [null],
      requiredAdditionalLoad: [(false)],
      contractDemand1: [{ value: '', disabled: true }, Validators.required],
      effectiveDate1: [{ value: '', disabled: true }, Validators.required],
      purposeGMC1: [{ value: '', disabled: true }, Validators.required],
      calculatedGmc: [{ value: '', disabled: true }, Validators.required],
    });
  }

  ngOnInit() { 

  }
  onChangeSanction(value){
    this.accInfoService.sanctionLoad = value * 1;
    this.sanctionLoadValue= value *1;
    if(this.accInfoService.connectionTypeId==2) {
      this.additionalFormGroup.controls['tempContractDemand'].setValidators([Validators.compose([Validators.required])]);
      this.additionalFormGroup.controls['tempContractDemand'].updateValueAndValidity({ onlySelf: true });
    } else {
      this.additionalFormGroup.controls['tempContractDemand'].clearValidators();
      this.additionalFormGroup.controls['tempContractDemand'].updateValueAndValidity({ onlySelf: true });
    }
  }
  
  addAdditionalLoadOptions(event) {
    if (event) { 
      this.purposeOfGmc = this.accInfoService.purposeOfGmc
      this.connectionDate= this.accInfoService.connectionDate;
    }
  }
  
  onChangePurposeOfGmc(value) {
    if (value) {
      this.accInfoService.getGmcByPurposeOfGmcId(value).pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        if (data) {
          const gmcData = data['list'][0];
          
          this.additionalFormGroup.controls['calculatedGmc'].setValue(gmcData['gmcValue']);
        }
      });
    } else {
      this.additionalFormGroup.controls['calculatedGmc'].reset();
    }
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
