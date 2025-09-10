import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { mobPattern, emailValidator, onlycharPattern } from 'src/app/utils/app-validators';
import { Subject } from 'rxjs';
import { NameType } from '../../models/save-nsc.model';
import { AsyncValidatorService } from 'src/app/shared-services/async-validator.service';
import { takeUntil } from 'rxjs/operators';
import { PersonamInfoService } from '../../services/personal-info.service';
import { AccountInfoService } from '../../services/account-info.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit, OnDestroy {
  public personalDetailFg: FormGroup;
  public documentsFormArray: FormArray;
  public nameTypesFormArray: FormArray;
  unsubscribe$: Subject<void> = new Subject();
  userType: { [key: number]: any };
  nameType: NameType[];
  documents: {};
  relationList: { [key: number]: any };
  governmentType: {};
  department: {};
  maxToDate = new Date();
  agreementMaxDate: Date;
  connectionMinDate: Date;
  
  selectedDocumentTypeId1: number;
  selectedDocumentTypeId2: number;
  selectedDocumentTypeId3: number;
  selectedDocumentTypeId4: number;
  selectedDocumentTypeId5: number;
  selectedDocumentTypeId6: number;
  selectedDocumentTypeId7: number;
  selectedDocumentTypeId8: number;
  selectedDocumentTypeId9: number;
  
  selectednameTypeId =4;
  firstSelectednameTypeId: number;
  secondSelectednameTypeId: number;
  thirdSelectednameTypeId: number;
  fourthSelectednameTypeId: number;
  constructor(
    private formBuilder: FormBuilder,
    private asyncValidator: AsyncValidatorService,
    private personInfoService: PersonamInfoService,
    private accInfoService: AccountInfoService
  ) {
    this.personalDetailFg = this.formBuilder.group({
      nscApplicationNo: [null],
      nscApplicationDate: [null],
      userType: [null, Validators.compose([Validators.required])],
      nameTypes: this.formBuilder.array([this.addNameFg()]),  
      documents: this.formBuilder.array([this.addIdProofFg()]),  
      govtType: [{ value: '', disabled: true }, Validators.required],
      departmentName: [{ value: '', disabled: true }, Validators.required],
      mobile: ['', Validators.compose([Validators.required, mobPattern])],
      secondryMobile: ['', Validators.compose([mobPattern])],
      relation: [null, Validators.compose([Validators.required])],
      relationName: ['', Validators.compose([Validators.required, onlycharPattern])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      secondryEmail: ['', Validators.compose([emailValidator])],
      connectionDate: [null, Validators.compose([Validators.required])],
      agreementDate: [null, Validators.compose([Validators.required])],
      sequenceNo:['']
    });
    this.documentsFormArray = this.personalDetailFg.controls['documents'] as FormArray;
    this.nameTypesFormArray = this.personalDetailFg.controls['nameTypes'] as FormArray;
  }

  ngOnInit() {
    this.getHttpResponce()
  }
  public addIdProofFg() {
    return this.formBuilder.group({
      documentTypeId: [null, Validators.compose([Validators.required])],
      documentNumber: [null, Validators.compose([Validators.required])],
    });
  }
  public addDocuments() {
    
    this.documentsFormArray.push(this.addIdProofFg());
  }
  public removeDocuments(i: number) {
    
    this.documentsFormArray.removeAt(i);
    switch (i) {
      case 0:
        this.selectedDocumentTypeId1 = 0;
        break;
      case 1:
        this.selectedDocumentTypeId2 = 0;
        break;
      case 2:
        this.selectedDocumentTypeId3 = 0;
        break;
      case 3:
        this.selectedDocumentTypeId4 = 0;
        break;
      case 4:
        this.selectedDocumentTypeId5 = 0;
        break;
      case 5:
        this.selectedDocumentTypeId6 = 0;
        break;
      case 6:
        this.selectedDocumentTypeId7 = 0;
        break;
      case 7:
        this.selectedDocumentTypeId8 = 0;
        break;
      case 8:
        this.selectedDocumentTypeId9 = 0;
        break;
      default:
        break;
    }
  } 
  public addNameFg() {
    return this.formBuilder.group({
      nameTypeId: ['', Validators.required],
      name: ['', Validators.required],
    });
  }
  public addname() { 
    this.nameTypesFormArray.push(this.addNameFg());
  }
  public removeName(i: number) {
    
    this.nameTypesFormArray.removeAt(i);
    switch (i) {
      case 1:
        this.firstSelectednameTypeId = 0;
        break;
      case 2:
        this.secondSelectednameTypeId = 0;
        break;
      case 3:
        this.thirdSelectednameTypeId= 0;
        break;
      case 4:
        this.fourthSelectednameTypeId = 0;
        break;
      default: 
        break;
    }
  }
  getNameTypesFg(index): FormGroup {
    const formGroup = this.nameTypesFormArray.controls[index] as FormGroup;
    return formGroup;
  }
  setValueOnNameTypeId() {
    this.nameTypesFormArray.controls[0].get('nameTypeId').setValue(4);

  }
  
  onChangenameTypeId(index) {
    const nameTypeId = this.getNameTypesFg(index).controls['nameTypeId'].value
    switch (index) {
      case 1:
        this.firstSelectednameTypeId = nameTypeId;
        break;
      case 2:
        this.secondSelectednameTypeId = nameTypeId;
        break;
      case 3:
        this.thirdSelectednameTypeId = nameTypeId;
        break;
      case 4:
        this.fourthSelectednameTypeId = nameTypeId;
        break;
      default:
        
        break;
    }
  }

  getHttpResponce() {
    this.personInfoService.getUserType().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.userType = data['map'];
      });
    this.personInfoService.getDocType().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.documents = data['list'];
      });
    this.personInfoService.getNameType().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.nameType = data['list'];
        
        this.setValueOnNameTypeId();
      });
      this.personInfoService.getAllDepartmentNames()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.department = data['list'];
      });
  }
  onChangeuserType(id) {
    this.personInfoService.getRelationType(id).pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.relationList = data['map'];
      });
    if (id === '3') {
      
      this.personalDetailFg.controls['mobile'].clearValidators()
      this.personalDetailFg.controls['email'].clearValidators()
      this.getDocumentFg(0).controls['documentTypeId'].clearValidators();
      this.getDocumentFg(0).controls['documentNumber'].clearValidators();
      this.personalDetailFg.controls['mobile'].updateValueAndValidity({ onlySelf: true });
      this.personalDetailFg.controls['email'].updateValueAndValidity({ onlySelf: true });
      this.getDocumentFg(0).controls['documentTypeId'].updateValueAndValidity({ onlySelf: true });
      this.getDocumentFg(0).controls['documentNumber'].updateValueAndValidity({ onlySelf: true });
      this.personInfoService.getAllGovernmentType().pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.governmentType = data['list'];
        });
    } else {
      this.personalDetailFg.controls['mobile'].setValidators([Validators.compose([Validators.required, mobPattern])]);
      this.personalDetailFg.controls['email'].setValidators([Validators.compose([Validators.required, emailValidator])]);
      this.personalDetailFg.controls['mobile'].updateValueAndValidity({ onlySelf: true });
      this.personalDetailFg.controls['email'].updateValueAndValidity({ onlySelf: true });
      this.getDocumentFg(0).controls['documentTypeId'].setValidators([Validators.required]);
      this.getDocumentFg(0).controls['documentNumber'].setValidators([Validators.required]);
      this.getDocumentFg(0).controls['documentTypeId'].updateValueAndValidity({ onlySelf: true });
      this.getDocumentFg(0).controls['documentNumber'].updateValueAndValidity({ onlySelf: true });
    }
    this.personalDetailFg.controls['govtType'].reset();
    this.personalDetailFg.controls['departmentName'].reset();
  }
  onChangeGovt(value) {
/*     if (value) {
      this.personInfoService.getDepartmentByGovtId(value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.department = data['list'];
        });
    } else {
      this.department = null;
    } */
  }
  onChangeDocumentType(index, docNumber) {
    let idNumberInputControl = docNumber;
    let documentNumberValidators = null;
    const documentTypeID = this.getDocumentFg(index).controls['documentTypeId'].value
    if (documentTypeID === 1) {
      documentNumberValidators = Validators.compose([Validators.required, Validators.pattern(new RegExp('^[0-9]{12}$'))]); 
      idNumberInputControl.type = "tel"
    } else if (documentTypeID === 2) {
      documentNumberValidators = Validators.compose([
        Validators.required,
        Validators.pattern(new RegExp('([A-Z]){5}([0-9]){4}([A-Z]){1}$')) 
      ]);
      idNumberInputControl.type = "text"
    } else {
      documentNumberValidators = null;
      idNumberInputControl.type = "text"
    }
    this.getDocumentFg(index).controls['documentNumber'].setValidators(documentNumberValidators);
    this.getDocumentFg(index).controls['documentNumber'].updateValueAndValidity({ onlySelf: true });
    
    switch (index) {
      case 0:
        this.selectedDocumentTypeId1 = documentTypeID;
        break;
      case 1:
        this.selectedDocumentTypeId2 = documentTypeID;
        break;
      case 2:
        this.selectedDocumentTypeId3 = documentTypeID;
        break;
      case 3:
        this.selectedDocumentTypeId4 = documentTypeID;
        break;
      case 4:
        this.selectedDocumentTypeId5 = documentTypeID;
        break;
      case 5:
        this.selectedDocumentTypeId6 = documentTypeID;
        break;
      case 6:
        this.selectedDocumentTypeId7 = documentTypeID;
        break;
      case 7:
        this.selectedDocumentTypeId8 = documentTypeID;
        break;
      case 8:
        this.selectedDocumentTypeId9 = documentTypeID;
        break;
      default:
        
        break;
    }
  }

  
  getDocumentFg(index): FormGroup {
    
    const formGroup = this.documentsFormArray.controls[index] as FormGroup;
    return formGroup;
  }

  
  onChangeNscApplicationDate(event): void {
    this.connectionMinDate = new Date(event);
  }
  onChangeconnectionDate(event): void {
    this.agreementMaxDate = new Date(event);
    this.accInfoService.connectionDate = new Date(event)
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
