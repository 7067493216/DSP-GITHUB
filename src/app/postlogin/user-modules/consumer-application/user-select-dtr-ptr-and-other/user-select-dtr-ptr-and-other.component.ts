import { HttpClient } from '@angular/common/http';
import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NewApplicationService } from 'src/app/postlogin/consumer-modules/services/new-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { UserLoginService } from '../../services/user-login.service';
import { CrudType } from 'src/app/shared-enum/crudType';
import { DtrListComponent } from '../dtr-list/dtr-list.component';
import { PtrListComponent } from '../ptr-list/ptr-list.component';
import { LtListComponent } from '../lt-list/lt-list.component';
import { Lt11KvListComponent } from '../lt11-kv-list/lt11-kv-list.component';
import { HT33KvListComponent } from '../ht33-kv-list/ht33-kv-list.component';
import { Subject } from 'rxjs';
import { SaveDgmOAndName } from '../../models/save-name-dgm-om-appplicationnumber';


@Component({
  selector: 'app-user-select-dtr-ptr-and-other',
  templateUrl: './user-select-dtr-ptr-and-other.component.html',
  styleUrls: ['./user-select-dtr-ptr-and-other.component.css']
})
export class UserSelectDtrPtrAndOtherComponent implements OnInit {
  userSelectDtrPtrAndOtherFg: FormGroup;
  userApplicationUrl: string = this.url.userApplicationUrl;
  consumerApplicationDetail:any;
  consumerApplicationId: number;
  crudType: CrudType;
  modalTitle: string;
  btnTitle: string;
  dgmStcIdd;any;
  selectOmSTCFg: FormGroup;
  unsubscribe$: Subject<void> = new Subject();
   DgmOAndName :SaveDgmOAndName = new SaveDgmOAndName();
   drtListArray:any
   htListArray:any;
   itListArray:any;
   it11KvListArray:any;
   ptrListArray:any;
   abcd:boolean = false;
   kuchhBhi:boolean = false;
 
  constructor(
    private spinnerService: SpinnerService,
    private url: GenerateUrl,
    private http: HttpClient,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private newApplicationService: NewApplicationService,
    private consumerApplicationService: ConsumerApplicationService,
    private userLoginService: UserLoginService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserSelectDtrPtrAndOtherComponent>,
  ) { 
   
  }

  async ngOnInit() {
    
    
    let consumerApplicationData = await this.http.get(this.userApplicationUrl + '/get/' + this.data.consumerApplicationId).toPromise();
    console.log('consumerApplicationData', consumerApplicationData);
    if (consumerApplicationData['code'] == "200") {
        this.consumerApplicationDetail = consumerApplicationData['list'][0];
        
  }
  this.dgmStcIdd  =JSON.parse(localStorage.getItem('user')).userLoginId;
  console.log(this.dgmStcIdd,"dgm stc name");


    this.selectOmSTCFg = this.fb.group({
        cb: ['', Validators.requiredTrue],

    });

    this.DgmOAndName.consumerApplicationNumber= this.consumerApplicationDetail.consumerApplicationNumber;
    this.DgmOAndName.dgmOANDAmId= this.dgmStcIdd;

    
  }

  onClose(){
    this.dialogRef.close();
}

getDtrAllList(){
  console.log(this.data.consumerApplicationId,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  this.consumerApplicationService.GetDtrSubmitList(this.data.consumerApplicationId).subscribe((data:any)=>{
console.log(data,"llllllllllllllllllllllllllllllllllllllllllllllllllljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
this.drtListArray = data.list[0];

  })
}

getAllHtList(){
  this.consumerApplicationService.GetHt33KvSubmitList(this.data.consumerApplicationId).subscribe((data:any)=>{
    console.log(data,"dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd111@@@@@@@@@@");
    this.htListArray = data.list[0];
  })
}

getAllItList(){
  this.consumerApplicationService.GetItSubmitList(this.data.consumerApplicationId).subscribe((data:any)=>{
    console.log(data,"dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd111@@@@@@@@@@");
    this.itListArray = data.list[0];
  })
}

getAllIt11KvList(){
  this.consumerApplicationService.GetIt11KvSubmitList(this.data.consumerApplicationId).subscribe((data:any)=>{
    console.log(data,"dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd111@@@@@@@@@@");
    this.it11KvListArray = data.list[0];
  })
}

getAllPtrList(){
  this.consumerApplicationService.GetPtrSubmitList(this.data.consumerApplicationId).subscribe((data:any)=>{
    console.log(data,"dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd111@@@@@@@@@@");
    this.ptrListArray = data.list[0];
  })
}



onSubmit() {
  console.log(this.selectOmSTCFg.controls.cb);
   console.log('onsumit method of UserSelectDtrPtrAndOtherComponent');
  // if(this.selectOmSTCFg.valid){
  //   this.newApplicationService.addDGMSTC(this.selectOmSTCFg).pipe(takeUntil(this.unsubscribe$)).subscribe(
  //     data => {
  //         if (data['code'] == '201') {
  //             this.onClose();
  //             this.notificationService.success(data['message']);
  //         } else {
  //             this.notificationService.warn(data['message']);
  //         }
  //     });


      this.consumerApplicationService.saceDgmStc( this.DgmOAndName).subscribe(data=>{
                        if (data['code'] == "200") {
                            console.log('111111111111111111111111',data['list']);
                          
                           
                            this.notificationService.success(data['message']);
                        } else {
                         
                            this.notificationService.error(data['message']);
                        }
            
        },(error)=>{

        });

        if( this.drtListArray != null || this.htListArray != null || this.itListArray != null || this.it11KvListArray != null || this.ptrListArray != null  ){
          this.notificationService.error("! please select one box  and proceed first");
          return
          
       }else{
       // this.notificationService.success("Submitted successfully...................");
        this.onClose();
          
       }
}

callAllApi(){
  this.getDtrAllList();
  this.getAllHtList();
  this.getAllItList();
  this.getAllIt11KvList();
  this.getAllPtrList();
}


showDtrvalue(){
  this.callAllApi();
  console.log('me to chal gya');
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '50%';
  dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.data.consumerApplicationId };
  const dialogRef = this.dialog.open(DtrListComponent, dialogConfig);
  dialogRef.afterClosed().subscribe((result:any)=>{
    console.log(result,"reesssuullttdddtttrrrrr");
    
  })
  // dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
  //   this.refreshPaginateNewApplicationList(0, 10);
  this.onClose();

}

showPtrvalue(){
  this.callAllApi();
  console.log('me to chal gya');
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '50%';
  dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.data.consumerApplicationId };
  const dialogRef = this.dialog.open(PtrListComponent, dialogConfig);
  dialogRef.afterClosed().subscribe((result:any)=>{
    console.log(result,"reesssuullttpppttttrrrr");
    
  })
  // dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
  //   this.refreshPaginateNewApplicationList(0, 10);
  this.onClose();
}
showLtvalue(){
  this.callAllApi();

  console.log('me to chal gya');
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '50%';
  dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.data.consumerApplicationId };
  const dialogRef = this.dialog.open(LtListComponent, dialogConfig);
  dialogRef.afterClosed().subscribe((result:any)=>{
    console.log(result,"reesssuullttLLLLLLtttttttttttt");
    
  })
  this.onClose();
}

showLtv11Kvalue(){
  this.callAllApi();
  console.log('me to chal gya');
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '50%';
  dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.data.consumerApplicationId };
  const dialogRef = this.dialog.open(Lt11KvListComponent, dialogConfig);
  dialogRef.afterClosed().subscribe((result:any)=>{
    console.log(result,"reesssuullttLLLLLLLLtttttttttt11111kkkkvvvv");
    
  })
  this.onClose();
}
showHt33Kvalue(){
  this.callAllApi();
  console.log('me to chal gya');
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '50%';
  dialogConfig.data = { crudType: this.crudType, modalTitle: this.modalTitle, btnTitle: this.btnTitle, consumerApplicationId: this.data.consumerApplicationId };
  const dialogRef = this.dialog.open(HT33KvListComponent, dialogConfig);
  dialogRef.afterClosed().subscribe((result:any)=>{
    console.log(result,"reesssuullttHHHHHHHHHHHTTTT33333333kkkkkvvvvvv");
    
  })
  this.onClose();
}

}
