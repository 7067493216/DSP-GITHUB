import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PremiseInfoService } from '../../services/premise-info.service';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DiscomToGroupService } from 'src/app/shared-services/discom-to-group.service';

@Component({
  selector: 'app-premise-address',
  templateUrl: './premise-address.component.html',
  styleUrls: ['./premise-address.component.css']
})
export class PremiseAddressComponent implements OnInit {
  public premiseFg: FormGroup;
  unsubscribe$: Subject<void> = new Subject();
  discomData: Array<any> = [];
  regionData: Array<any> = [];
  circleData: Array<any> = [];
  divisionData: Array<any> = [];
  subDivisionData: Array<any> = [];
  dcData: Array<any> = [];
  subStationData: Array<any> = [];
  groupData: { [key: number]: any };
  feederData: Array<any> = [];
  locationCode: Array<any> = [];
  stateData: Array<any> = [];
  districtData: Array<any> = [];
  cityData: Array<any> = [];
  tehsilData: Array<any> = [];
  districtData1: Array<any> = [];
  tehsilData1: Array<any> = [];
  cityData1: Array<any> = [];
  supplyVoltages: { [key: number]: any };
  meterType: Array<any> = [];
  configuration: Array<any> = [];
  meterRentType: Array<any> = [];
  manufactureType: Array<any> = [];
  meterCapacities: { [key: number]: any };
  ctRatios: Array<any> = [];
  ptRatios: Array<any> = [];
  triffData: Array<any> = [];
  SubCategoryData: Array<any> = [];
  purposeData: Array<any> = [];
  tariffData: Array<any> = [];
  gmcData: Array<any> = [];
  revenueCategoryData: {}
  department: Array<any> = [];
  governmentType: Array<any> = [];
  idProof: { [key: number]: any };
  areaType: { [key: number]: any };
  areaTown: { [key: number]: any };
  constructor(
    private formBuilder: FormBuilder,
    private premiseInfoService: PremiseInfoService,
    private discomToGroupService: DiscomToGroupService,
    public role: RoleConstantsService
  ) {
    this.premiseFg = this.formBuilder.group({
      premiseType: ['', Validators.required],
      region: ['', Validators.required],
      circle: ['', Validators.required],
      division: ['', Validators.required],
      subDivision: ['', Validators.required],
      dc: ['', Validators.required],
      subStation: ['', Validators.required],
      feeder: ['', Validators.required],
      areaType: ['', Validators.required],
      areaTowns: ['', Validators.required],
      houseNo: ['', Validators.required],
      pinCode: ['', Validators.required],
      areaColony: ['', Validators.required],
      district: ['', Validators.required],
      tehsil: ['', Validators.required],
      city: ['', Validators.required],
      mailingAddress: ['1'],
      houseStreetNo1: [{ value: '', disabled: true }, Validators.required],
      state: [{ value: '', disabled: true }, Validators.required],
      areaColony1: [{ value: '', disabled: true }, Validators.required],
      tehsil1: [{ value: '', disabled: true }, Validators.required],
      district1: [{ value: '', disabled: true }, Validators.required],
      city1: [{ value: '', disabled: true }, Validators.required],
      pinCode1: [{ value: '', disabled: true }, Validators.required],
    });
  }

  ngOnInit() {
    this.getHttpResponce();
  }
  getHttpResponce() {
    this.premiseInfoService.getAreaTown().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.areaTown = data['map'];
      });
    this.premiseInfoService.getAreaType().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.areaType = data['map'];
      });
    this.discomToGroupService.getAllRegion().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.regionData = data['list'];
      });
    this.premiseInfoService.getAllStatesByCountry().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.stateData = data['list'];
      });
    this.premiseInfoService.getDistrictList().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.districtData = data['list'];
      });
  }

  onChangeDiscom(value) {
    if (value) {
      this.discomToGroupService.getAllRegion()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.regionData = data['list'];
          this.circleData = null;
          this.divisionData = null;
          this.subDivisionData = null;
          this.dcData = null;
          this.subStationData = null;
          this.feederData = null;
        });
    } else {
      this.regionData = null;
      this.circleData = null;
      this.divisionData = null;
      this.subDivisionData = null;
      this.dcData = null;
      this.subStationData = null;
      this.feederData = null;
    }
  }
  onChangeRegion(value) {
    if (value) {
      this.discomToGroupService.getCircleByRegionId(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.circleData = data['list'];
            this.divisionData = null;
            this.subDivisionData = null;
            this.dcData = null;
            this.subStationData = null;
            this.feederData = null;
          }
        );
    } else {
      this.circleData = null;
      this.divisionData = null;
      this.subDivisionData = null;
      this.dcData = null;
      this.subStationData = null;
      this.feederData = null;
    }
  }
  onChangeCircle(value) {
    if (value) {
      this.discomToGroupService.getAllDivisionByCircleId(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.divisionData = data['list'];
            this.subDivisionData = null;
            this.dcData = null;
            this.subStationData = null;
            this.feederData = null;
          }
        );
    } else {
      this.divisionData = null;
      this.subDivisionData = null;
      this.dcData = null;
      this.subStationData = null;
      this.feederData = null;
    }
  }
  onChangeDivision(value) {
    if (value) {
      this.discomToGroupService.getAllSubDivisionByDivisionId(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.subDivisionData = data['list'];
            this.dcData = null;
            this.subStationData = null;
            this.feederData = null;
          }
        );
      this.discomToGroupService.getAllGroupsByDivision(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            if (data['code'] == '200') {
              this.groupData = data['list'][0].values;
            }
          }
        );
    } else {
      this.subDivisionData = null;
      this.dcData = null;
      this.subStationData = null;
      this.feederData = null;
      this.groupData = null;
    }
  }
  onChangeSubDivision(value) {
    if (value) {
      this.discomToGroupService.getDcBySubdivision(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.dcData = data['list'];
            this.subStationData = null;
            this.feederData = null;
          }
        );
    } else {
      this.dcData = null;
      this.subStationData = null;
      this.feederData = null;
    }
  }
  onChangeDc(value) {
    if (value) {
      // this.discomToGroupService.getSubstationByDC(value)
      this.discomToGroupService.getAllSubstations()
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.subStationData = data['list'];
            this.feederData = null;
          }
        );
    } else {
      this.subStationData = null;
      this.feederData = null;
    }
  }
  onChangeSubStation(value) {
    if (value) {
      this.discomToGroupService.getFeederBySubstation(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.feederData = data['list'];
          }
        );
    } else {
      this.feederData = null;
    }
  }


  onChangeDistrict(value) {
    if (value) {
      this.premiseInfoService.getAllByDistrict(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.tehsilData = data['list'];
            this.cityData = null;
          }
        );
    } else {
      this.tehsilData = null;
      this.cityData = null;
    }
  }
  onChangeTehsil(value) {
    if (value) {
      this.premiseInfoService.getAllByTehsil(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.cityData = data['list'];

          }
        );
    } else {
      this.cityData = null;
    }
  }

  onChangeState(value) {
    if (value) {
      this.premiseInfoService.getAllByState(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.districtData1 = data['list'];
            this.tehsilData1 = null;
            this.cityData1 = null;
          }
        );
    } else {
      this.districtData1 = null;
      this.tehsilData1 = null;
      this.cityData1 = null;
    }
  }
  onChangeDistrict1(value) {
    if (value) {
      this.premiseInfoService.getAllByDistrict(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.tehsilData1 = data['list'];
            this.cityData1 = null;
          }
        );
    } else {
      this.tehsilData1 = null;
      this.cityData1 = null;

    }
  }
  onChangeTehsil1(value) {
    if (value) {
      this.premiseInfoService.getAllByTehsil(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.cityData1 = data['list'];
          }
        );
    } else {
      this.cityData1 = null;
    }
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
