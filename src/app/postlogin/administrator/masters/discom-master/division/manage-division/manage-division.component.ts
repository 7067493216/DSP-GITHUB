import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ManageCircleService } from '../../../services/manage-circle.service';
import { ManageRegionService } from '../../../services/manage-region.service';
import { ManageDivisionService } from '../../../services/manage-division.service';
import { DivisionData } from '../../../models/division.model';
import { CrudType } from 'src/app/shared-enum/crudType';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-manage-division',
  templateUrl: './manage-division.component.html',
  styleUrls: ['./manage-division.component.css']
})
export class ManageDivisionComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  dnCreationFg: FormGroup;
  circleData: Array<any> = [];
  regionData: Array<any> = [];
  divisionData: DivisionData[];
  ngGroupA: false;
  ngGroupB: false;
  ngGroupC: false;
  ngGroupD: false;
  ngGroupE: false;


  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ManageDivisionComponent>,
    private manageCircleService: ManageCircleService,
    private manageRegionService: ManageRegionService,
    private manageDivisionService: ManageDivisionService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {

  }

  ngOnInit() {
    this.dnCreationFg = this.fb.group({
      regionId: [null, Validators.compose([Validators.required])],
      circleId: [null, Validators.compose([Validators.required])],
      division: [null, Validators.compose([Validators.required])],
      divisionCode: [null, Validators.compose([Validators.required])],
      groupA: [(false)],
      groupB: [(false)],
      groupC: [(false)],
      groupD: [(false)],
      groupE: [(false)],
    });
    this.initializeForm();
    this.getHttpResponce();
  }
  initializeForm() {
    if (this.data.crudType === CrudType.create) {
      this.dnCreationFg.reset();
    } else {
      this.loadFormToEdit();
    }
  }
  loadFormToEdit() {
    this.manageDivisionService.getDivisionById(this.data.divisionId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      const list: any = data['list'];
      this.onChangeCicle(list[0].divisionCircle.circleRegion.regionId);
      this.dnCreationFg.controls['regionId'].setValue(list[0].divisionCircle.circleRegion.regionId);
      this.dnCreationFg.controls['circleId'].setValue(list[0].divisionCircle.circleId);
      this.dnCreationFg.controls['divisionCode'].setValue(list[0].divisionCode);
      this.dnCreationFg.controls['division'].setValue(list[0].division);
      this.dnCreationFg.controls['groupA'].setValue(list[0].groupAStatus);
      this.dnCreationFg.controls['groupB'].setValue(list[0].groupBStatus);
      this.dnCreationFg.controls['groupC'].setValue(list[0].groupCStatus);
      this.dnCreationFg.controls['groupD'].setValue(list[0].groupDStatus);
      this.dnCreationFg.controls['groupE'].setValue(list[0].groupEStatus);
    });

  }
  onSubmit() {
    const divisionData = this.dnCreationFg.value;
    if (this.dnCreationFg.valid) {
      if (this.data.crudType === CrudType.create) {
        this.manageDivisionService.addDivision(divisionData).pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            if (data['code'] === '201') {
              this.onClose();
              this.notificationService.success('::' + data['message']);
            } else {
              this.notificationService.warn('::' + data['message']);
            }
          });
      } else {
        //// console.log(divisionData);
        this.manageDivisionService.updateDivision(this.data.divisionId, divisionData).pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            if (data['code'] === '204') {
              this.onClose();
              this.notificationService.success('::' + data['message']);
            } else {
              this.notificationService.warn('::' + data['message']);
            }
          });
      }

    }
  }
  onClose() {
    this.dnCreationFg.reset();
    this.dialogRef.close();
  }
  getHttpResponce() {
    this.manageRegionService.getRegionList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.regionData = data['list'];
      });

  }
  onChangeCicle(value) {

    if (value) {
      this.manageCircleService.getCircleByRegionId(value)
        .pipe(takeUntil(this.unsubscribe$)).subscribe(
          data => {
            this.circleData = data['list'];
          }
        );
    } else {
      //// console.log('DATA RESET');
      this.circleData = null;
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
