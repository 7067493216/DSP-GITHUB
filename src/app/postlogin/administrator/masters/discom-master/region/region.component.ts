import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { DialogService } from 'src/app/shared-services/dialog.service';
import { ManageRegionComponent } from './manage-region/manage-region.component';
import { ManageRegionService } from '../../services/manage-region.service';
import { Region } from '../../models/region.model';
import { CrudType } from '../../../../../shared-enum/crudType';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  regionId: number
  crudType: CrudType;
  modalTitle: string;
  btnTitle: string;
  listData: MatTableDataSource<Region>;
  displayedColumns: string[] = ['position', 'regionCode', 'region',  'edit', 'delete'];
  @ViewChild(MatPaginator,{ static: false }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: false }) sort: MatSort;
  searchKey: string;

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private manageRegionService: ManageRegionService,
    public role: RoleConstantsService
  ) {

  }

  ngOnInit() {
    this.refreshRegionList();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, regionId: this.regionId };
    const dialogRef = this.dialog.open(ManageRegionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    this.refreshRegionList();
    });
    }

  
  refreshRegionList() {
    this.manageRegionService.getRegionList().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
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
    this.modalTitle = 'Add New Region';
    this.btnTitle = 'Add New';
    this.openDialog();

  }
  onEdit(regionId) {
    this.crudType = CrudType.update;
    this.modalTitle = 'Modify Region';
    this.btnTitle = 'Update';
    this.regionId = regionId;
    this.openDialog();
  }

  onDelete(regionId) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
        if (res) {
          this.manageRegionService.deleteRegion(regionId).pipe(takeUntil(this.unsubscribe$)).subscribe( res => {
            this.refreshRegionList();
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
