import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { DialogService } from 'src/app/shared-services/dialog.service';
import { ManageSubDivisionComponent } from './manage-sub-division/manage-sub-division.component';
import { takeUntil } from 'rxjs/operators';
import { ManageSubDivisionService } from '../../services/manage-sub-division.service';
import { CrudType } from 'src/app/shared-enum/crudType';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';

@Component({
  selector: 'app-sub-division',
  templateUrl: './sub-division.component.html',
  styleUrls: ['./sub-division.component.css']
})
export class SubDivisionComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  subDivisionId: number;
  crudType: CrudType;
  modalTitle: string;
  btnTitle: string;
  listData: MatTableDataSource<{}>;
  displayedColumns: string[] = [
    'position', 'subdivisionDivision.divisionCircle.circleRegion.regionDiscom.discom', 'subdivisionDivision.divisionCircle.circleRegion.region', 'subdivisionDivision.divisionCircle.circle', 'subdivisionDivision.division', 'subDivision', 'subDivisionCode', 'edit', 'delete'];
  @ViewChild(MatPaginator,{ static: false }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: false }) sort: MatSort;
  searchKey: string;

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private manageSubDivisionService: ManageSubDivisionService,
    public role: RoleConstantsService

  ) { }

  ngOnInit() {
    this.refreshSubDivisionList();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, subDivisionId: this.subDivisionId };
    const dialogRef = this.dialog.open(ManageSubDivisionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      
      
      this.refreshSubDivisionList();
    });
  }

  
  refreshSubDivisionList() {
    this.manageSubDivisionService.getSubDivisionList().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
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
    this.modalTitle = 'Add New Sub Division';
    this.btnTitle = 'Add New';
    this.openDialog();

  }
  onEdit(subDivisionId) {
    
    this.crudType = CrudType.update;
    this.modalTitle = 'Modify Sub Division';
    this.btnTitle = 'Update';
    this.subDivisionId = subDivisionId;
    this.openDialog();
  }

  onDelete(subDivisionId) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
        if (res) {
          this.manageSubDivisionService.deleteSubDivision(subDivisionId).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
            this.refreshSubDivisionList();
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
