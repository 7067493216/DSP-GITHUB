import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateStateComponent } from './create-state/create-state.component';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { DialogService } from 'src/app/shared-services/dialog.service';
import { Subject } from 'rxjs';
import { CrudType } from 'src/app/shared-enum/crudType';
import { LocationMasterService } from '../../../services/location-master.service';
import { takeUntil } from 'rxjs/operators';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.css']
})
export class StateListComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  stateId: number;
  crudType: CrudType;
  modalTitle: string;
  btnTitle: string;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'position', 'state', 'edit', 'delete'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  searchKey: string;

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private locationMasterService: LocationMasterService,
    public role: RoleConstantsService
  ) { }

  ngOnInit() {
    this.refreshStateList();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, stateId: this.stateId };
    const dialogRef = this.dialog.open(CreateStateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.refreshStateList();
    });
  }

  
  refreshStateList() {
    this.locationMasterService.getAllStatesByCountry().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
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
    this.modalTitle = 'Add New Division';
    this.btnTitle = 'Add New';
    this.openDialog();

  }
  onEdit(stateId) {
    this.crudType = CrudType.update;
    this.modalTitle = 'Modify Division';
    this.btnTitle = 'Update';
    this.stateId = stateId;
    this.openDialog();
  }

  onDelete(districtId) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
        if (res) {

          this.notificationService.warn('na kar pauga');
        }
      });
  }


}