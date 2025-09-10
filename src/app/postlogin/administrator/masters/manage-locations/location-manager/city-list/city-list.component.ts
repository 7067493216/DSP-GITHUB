import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { DialogService } from 'src/app/shared-services/dialog.service';
import { CreateCityComponent } from './create-city/create-city.component';
import { Subject } from 'rxjs';
import { CrudType } from 'src/app/shared-enum/crudType';
import { LocationMasterService } from '../../../services/location-master.service';
import { takeUntil } from 'rxjs/operators';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  cityId: number;
  crudType: CrudType;
  modalTitle: string;
   btnTitle: string;
   listData: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'position','cityTehsil.tehsilDistrict.districtState.state', 'cityTehsil.tehsilDistrict.district', 'cityTehsil.tehsil', 'city','edit', 'delete'];
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
    this.refreshCityList();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, cityId: this.cityId };
    const dialogRef = this.dialog.open(CreateCityComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    
    
    this.refreshCityList();
    });
    }

  
  refreshCityList() {
    this.locationMasterService.getCityList().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      if(data['code']==='200') {
        const list: any = data['list'];
        this.listData = new MatTableDataSource(list);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      } else{
        this.notificationService.warn(data['message']);
      }
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
    this.modalTitle = 'Add New City';
    this.btnTitle = 'Add New';
    this.openDialog();

  }
  onEdit(cityId) {
    
    
    this.crudType = CrudType.update;
    this.modalTitle = 'Modify City';
    this.btnTitle = 'Update';
    this.cityId = cityId;
    this.openDialog();
  }

  onDelete(cityId) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
        if (res) {
          this.locationMasterService.deleteCity(cityId).pipe(takeUntil(this.unsubscribe$)).subscribe( res => {
            this.refreshCityList();
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