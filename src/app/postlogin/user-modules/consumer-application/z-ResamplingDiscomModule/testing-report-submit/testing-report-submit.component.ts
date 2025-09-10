import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { ConsumerApplicationService } from '../../../services/consumer-application.service';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-testing-report-submit',
  templateUrl: './testing-report-submit.component.html',
  styleUrls: ['./testing-report-submit.component.css']
})
export class TestingReportSubmitComponent implements OnInit {

  testingReportForm: FormGroup;
  testingReportFile: any;
  checkboxSelection: boolean = false
   remarks = [{'id':'Pass', 'value': 'All Materials detailed Matched Successfully', 'name': 'All Materials detailed Matched Successfully' },
    {'id':'Fail', 'value': 'Damaged Material Found', 'name': 'Damaged Material Found' }, {'id':'Fail', 'value': 'Material Not Matched', 'name': 'Material Not Matched' }];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<TestingReportSubmitComponent>,
    private spinnerService: SpinnerService,
    private fb: FormBuilder,
    private consumerApplicationService: ConsumerApplicationService,
    private url: GenerateUrl,
    private http: HttpClient,
  ) {
    console.log(this.data.row.conAppNo, "xxxxxxxxxxxxxxxxxxxxxx");

  }

   onPassOrFail(e: any) {
    this.remarks = [{ 'id': 'Pass', 'value': 'All Materials detailed Matched Successfully', 'name': 'All Materials detailed Matched Successfully' },
    { 'id': 'Fail', 'value': 'Damaged Material Found', 'name': 'Damaged Material Found' }, { 'id': 'Fail', 'value': 'Material Not Matched', 'name': 'Material Not Matched' }];
    console.log(e, "eeee.....................");
    this.testingReportForm.get('remark').setValue('');
    if (e.value == "yes") {
      this.remarks = this.remarks.filter(x => x.id == 'Pass');
    } else {
      this.remarks = this.remarks.filter(x => x.id == 'Fail');
    }
  }

  ngOnInit(): void {
    this.testingReportForm = this.fb.group({
      reportFile: ['', Validators.required],
      finalResult: ['', Validators.required],
      remark:['',Validators.required]
    })
  }




  onFileSelect(e: any) {
    console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    if (e.target.files[0].size <= 2097152) {
      this.testingReportFile = e.target.files[0]
    } else {
      this.notificationService.error("File maximum size should be 2MB or less than 2MB");
      this.testingReportForm.get("reportFile").reset();
      return
    }
  }

  onSubmit() {

    if (this.testingReportForm.invalid) {
      this.notificationService.warn("Invalid Form");
      return
    }

    if (this.checkboxSelection == false) {
      this.notificationService.warn("Please select checkbox first !");
      return
    }

    let formData: FormData = new FormData();
    formData.append('consumerApplicationNo', this.data.row.conAppNo);
    formData.append('testingReport', this.testingReportFile);
    formData.append('dtrPassOrFail', this.testingReportForm.value.finalResult);
    formData.append('remarkDGM', this.testingReportForm.value.remark);


    this.consumerApplicationService.createDtrTestingReport(formData).subscribe((resp: any) => {
      console.log(resp, "resp.....................................................");
      if (resp?.code == "200" || resp?.code == "201" || resp?.code == "204") {
        this.notificationService.success(resp?.message);
        this.onClose();
      } else {
        this.notificationService.warn(resp?.message);
        return
      }

    })

  }

  onCheckboxSelectionForTestingReport(e: any) {
    console.log(e, "eeeeee,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
     this.checkboxSelection = e.value

  }

  onClose() {
    this.dialogRef.close();
  }

}
