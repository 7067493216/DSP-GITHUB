import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { DialogService } from 'src/app/shared-services/dialog.service';
import { CreateDistComponent } from './create-dist/create-dist.component';
import { CrudType } from 'src/app/shared-enum/crudType';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocationMasterService } from '../../../services/location-master.service';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';

@Component({
  selector: 'app-dist-list',
  templateUrl: './dist-list.component.html',
  styleUrls: ['./dist-list.component.css']
})
export class DistListComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  districtId: number;
  crudType: CrudType;
  modalTitle: string;
  btnTitle: string;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'position','districtState.state', 'district', 'edit', 'delete'];
  @ViewChild(MatPaginator,{ static: false }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: false }) sort: MatSort;
  searchKey: string;

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private locationMasterService: LocationMasterService,
    public role: RoleConstantsService
  ) { }

  ngOnInit() {
    this.refreshDistrictList();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, districtId: this.districtId };
    const dialogRef = this.dialog.open(CreateDistComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    this.refreshDistrictList();
    });
    }
  refreshDistrictList() {
    this.locationMasterService.getDistrictList().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
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
    this.modalTitle = 'Add New District';
    this.btnTitle = 'Add New';
    this.openDialog();

  }
  onEdit(districtId) {
    this.crudType = CrudType.update;
    this.modalTitle = 'Modify District';
    this.btnTitle = 'Update';
    this.districtId = districtId;
    this.openDialog();
  }

  onDelete(districtId) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
        if (res) {
          this.locationMasterService.deleteDistrict(districtId).pipe(takeUntil(this.unsubscribe$)).subscribe( res => {
            this.refreshDistrictList();
            if(res['code']==='200'){
              this.notificationService.success('::' + res['message']);
            } else {
              this.notificationService.warn('::' + res['message']);
            }
          });
        }
      });
  }
  

}