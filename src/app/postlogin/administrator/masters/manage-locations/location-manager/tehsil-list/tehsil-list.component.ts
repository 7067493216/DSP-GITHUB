import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { DialogService } from 'src/app/shared-services/dialog.service';
import { CreateTehsilComponent } from './create-tehsil/create-tehsil.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocationMasterService } from '../../../services/location-master.service';
import { CrudType } from 'src/app/shared-enum/crudType';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';

@Component({
  selector: 'app-tehsil-list',
  templateUrl: './tehsil-list.component.html',
  styleUrls: ['./tehsil-list.component.css']
})
export class TehsilListComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  tehsilId: number;
  crudType: CrudType;
  modalTitle: string;
  btnTitle: string;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'position', 'tehsilDistrict.districtState.state', 'tehsilDistrict.district', 'tehsil', 'edit', 'delete'];
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
    this.refreshTehsilList();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, tehsilId: this.tehsilId };
    const dialogRef = this.dialog.open(CreateTehsilComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    
    
    this.refreshTehsilList();
    });
    }

  
  refreshTehsilList() {
    this.locationMasterService.getTehsilList().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
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
    this.modalTitle = 'Add New Tehsil';
    this.btnTitle = 'Add New';
    this.openDialog();

  }
  onEdit(tehsilId) {
    this.crudType = CrudType.update;
    this.modalTitle = 'Modify Tehsil';
    this.btnTitle = 'Update';
    this.tehsilId = tehsilId;
    this.openDialog();
  }

  onDelete(tehsilId) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
        if (res) {
          this.locationMasterService.deleteTehsil(tehsilId).pipe(takeUntil(this.unsubscribe$)).subscribe( res => {
            this.refreshTehsilList();
            
          });
          this.notificationService.warn('! Deleted successfully');
        }
      });
  }
  

}