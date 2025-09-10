import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { ConsumerApplicationService } from '../../services/consumer-application.service';

@Component({
  selector: 'app-contractor-pendency',
  templateUrl: './contractor-pendency.component.html',
  styleUrls: ['./contractor-pendency.component.css']
})
export class ContractorPendencyComponent implements OnInit {

  contractorId: string = '';
  pendencyList: any[] = [];
  isLoading = false;
  errorMsg = '';

  constructor(private notification: NotificationService,
    private consumerApplicationService: ConsumerApplicationService) {

    //getContractorPendency(authenticationId:any)
  }

  fetchPendency() {
    if (!this.contractorId) return;

    this.isLoading = true;
    this.errorMsg = '';
    this.pendencyList = [];

    const url = `https://dsp.mpcz.in:8888/deposit_scheme/api/consumer/qc-portal/oytContractorPendency/${this.contractorId}`;

    // this.http.get<any[]>(url).subscribe({
    //   next: (res) => {
    //     this.pendencyList = res;
    //     this.isLoading = false;
    //   },
    //   error: (err) => {
    //     this.errorMsg = 'Failed to fetch data. Please check the contractor ID.';
    //     this.isLoading = false;
    //   }
    // });

    this.consumerApplicationService.getContractorPendency(this.contractorId).subscribe((resp: any) => {
      if (resp?.code == "200") {
        this.pendencyList = resp?.list;
        this.isLoading = false;
        this.notification.success(resp?.message);
      } else {
        this.notification.warn(resp?.message);
        this.isLoading = false;
        return
      }
    })

  }


  ngOnInit(): void {

  }

}
