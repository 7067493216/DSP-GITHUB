import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { DialogService } from 'src/app/shared-services/dialog.service';
import { RoleCreationComponent } from '../role-creation/role-creation.component';
import { CrudType } from 'src/app/shared-enum/crudType';
import { ManageRoleService } from '../../services/manage-role.service';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { Title } from '@angular/platform-browser';
import { RoleConstantsService } from 'src/app/auth/authservices/role-constants.service';


@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {
  searchKey: string;
  roleId: number;
  crudType: CrudType;
  modalTitle: string;
  btnTitle: string;
  listData: MatTableDataSource<ListResponse>;
  displayedColumns: string[] = ['position', 'role', 'roleCode', 'viewAction', 'addAction', 'updateAction', 'removeAction', 'action'];
  @ViewChild(MatPaginator,{ static: false }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private titleService: Title,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private manageRoleService: ManageRoleService,
    public role: RoleConstantsService
  ) { }


  ngOnInit() {
    this.titleService.setTitle('Role dashboard');
    this.refreshRoleList();
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, roleId: this.roleId };
    const dialogRef = this.dialog.open(RoleCreationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    this.refreshRoleList();
    });
  }
  refreshRoleList() {
    this.manageRoleService.getRoleList().subscribe((data) => {
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
    this.modalTitle = 'Add New Role';
    this.btnTitle = 'Add New';
    this.openDialog();
  }
  onEdit(roleId) {
    this.crudType = CrudType.update;
    this.modalTitle = 'Modify Role';
    this.btnTitle = 'Update';
    this.roleId = roleId;
    this.openDialog();
  }

  onDelete(roleId) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.manageRoleService.deleteRole(roleId).subscribe(res => {
            this.refreshRoleList();
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
