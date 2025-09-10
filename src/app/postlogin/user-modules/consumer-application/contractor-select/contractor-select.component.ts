import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NewApplicationService } from 'src/app/postlogin/consumer-modules/services/new-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { ConsumerApplicationService } from '../../services/consumer-application.service';

@Component({
    selector: 'app-contractor-select',
    templateUrl: './contractor-select.component.html',
    styleUrls: ['./contractor-select.component.css']
})
export class ContractorSelectComponent implements OnInit {
    consumerApplicationUrl: string = this.url.consumerApplicationUrl;
    userSurveyUrl: string = this.url.userSurveyUrl;
    contractor: string = this.url.contractor;
    user: string = this.url.userContextPath;
    consumerApplicationDetail;
    contractorList: any;
    newContractorCreationFg: FormGroup;
    dataTable: any
    isFormSubmit: boolean = false;
    bidAmountShow: any;
    unsubscribe$: Subject<void> = new Subject();
    userId: any;
    consumerApplicationIdQcportal: any;
    filteredDataToSearch: any;
    finalFilterSerch: any[] = [];
    SelectedContractorDetails: any;
    userDetails:any;
    currentRoleOfUser:any;
    contractorIdForDgmOandM:any;


    constructor(
        private spinnerService: SpinnerService,
        private url: GenerateUrl,
        private http: HttpClient,
        private newApplicationService: NewApplicationService,
        private notificationService: NotificationService,
        private fb: FormBuilder,
        private consumerApplicationService:ConsumerApplicationService,

        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ContractorSelectComponent>,
    ) {
        this.userDetails = JSON.parse(sessionStorage.getItem('accessLeveOfUser'));
        this.currentRoleOfUser = JSON.parse(sessionStorage.getItem('currentRoleOfUser'));
     }

    onClose() {
        this.dialogRef.close();
    }

    lookup(e: any) {
        console.log(e, "eee....eeeee.................");
        let q = this.newContractorCreationFg.value.inputSearch;
        console.log(q, "qqqqqqqqqqqqqqqqqqqq.............");

        // (i.authorisedPersonE + " - " + i.bigAmount + "(" + i.companyAdd1 + ")")   
        this.finalFilterSerch = this.filteredDataToSearch
            .filter(
                i =>
                    (i.text)
                        .toString()
                        .toLowerCase()
                        .indexOf(e) > -1
            )
            .map(w => {
                return {
                    // text: w.authorisedPersonE + " - " + w.bigAmount + "(" + w.companyAdd1 + ")",
                    // value: w.userId

                    text: w.text,
                    value: w.value
                };
            });

        console.log(this.finalFilterSerch, "filter.....list...//////");

    }

    clean(event: any) {
        event.value = '';
        this.lookup(event.value);
    }

    // localhost:8083/deposit_schemeee/api/consumer/qc-portal/getQcConsumerbid

    async ngOnInit() {



        this.newContractorCreationFg = this.fb.group({
            userId: ['', Validators.compose([Validators.required])],
            BidAmount: [''],
            category: [''],
            registrationNumber: [''],
            consumers: ['', Validators.compose([Validators.required])],
            consumerApplicationId: ['', Validators.compose([Validators.required])],
            inputSearch: ['']




        });


        let cousumerApplicationNO = this.data.consumerApplicationNo;
        console.log(cousumerApplicationNO);
        this.http.get(this.contractor + '/getQcConsumerbid/' + cousumerApplicationNO).subscribe((data: any) => {
            console.log(data);
            if (data['code'] == "200") {
                this.contractorList = data['list'][0].listOfParticipantedAndNotParticipated;
                console.log(this.contractorList, "contractorList..........contractorList");

                this.filteredDataToSearch = this.contractorList.map(w => {
                    return {
                        text: w.companyNameE + " , " + w.authorisedPersonE + " , (" + w.authenticationId + ")" ,
                        value: w.userId
                    };
                });

                if (this.filteredDataToSearch != undefined || this.filteredDataToSearch != null) {
                    this.finalFilterSerch = this.filteredDataToSearch.map(w => {
                        return {
                            text: w.text,
                            value: w.value
                        };
                    });
                }

                console.log(this.filteredDataToSearch, "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrffffffffggggggg");

            }
        });








    }
    onChangeSelectedAmount(userId: any) {
        console.log(userId.value, 'UserID');
        this.contractorIdForDgmOandM = userId.value;
        //sabir code start here
        this.SelectedContractorDetails = userId.value;
        //sabir code end  here
        for (let contractor of this.contractorList) {


            if (contractor.userId == userId.value) {
                let amountRs: number = 0;
                if (contractor.bigAmount == null) {
                    let amountRsString: string = "null";
                    this.newContractorCreationFg.controls['userId'].setValue(contractor.userId)
                    this.newContractorCreationFg.controls['BidAmount'].setValue(amountRsString);
                    this.newContractorCreationFg.controls['category'].setValue(contractor.oyt);
                    this.newContractorCreationFg.controls['registrationNumber'].setValue(contractor.authenticationId);
                    this.newContractorCreationFg.controls['consumers'].setValue(contractor.consumerId)
                    this.newContractorCreationFg.controls['consumerApplicationId'].setValue(this.data.consumerApplicationId);
                    this.newContractorCreationFg.controls['contractorAuthenticationId'].setValue(contractor.authenticationId)

                } else {
                    this.bidAmountShow = contractor.bigAmount;
                    this.newContractorCreationFg.controls['userId'].setValue(contractor.userId)
                    this.newContractorCreationFg.controls['BidAmount'].setValue(contractor.bigAmount);
                    this.newContractorCreationFg.controls['category'].setValue(contractor.contractorCategory);
                    this.newContractorCreationFg.controls['registrationNumber'].setValue(contractor.authenticationId);
                    this.newContractorCreationFg.controls['consumers'].setValue(contractor.consumerId)
                    this.newContractorCreationFg.controls['consumerApplicationId'].setValue(this.data.consumerApplicationId);
                    this.newContractorCreationFg.controls['contractorAuthenticationId'].setValue(contractor.authenticationId)
                }

            } else {
                this.bidAmountShow = contractor.bigAmount;
            }

        }
        this.newContractorCreationFg.get('registrationNumber').disable();
        this.newContractorCreationFg.controls["registrationNumber"].disable();
        this.newContractorCreationFg.get('category').disable();
        this.newContractorCreationFg.get('BidAmount').disable();
    }


    onSubmit() {


        console.log(this.newContractorCreationFg, "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz(((((((((((((((((((((((");

        this.isFormSubmit = true;


        this.consumerApplicationService.addContractor(this.newContractorCreationFg.value).pipe(takeUntil(this.unsubscribe$)).subscribe(
            (response:any) => {
                if (response['code'] == '201') {
                    console.log(response,"ddddddddddddddddddd....................");
                
                    
                    if (this.currentRoleOfUser.roleCode=='DGM') {
                     this.consumerApplicationService.contractorSelectionatDgmend(this.data.consumerApplicationNo,this.userDetails.userId+'-'+this.userDetails.userName,this.currentRoleOfUser.roleCode,this.contractorIdForDgmOandM).subscribe((resp:any)=>{
                        console.log(resp,"resp.............................");
                        if(resp?.code=="204"){
                            this.notificationService.success(resp?.message)
                        }else{
                            this.notificationService.warn(resp?.message);
                            return
                        }
                     })
                    }

                    this.notificationService.success(response['message']);
                    this.onClose();
                    // setTimeout(() => {
                    //     location.reload();
                    // }, 1000);

                } else if (response['code'] == '406' && response['message'] == "Consumer can not select contractor application because there is alot pendency on contractor.") {
                    this.notificationService.warn("ठेकेदार के कार्यों की अनुमति से संबंधित कार्य पूर्णता हेतु 10 से अधिक प्रकरण लंबित हैं। अतः उन्हें नवीन कार्य हेतु चयनित नहीं किया जा सकता।");
                    return;
                }
                else {
                    this.notificationService.warn(response['message']);
                    return
                }
            });


    }

}
