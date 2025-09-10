import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewEquipmentDetailsService } from '../../services/new-equipment-details.service';
import { takeUntil } from 'rxjs/operators';
import { DialMf } from '../../models/dialMfCalculation.model';
import { SharedDataService } from 'src/app/shared-services/shared-data.service';

@Component({
  selector: 'app-me-details',
  templateUrl: './me-details.component.html',
  styleUrls: ['./me-details.component.css']
})
export class MeDetailsComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject();
  meFg: FormGroup;
  
  EquipmentCTParameter:Array <any>= [];
  meCTValue:Array <any>= [];
  ctManufacturer:Array <any>= [];
  ctModels:Array <any>= [];
  mePtParameter:Array <any>= [];
  mePtManufacturer:Array <any>= [];
  mePTParameterValue:Array <any>= [];
  mePTPTModel:Array <any>= [];
  modemManufacturer:Array <any>= [];
  modemModel:Array <any>= [];
  simServiceProvider:Array <any>= [];
  dialMf: DialMf = {} as DialMf;
  
  public meCtr: any;
  public mePtr: any;
  mtrCtPtRatio:{}
  
  public MF: any;
  constructor(
    private formBuilder: FormBuilder,
    private newEquipmentService: NewEquipmentDetailsService,
    private data: SharedDataService
  ) {
    this.meFg = this.formBuilder.group({
      ctParameter: ['', Validators.required],
      ctParameterValue: ['', Validators.required],
      ctManufacturer: ['', Validators.required],
      ctModel: ['', Validators.required],
      ctSerialNo: ['', Validators.required],
      ptParameter: ['', Validators.required],
      ptParameterValue: ['', Validators.required],
      ptManufacturer: ['', Validators.required],
      ptModel: ['', Validators.required],
      ptSerialNo: ['', Validators.required],
      modemManufacturer: ['', Validators.required],
      modemModel: ['', Validators.required],
      modemSerialNo: ['', Validators.required],
      simId: ['', Validators.required],
      imsiCode: [''],
      dialMF: ['', Validators.required],
      mf: ['', Validators.required],
    });
   }

  ngOnInit() {
    this.getHttpResponce();

  }
  getHttpResponce() {
    this.newEquipmentService.getAllCTParameter()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.EquipmentCTParameter = data['list'];
      });
    this.newEquipmentService.getCTManufacturer()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.ctManufacturer = data['list'];
      });
    this.newEquipmentService.getAllPTParameter()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.mePtParameter = data['list'];
      });
    this.newEquipmentService.getPTManufacturer()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.mePtManufacturer = data['list'];
      });
    this.newEquipmentService.getModemManufacturer()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.modemManufacturer = data['list'];
      });
    this.newEquipmentService.getSimServiceProvider()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.simServiceProvider = data['list'];
      });
  }
  onChangeCtParameter(value) {
    if (value) {
      this.newEquipmentService.getCTValueByCTParameter(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.meCTValue = data['list'];

          }
        );
    } else {
      this.meCTValue = null;
    }
  }
  
  onChangemodel(value) {
    if (value) {
      this.newEquipmentService.getCtModelByCTManufacturer(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.ctModels = data['list'];
            

          }
        );
    } else {
      this.ctModels = null;
    }
  }
  
  onChangeptMeParameter(value) {
    if (value) {
      this.newEquipmentService.getPTParameterValueByPTParameter(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.mePTParameterValue = data['list'];
          }
        );
    } else {
      this.ctModels = null;
    }
  }
  
  onChangeptModel(value) {
    if (value) {
      this.newEquipmentService.getPTModelByManufacturer(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.mePTPTModel = data['list'];
          }
        );
    } else {
      this.ctModels = null;
    }
  }
  
  onChangeModemModel(value) {
    if (value) {
      this.newEquipmentService.getModemModelByManufacturer(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.modemModel = data['list'];
          }
        );
    } else {
      this.ctModels = null;
    }
  }

  
  mfCalculation(dialMF) {
    this.mtrCtPtRatio=this.newEquipmentService.mtrCtPtRatio;
    
    this.dialMf.ctParameterValue = this.meCtr;
    this.dialMf.dialMF = dialMF*1;
    this.dialMf.meterCTRatio = this.mtrCtPtRatio['meterCTRatio'];
    this.dialMf.meterPTRatio =this.mtrCtPtRatio['meterPTRatio'];
    this.dialMf.ptParameterValue = this.mePtr;
    this.newEquipmentService.calculateDialMf(this.dialMf).pipe(takeUntil(this.unsubscribe$)).subscribe(
      data => {
        if (data) {
          const responce = data['list'];
          this.MF = responce[0].mf;
        }
      });
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
