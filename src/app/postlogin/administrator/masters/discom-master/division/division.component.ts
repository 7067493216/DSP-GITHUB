import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { DialogService } from 'src/app/shared-services/dialog.service';
import { ManageDivisionComponent } from './manage-division/manage-division.component';
import { ManageDivisionService } from '../../services/manage-division.service';
import { CrudType } from 'src/app/shared-enum/crudType';
import { ManageCircleService } from '../../services/manage-circle.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  divisionId: number
  crudType: CrudType;
  modalTitle: string;
  btnTitle: string;
  listData: MatTableDataSource<{}>;
  displayedColumns: string[] = [
    'position','divisionCircle.circleRegion.region', 'divisionCircle.circle', 'division', 'divisionCode', 'edit', 'delete'];
  @ViewChild(MatPaginator,{ static: false }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: false }) sort: MatSort;
  searchKey: string;

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private manageDivisionService: ManageDivisionService,
    public role: RoleConstantsService
  ) { }

  ngOnInit() {
    this.refreshDivisionList();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, divisionId: this.divisionId };
    const dialogRef = this.dialog.open(ManageDivisionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    this.refreshDivisionList();
    });
    }
  refreshDivisionList() {
    this.manageDivisionService.getDivisionList().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
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
  onEdit(divisionId) {
    this.crudType = CrudType.update;
    this.modalTitle = 'Modify Division';
    this.btnTitle = 'Update';
    this.divisionId = divisionId;
    this.openDialog();
  }

  onDelete(divisionId) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
        if (res) {
          this.manageDivisionService.deleteDivision(divisionId).pipe(takeUntil(this.unsubscribe$)).subscribe( res => {
            this.refreshDivisionList();
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