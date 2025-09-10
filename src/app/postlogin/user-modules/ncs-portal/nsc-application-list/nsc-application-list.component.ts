import { Component,OnInit,Inject, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ConsumerApplicationService } from "../../services/consumer-application.service";
import { NotificationService } from "src/app/shared-services/notification.service";
import { DialogService } from "src/app/shared-services/dialog.service";
import { Title } from "@angular/platform-browser";
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { RoleConstantsService } from "src/app/auth/authservices/role-constants.service";
import { HttpClient } from "@angular/common/http";
import { GenerateUrl } from "src/environments/generate-url.model";
import { MatSort } from "@angular/material/sort";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CrudType } from "src/app/shared-enum/crudType";
import { WorkOrderComponent } from "../../consumer-application/work-order/work-order.component";
import { NscChooseDepositAndSupervisionComponent } from "../nsc-choose-deposit-and-supervision/nsc-choose-deposit-and-supervision.component";



@Component({
    selector:'nsc-application-list',
    templateUrl:'nsc-application-list.component.html',
    styles:['nsc-application-list.component.css'],
})

export class NscApplicationListComponent implements OnInit {
    displayedColumns: string[] = ['position',  'ApplicantName', 'NSCApplicationNo','dateOfPostDeposit','edit'];

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    nscApplicationListData: MatTableDataSource<any>;
    userId:any;
    userContextPath:string = this.url.userContextPath;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    tableMeta: any = {};
    unsubscribe$: Subject<void> = new Subject();
    modalTitle: string;
    btnTitle: string;
    nscId:string;
    crudType: CrudType;

    constructor(
        private newApplicationService: ConsumerApplicationService,
        // public role: RoleConstantsService,
        private notification: NotificationService,
        private dialogService: DialogService,
        private titleService: Title,
        private dialog: MatDialog,
        public role: RoleConstantsService,
        private http: HttpClient,
        private url: GenerateUrl,
    
        
      ) { }
      async ngOnInit() {

        console.log("NscApplicationListComponent ka ngOnIt method");

        let value:any =  localStorage.getItem('user');
        console.log(value);
        console.log( !JSON.parse(localStorage.getItem('user')).userLoginId);

        this.userId=   JSON.parse(localStorage.getItem('user')).userLoginId

        let nscApplicationList = await this.http.get(this.userContextPath + '/nsc-data/nsc/' + this.userId).toPromise();
        console.log('applicationDocumentData', nscApplicationList);
        if (nscApplicationList['code'] == "200") {
            this.nscApplicationListData = nscApplicationList['list'][0];
            console.log('applicationDocumentData:>-  !!!', this.nscApplicationListData);
        }
        
    
      }

      oldSize = 0;
      onPaginateChange(event: PageEvent) {
        const size = event.pageSize;
        var page = event.pageIndex;
        if (this.oldSize == 0) {
          this.oldSize = event.pageSize;
        }
        if (this.oldSize != size) {
          this.paginator.pageIndex = 0;
          page = 0;
          this.oldSize = 0;
        }
        this.refreshPaginateNewApplicationList(page, size);
      }

      refreshPaginateNewApplicationList(page, size) {
         // this.nscApplicationListData = new MatTableDataSource();
        let param = '';
    
        param = 'page=' + page + '&' + 'size=' + size;
    
        this.newApplicationService.getAllNewApplicationPaginate(param).pipe(takeUntil(this.unsubscribe$))
          .subscribe(data => {
            if (data['code'] == '200') {
              if (data['list'] != null) {
                 this.nscApplicationListData = new MatTableDataSource(data['list'][0]['list']);
                console.log( this.nscApplicationListData,"gdfdffdyfgygdys***************************");
                
                this.tableMeta = data['list'][0]['meta'];
                 this.nscApplicationListData.sort = this.sort;
              }
            } else {
              this.tableMeta = null;
              this.notification.warn(data['message']);
            }
          },
            error => {
              this.tableMeta = { currentPage: 0, totalItems: 0, totalPages: 0 }
            });
      }
  
      DepositAndSupervision(nscId:any){
        console.log(nscId,'***********************************')

        this.modalTitle = 'Deposit and supervision';
        this.btnTitle = 'Deposit and supervision';
        this.nscId=nscId;
    
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '90%';
        dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, nscId: this.nscId };
        const dialogRef = this.dialog.open(NscChooseDepositAndSupervisionComponent, dialogConfig);
        dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
          this.refreshPaginateNewApplicationList(0, 10);
        });
    
      }

    
      
    }