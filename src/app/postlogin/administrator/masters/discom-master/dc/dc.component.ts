import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { CrudType } from 'src/app/shared-enum/crudType';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { DialogService } from 'src/app/shared-services/dialog.service';
import { ManageDcComponent } from './manage-dc/manage-dc.component';
import { takeUntil } from 'rxjs/operators';
import { ManageDcService } from '../../services/manage-dc.service';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';


@Component({
  selector: 'app-dc',
  templateUrl: './dc.component.html',
  styleUrls: ['./dc.component.css']
})
export class DcComponent implements OnInit {

  unsubscribe$: Subject<void> = new Subject();
  dcId: number
  crudType: CrudType;
  modalTitle: string;
  btnTitle: string;
  listData: MatTableDataSource<{}>;
  displayedColumns: string[] = [
    'position','dcSubdivision.subdivisionDivision.divisionCircle.circleRegion.region', 'dcSubdivision.subdivisionDivision.divisionCircle.circle', 'dcSubdivision.subdivisionDivision.division', 'dcSubdivision.subDivision','dcName','dcCode', 'edit', 'delete'];
  @ViewChild(MatPaginator,{ static: false }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: false }) sort: MatSort;
  searchKey: string;

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private manageDcService: ManageDcService,
    public role: RoleConstantsService
  ) { }

  ngOnInit() {
    this.refreshDcList();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, dcId: this.dcId };
    const dialogRef = this.dialog.open(ManageDcComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    this.refreshDcList();
    });
    }
  refreshDcList() {
    this.manageDcService.getDcList().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
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
    this.modalTitle = 'Add New DC';
    this.btnTitle = 'Add New';
    this.openDialog();

  }
  onEdit(dcId) {
    this.crudType = CrudType.update;
    this.modalTitle = 'Modify DC';
    this.btnTitle = 'Update';
    this.dcId = dcId;
    this.openDialog();
  }

  onDelete(dcId) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
        if (res) {
          this.manageDcService.deleteDc(dcId).pipe(takeUntil(this.unsubscribe$)).subscribe( res => {
            this.refreshDcList();
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
