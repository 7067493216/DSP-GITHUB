import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { DialogService } from 'src/app/shared-services/dialog.service';
import { Subject } from 'rxjs';
import { CrudType } from 'src/app/shared-enum/crudType';
import { ManageDesignationService } from '../../services/manage-designation.service';
import { takeUntil } from 'rxjs/operators';
import { DesignationCreationComponent } from '../designation-creation/designation-creation.component';
import { Title } from '@angular/platform-browser';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';

@Component({
  selector: 'app-designation-list',
  templateUrl: './designation-list.component.html',
  styleUrls: ['./designation-list.component.css']
})
export class DesignationListComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  designationId: number;
  crudType: CrudType;
  modalTitle: string;
  btnTitle: string;
  listData: MatTableDataSource<{}>;
  displayedColumns: string[] = ['position', 'designation', 'designationShortForm', 'action'];
  @ViewChild(MatPaginator,{ static: false }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: false }) sort: MatSort;
  searchKey: string;

  constructor(
    private dialog: MatDialog,
    private titleService: Title,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private designationService: ManageDesignationService,
    public role: RoleConstantsService
  ) {

  }

  ngOnInit() {
    this.titleService.setTitle('Designation master');
    this.refreshRegionList();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      crudType: this.crudType, modalTitle: this.modalTitle,
      btnTitle: this.btnTitle, designationId: this.designationId
    };
    const dialogRef = this.dialog.open(DesignationCreationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // console.log('Dialog was closed')
      // console.log(result)
      this.refreshRegionList();
    });
  }

  // get table data form HttpClint
  refreshRegionList() {
    this.designationService.getDesignationList().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      const list: any = data['list'];
      this.listData = new MatTableDataSource(list);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      // console.log(list);
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
    this.modalTitle = 'Add New Designation';
    this.btnTitle = 'Add New';
    this.openDialog();

  }
  onEdit(designationId) {
    this.crudType = CrudType.update;
    this.modalTitle = 'Modify Designation';
    this.btnTitle = 'Update';
    this.designationId = designationId;
    this.openDialog();
  }

  onDelete(designationId) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
        if (res) {
          this.designationService.deleteDesignation(designationId).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
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
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
