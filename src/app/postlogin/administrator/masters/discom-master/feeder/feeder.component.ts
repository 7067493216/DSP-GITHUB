import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { CrudType } from 'src/app/shared-enum/crudType';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { DialogService } from 'src/app/shared-services/dialog.service';
import { ManageDivisionService } from '../../services/manage-division.service';
import { ManageFeederComponent } from './manage-feeder/manage-feeder.component';
import { takeUntil } from 'rxjs/operators';
import { ManageFeederService } from '../../services/manage-feeder.service';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';

@Component({
  selector: 'app-feeder',
  templateUrl: './feeder.component.html',
  styleUrls: ['./feeder.component.css']
})
export class FeederComponent implements OnInit {

  unsubscribe$: Subject<void> = new Subject();
  feederId: number
  crudType: CrudType;
  modalTitle: string;
  btnTitle: string;
  listData: MatTableDataSource<{}>;
  displayedColumns: string[] = [
    'position','feederSubstation.substationDistributionCenter.dcSubdivision.subdivisionDivision.divisionCircle.circleRegion.region', 'feederSubstation.substationDistributionCenter.dcSubdivision.subdivisionDivision.divisionCircle.circle','feederSubstation.substationDistributionCenter.dcSubdivision.subdivisionDivision.division', 'feederSubstation.substationDistributionCenter.dcSubdivision.subDivision', 'feederSubstation.substationDistributionCenter.dcCode','feederSubstation.subStationName','feederName','feederCode', 'edit', 'delete'];
  @ViewChild(MatPaginator,{ static: false }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: false }) sort: MatSort;
  searchKey: string;

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private manageFeederService:ManageFeederService,
    public role: RoleConstantsService
    
  ) { }

  ngOnInit() {
    this.refreshFeederList();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, feederId: this.feederId };
    const dialogRef = this.dialog.open(ManageFeederComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    this.refreshFeederList();
    });
    }

  
  refreshFeederList() {
    this.manageFeederService.getFeederList().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
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
    this.modalTitle = 'Add New Feeder';
    this.btnTitle = 'Add New';
    this.openDialog();

  }
  onEdit(feederId) {
    this.crudType = CrudType.update;
    this.modalTitle = 'Modify Feeder';
    this.btnTitle = 'Update';
    this.feederId = feederId;
    this.openDialog();
  }

  onDelete(feederId) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
        if (res) {
          this.manageFeederService.deleteFeeder(feederId).pipe(takeUntil(this.unsubscribe$)).subscribe( res => {
            this.refreshFeederList();
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
