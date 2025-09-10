import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { DialogService } from 'src/app/shared-services/dialog.service';
import { ManageSubstationComponent } from './manage-substation/manage-substation.component';
import { takeUntil } from 'rxjs/operators';
import { ManageSubStationService } from '../../services/manage-sub-station.service';
import { CrudType } from 'src/app/shared-enum/crudType';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';

@Component({
  selector: 'app-sub-station',
  templateUrl: './sub-station.component.html',
  styleUrls: ['./sub-station.component.css']
})
export class SubStationComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  subStationId: number
  crudType: CrudType;
  modalTitle: string;
  btnTitle: string;
  listData: MatTableDataSource<{}>;
  displayedColumns: string[] = [
    'position', 'substationDistributionCenter.dcSubdivision.subdivisionDivision.divisionCircle.circleRegion.region', 'substationDistributionCenter.dcSubdivision.subdivisionDivision.divisionCircle.circle', 'substationDistributionCenter.dcSubdivision.subdivisionDivision.division', 'substationDistributionCenter.dcSubdivision.subDivision', 'substationDistributionCenter.dcCode', 'subStationName', 'subStationCode', 'edit', 'delete'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  searchKey: string;

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private manageSubStationService: ManageSubStationService,
    public role: RoleConstantsService
  ) { }

  ngOnInit() {
    this.refreshSubStationList();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, subStationId: this.subStationId };
    const dialogRef = this.dialog.open(ManageSubstationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      
      
      this.refreshSubStationList();
    });
  }

  
  refreshSubStationList() {
    this.manageSubStationService.getSubStationList().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      const list: any = data['list'];
      this.listData = new MatTableDataSource(list);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      
    });

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
    if (this.listData.paginator) {
      this.listData.paginator.firstPage();
    }
  }
  onCreate() {
    this.crudType = CrudType.create;
    this.modalTitle = 'Add New Sub Station';
    this.btnTitle = 'Add New';
    this.openDialog();

  }
  onEdit(subStationId) {
    this.crudType = CrudType.update;
    this.modalTitle = 'Modify Sub Station';
    this.btnTitle = 'Update';
    this.subStationId = subStationId;
    this.openDialog();
  }

  onDelete(subStationId) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
        if (res) {
          this.manageSubStationService.deleteSubStation(subStationId).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
            this.refreshSubStationList();
            if (res['code'] === '200') {
              this.notificationService.success('::' + res['message']);
            } else {
              this.notificationService.warn('::' + res['message']);
            }
          });
        }
      });
  }


}
