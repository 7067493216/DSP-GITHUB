import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { LoadChangeService } from '../services/load-change.service';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';
import { CryptoService } from 'src/app/shared-services/crypto.service';
import { Router } from '@angular/router';
import { SearchKeyStatusService } from 'src/app/shared-services/search-key-status.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { AccountInfoService } from '../services/account-info.service';

import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';




@Component({
  selector: 'app-load-change-ht',
  templateUrl: './load-change-ht.component.html',
  styleUrls: ['./load-change-ht.component.css']
})
export class LoadChangeHtComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  changeLoadFg: FormGroup;
  newLoadFormArray: FormArray;
  keys = Object.keys;
  contractQuantity: Array<any> = [];
  firstSelectedContractType = '';
  secondSelectedContractType = '';
  thirdSelectedContractType = '';
  fourthSelectedContractType = '';
  loadRecordDetails: Array<any> = [];
  consumerDetails: any = {};
  isSearchkey: string;
  accountId: string;
  showWarning: boolean = false;
  standByCdWarning: boolean = false;
  contractTypeId: number;
  supplyVoltage: number;
  loadValue: number;
  contractDemand: number;
  totalLoad: number;
  maximumLoad: number;
  warningCheckBoxRequired: boolean = false;
  selectedContractTypeId: number;
  loadCanIncrease: boolean = false;
  /******** vivek 05-07-2022 starts ***********************/

  isGmcChange: boolean;
  purposeOfGmcData: Array<any> = [];
  purposeOfGmcId: number;
  /******** vivek 05-07-2022 ends ***********************/

  /**********18-07-2022 starts **************************** */
  // regFeeRefund
  /**********18-07-2022 ends **************************** */
  maxDate = new Date();

  constructor(
    /******** vivek 05-07-2022 starts ***********************/
    private accInfoService: AccountInfoService,
    /******** vivek 05-07-2022 starts ***********************/
    private formBuilder: FormBuilder,
    private titleService: Title,
    private loadService: LoadChangeService,
    public role: RoleConstantsService,
    private crypto: CryptoService,
    private router: Router,
    private sharedData: SearchKeyStatusService,
    private notificationService: NotificationService,

  ) { }
  /******** vivek 05-07-2022 starts ***********************/



  // onGmcChangeEventOld(ob: MatCheckboxChange) {
  //   console.log("gmc changed checkbox value: " + ob.checked);
  //   this.isGmcChange = ob.checked;
  //   if (!ob.checked) {
  //     console.log("false ----gmc changed checkbox value: " + ob.checked);
  //     this.isGmcChange = false;
  //     this.changeLoadFg.controls['purposeOfGmcId'].setValue('');
  //     this.changeLoadFg.controls['gmc'].setValue('');
  //   } else {
  //     console.log("true ----gmc changed checkbox value: " + ob.checked);
  //     this.isGmcChange = true;
  //   }
  // }


  onGmcChangeEvent(ob: MatRadioChange) {


    let mrButton: MatRadioButton = ob.source;

    var gmcValueIsChanged: boolean;
    if (mrButton.value == "true") {
      gmcValueIsChanged = true;
    } else if (mrButton.value == "false") {
      gmcValueIsChanged = false;
    }


    if (!gmcValueIsChanged) {
      console.log("false ----gmc changed radio value: " + ob.value);
      this.isGmcChange = false;
      this.changeLoadFg.controls['purposeOfGmcId'].setValue('');
      this.changeLoadFg.controls['gmc'].setValue('');
    } else if (gmcValueIsChanged) {
      console.log("true ----gmc changed radio value: " + ob.value);
      this.isGmcChange = true;
    } else {
      console.log("some other value:  " + ob.value);
    }
  }
  /******** vivek 05-07-2022 starts ***********************/
  ngOnInit() {
    this.titleService.setTitle('Load Change');
    this.sharedData.getData.subscribe(message => this.isSearchkey = message);
    if (this.isSearchkey !== 'connectedConsumer') {
      this.router.navigate(['/dashboard']);
      sessionStorage.removeItem('SearchKey');
    } else {
      const encryptedAccountId = sessionStorage.getItem('SearchKey');
      this.accountId = this.crypto.textDecrypt(encryptedAccountId);
      this.getConsumerDetails();
    }
    this.changeLoadFg = this.formBuilder.group({
      /******** vivek 05-07-2022 starts ***********************/
      // gmcChange: false,
      gmcChange: ['', Validators.required],
      gmc: [''],
      purposeOfGmcId: [this.purposeOfGmcId],
      /******** vivek 05-07-2022 ends ***********************/

      /**********18-07-2022 starts **************************** */
      regFeeRefund: ['', Validators.required],
      /**********18-07-2022 ends **************************** */

      /**********18-07-2022 starts **************************** */

      loadChangeRemark: [''],
      loadChangeApplicationNumber: ['', Validators.required],
      loadChangeApplicationDate: ['', Validators.required],

      /**********18-07-2022 ends **************************** */


      consumerId: [''],
      regFeeAmount: [''],
      regReferenceNo: [''],
      regPaymentDate: [''],
      sdAmount: [''],
      sdReferenceNo: [''],
      sdReferenceDate: [''],
      warningCheckBox: false,
      newLoad: this.formBuilder.array([
        this.addnewLoadFg()
      ])
    });
    this.newLoadFormArray = this.changeLoadFg.controls['newLoad'] as FormArray;
  }
  private addnewLoadFg() {
    return this.formBuilder.group({
      loadEffectiveDate: ['', Validators.required],
      contractType: ['', Validators.required],
      value: ['', Validators.required]
    });
  }
  addLoad() {
    this.newLoadFormArray.push(this.addnewLoadFg());
  }
  removeLoad(i: number) {

    this.newLoadFormArray.removeAt(i);
    switch (i) {
      case 0:
        this.firstSelectedContractType = '';
        break;
      case 1:
        this.secondSelectedContractType = '';
        break;
      case 2:
        this.thirdSelectedContractType = '';
        break;
      case 3:
        this.fourthSelectedContractType = '';
        break;
      default:

        break;
    }
  }
  resetLoadFormArray() {
    while (1 !== this.newLoadFormArray.length) {
      this.newLoadFormArray.removeAt(1);
    }
  }
  resetDropDownValidations() {
    this.firstSelectedContractType = '';
    this.secondSelectedContractType = '';
    this.thirdSelectedContractType = '';
    this.fourthSelectedContractType = '';
  }
  getnewLoadFg(index): FormGroup {
    const formGroup = this.newLoadFormArray.controls[index] as FormGroup;
    return formGroup;
  }

  onChangeContractQuantityType(index) {
    this.getnewLoadFg(index).controls['value'].reset();
    const contractTypeId = this.getnewLoadFg(index).controls['contractType'].value
    const LoadFgValue = this.changeLoadFg.value['newLoad']
    switch (index) {
      case 0:
        this.firstSelectedContractType = contractTypeId;
        break;
      case 1:
        this.secondSelectedContractType = contractTypeId;
        break;
      case 2:
        this.thirdSelectedContractType = contractTypeId;
        break;
      case 3:
        this.fourthSelectedContractType = contractTypeId;
        break;
      default:

        break;
    }
    const filtered = LoadFgValue.filter(row => row.contractType === 2);
    if (filtered.length == 0) {
      this.loadCanIncrease = false;
    }
  }

  getConsumerDetails() {
    this.loadService.getConsumerDetails(this.accountId).pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        const httpResponce = data['code'] * 1;
        this.consumerDetails = (data['list'][0]);
        if (httpResponce === 200) {

          /******** vivek 05-07-2022 starts ***********************/
          this.purposeOfGmcData = this.consumerDetails['purposeForGMCs'];
          this.purposeOfGmcId = this.consumerDetails['purposeOfGmcId'];
          // this.changeLoadFg.controls['purposeOfGmcId'].setValue(this.consumerDetails['purposeOfGmcId']);
          // this.changeLoadFg.controls['gmc'].setValue(this.consumerDetails['gmc']);



          // this.isGmcChange = false;
          /******** vivek 05-07-2022 ends ***********************/

          this.changeLoadFg.controls['consumerId'].setValue(this.accountId);
          this.loadService.loadChangeDetails(this.accountId).pipe(takeUntil(this.destroy$))
            .subscribe(record => {
              this.loadRecordDetails = (record['list']);
            });
          this.loadService.getContractQuantity().pipe(takeUntil(this.destroy$))
            .subscribe(items => {
              this.contractQuantity = (items['list']);
            });
        } else if (httpResponce === 100) {
          this.notificationService.warn(data['message']);
        } else {
          this.notificationService.error(data['message']);
        }
      });
  }

  OnChangeValue(index) {
    this.totalLoad = 0;
    this.selectedContractTypeId = this.getnewLoadFg(index).controls['contractType'].value || 0
    this.supplyVoltage = this.consumerDetails['supplyVoltage'].replace(/\D/g, '') * 1;
    this.loadValue = this.getnewLoadFg(index).controls['value'].value * 1;
    this.contractDemand = this.consumerDetails['contractDemand'].replace(/\D/g, '') * 1;
    const totalLoadValue = this.loadValue + this.contractDemand;
    this.totalLoad = totalLoadValue;
    if (this.selectedContractTypeId == 5) {
      if (this.supplyVoltage == 11 && totalLoadValue > 300) {
        this.standByCdWarning = true;
        this.showWarning = false
        this.maximumLoad = 300;
      } else if (this.supplyVoltage == 33 && totalLoadValue > 10000) {
        this.standByCdWarning = true
        this.showWarning = false
        this.maximumLoad = 10000;
      } else if (this.supplyVoltage == 132 && totalLoadValue > 50000) {
        this.standByCdWarning = true
        this.showWarning = false
        this.maximumLoad = 50000;
      } else {
        this.standByCdWarning = false
        this.showWarning = false
      }
    } else {
      if (this.supplyVoltage == 11 && this.loadValue > 300) {
        this.showWarning = true
        this.standByCdWarning = false
        this.maximumLoad = 300;
      } else if (this.supplyVoltage == 33 && this.loadValue > 10000) {
        this.maximumLoad = 10000;
        this.showWarning = true
        this.standByCdWarning = false
      } else if (this.supplyVoltage === 132 && this.loadValue > 50000) {
        this.maximumLoad = 50000;
        this.showWarning = true
        this.standByCdWarning = false
      } else {
        this.showWarning = false
        this.standByCdWarning = false
      }
    }
    if (this.showWarning || this.standByCdWarning) {
      this.warningCheckBoxRequired = false;
    } else {
      this.warningCheckBoxRequired = true;
    }

    const contractDemand = this.consumerDetails['contractDemand'] * 1;
    if (this.selectedContractTypeId == 2) {
      this.loadCanIncrease = false;
      if (contractDemand < this.loadValue) {
        this.loadCanIncrease = true;
      } else {
        this.loadCanIncrease = false;
        if (!this.consumerDetails['loadReductionFlag']) {
          this.notificationService.warn('Load reduction isn’t allowed for this consumer');
          this.getnewLoadFg(index).controls['value'].reset();
        }
      }
    }
  }
  onChangeWarningCheckBox(event) {
    this.warningCheckBoxRequired = event;
  }
  saveUpdatedLoad(fromData) {
    this.loadService.saveUpdatedLoad(fromData).pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        const responceCode = data['code'] * 1;
        if (responceCode === 201) {
          this.resetLoadFormArray();
          this.changeLoadFg.reset();
          this.changeLoadFg.markAsUntouched();
          this.changeLoadFg.markAsPristine();
          this.getConsumerDetails();
          this.resetDropDownValidations();
          this.notificationService.success(data['message'])
        } else {
          this.notificationService.error(data['message'])
        }
      });
  }

  /******** vivek 05-07-2022 starts ***********************/
  onChangepurposeOfGmc(id) {

    if (id == this.purposeOfGmcId) {
      this.changeLoadFg.controls['purposeOfGmcId'].setValue('');
      this.changeLoadFg.controls['gmc'].setValue('');
      this.notificationService.error('Please change purpose of GMC with different Value !');
      return;
    }



    this.accInfoService.getGmcByPurposeOfGmcId(id).pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        if (data) {
          const gmcData = data['list'][0];
          if (this.isGmcChange == true) {
            this.changeLoadFg.controls['gmc'].setValue(gmcData['gmcValue']);
          }
        }
      });
  }
  /******** vivek 05-07-2022 ends ***********************/

  ngOnDestroy() {
    this.destroy$.next(true);

    this.destroy$.unsubscribe();

  }





}
