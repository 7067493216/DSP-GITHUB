import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared-services/dialog.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { ManageCircleComponent } from './manage-circle/manage-circle.component';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { CrudType } from 'src/app/shared-enum/crudType';
import { ManageCircleService } from '../../services/manage-circle.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  circleId: number
  crudType: CrudType;
  modalTitle: string;
  btnTitle: string;
  listData: MatTableDataSource<ListResponse>;
  displayedColumns: string[] = [
    'position','circleRegion.region', 'circle', 'circleCode', 'edit', 'delete'];
  @ViewChild(MatPaginator,{ static: false }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: false }) sort: MatSort;
  searchKey: string;

  constructor(
    
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private manageCircleService: ManageCircleService,
    public role: RoleConstantsService
  ) { }

  ngOnInit() {
    this.refreshCircleList();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, circleId: this.circleId };
    const dialogRef = this.dialog.open(ManageCircleComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    this.refreshCircleList();
    });
    }

  
  refreshCircleList() {
    this.manageCircleService.getCircleList().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
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
    this.modalTitle = 'Add New Circle';
    this.btnTitle = 'Add New';
    this.openDialog();

  }
  onEdit(circleId) {
    this.crudType = CrudType.update;
    this.modalTitle = 'Modify Circle';
    this.btnTitle = 'Update';
    this.circleId = circleId;
    this.openDialog();
  }

  onDelete(circleId) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.manageCircleService.deleteCircle(circleId).pipe(takeUntil(this.unsubscribe$)).subscribe( res => {
            this.refreshCircleList();
            if(res['code']==='200'){
              this.notificationService.success('::' + res['message']);
            } else {
              this.notificationService.warn('::' + res['message']);
            }
          });
        }
      });
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}