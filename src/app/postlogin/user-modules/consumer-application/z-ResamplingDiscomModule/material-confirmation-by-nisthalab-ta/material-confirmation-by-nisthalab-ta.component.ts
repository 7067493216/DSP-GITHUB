import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { ConsumerApplicationService } from '../../../services/consumer-application.service';

@Component({
  selector: 'app-material-confirmation-by-nisthalab-ta',
  templateUrl: './material-confirmation-by-nisthalab-ta.component.html',
  styleUrls: ['./material-confirmation-by-nisthalab-ta.component.css']
})
export class MaterialConfirmationByNisthalabTaComponent implements OnInit {
  form: FormGroup;

  // Dropdown options
  confirmations = [{ 'value': 'yes', 'name': 'Accept' }, { 'value': 'reject', 'name': 'Reject' }];
  remarks = [{ 'id': 'Pass', 'value': 'All Materials detailed Matched Successfully', 'name': 'All Materials detailed Matched Successfully' },
  { 'id': 'Fail', 'value': 'Damaged Material Found', 'name': 'Damaged Material Found' }, { 'id': 'Fail', 'value': 'Material Not Matched', 'name': 'Material Not Matched' }];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<MaterialConfirmationByNisthalabTaComponent>,
    private spinnerService: SpinnerService,
    private fb: FormBuilder,
    private consumerApplicationService: ConsumerApplicationService
  ) {
    console.log(this.data, "dddddddaaaaaaattttttttaaaaa..................");
    }


  onPassOrFail(e: any) {
    this.remarks = [{ 'id': 'Pass', 'value': 'All Materials detailed Matched Successfully', 'name': 'All Materials detailed Matched Successfully' },
    { 'id': 'Fail', 'value': 'Damaged Material Found', 'name': 'Damaged Material Found' }, { 'id': 'Fail', 'value': 'Material Not Matched', 'name': 'Material Not Matched' }];
    console.log(e, "eeee.....................");
    this.form.get('remark').setValue('');
    if (e.value == "yes") {
      this.remarks = this.remarks.filter(x => x.id == 'Pass');
    } else {
      this.remarks = this.remarks.filter(x => x.id == 'Fail');
    }
  }



  ngOnInit(): void {
    this.form = this.fb.group({
      consumerApplicationNo: [this.data?.row?.conAppNo],
      dtrAcceptOrNot: [''],
      remark: ['']
    });
  }

  onClose() {
    this.dialogRef.close();
  }



  onSubmit() {
    console.log( this.form.value,".............................");
    
    let formData: FormData = new FormData();
    formData.append("consumerApplicationNo", this.form.value.consumerApplicationNo);
    formData.append("dtrAcceptOrNot", this.form.value.dtrAcceptOrNot);
    formData.append("remark", this.form.value.remark);
    this.consumerApplicationService.NisthaLabMaterialConfirmationDuringRecieve(formData).subscribe((resp: any) => {
      console.log(resp, "resp..........................");
      if (resp?.code == "200") {
        this.notificationService.success(resp?.message);
        this.onClose();
      } else {
        this.notificationService.warn(resp?.message);
        return
      }

    })
  }



}
