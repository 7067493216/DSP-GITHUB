import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { ConsumerApplicationService } from '../../services/consumer-application.service';

@Component({
  selector: 'app-trf-upload-file',
  templateUrl: './trf-upload-file.component.html',
  styleUrls: ['./trf-upload-file.component.css']
})
export class TrfUploadFileComponent implements OnInit {

  trfForm: FormGroup;
  trfFileData: any;
  token: any;
  checkboxBoolean: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<TrfUploadFileComponent>,
    private spinnerService: SpinnerService,
    private fb: FormBuilder,
    private consumerApplicationService: ConsumerApplicationService
  ) {
    console.log(this.data.row);
    this.token = sessionStorage.getItem("usertoken");
    console.log(this.token, "tttttoooookkkkkeeeennnnnn...................");


  }

  buildForm() {
    this.trfForm = this.fb.group({
      trfFile: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.buildForm()
  }

  onClose() {
    this.dialogRef.close();
  }

  onFileSelect(e: any) {
    console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    if (e.target.files[0].size <= 2097152) {
      this.trfFileData = e.target.files[0]
    } else {
      this.notificationService.error("File maximum size should be 2MB or less than 2MB");
      this.trfForm.get("trfFile").reset();
      return
    }

  }

  onFileSubmit() {
    if (this.checkboxBoolean == false) {
      this.notificationService.warn("Please Select checkbox first !");
      return
    } else {
      if (this.trfForm.invalid) {
        this.notificationService.error("InValid Form");
        return
      } else {
        let formData: FormData = new FormData();
        formData.append('consumerApplicationNo', this.data.row.conAppNo)
        formData.append('getPassFilee', null)
        formData.append('trfFile', this.trfFileData)
        this.consumerApplicationService.trfAndGatePassUpload(formData, this.token).subscribe((resp: any) => {
          console.log(resp, "rrreeessssspppppp............");
          if (resp?.code == "200" || resp?.code == "201" || resp?.code == "204") {
            this.notificationService.success(resp?.message)
            this.onClose();
          } else {
            this.notificationService.warn(resp?.message)
            return
          }

        })
      }
    }

  }


  onCheckboxSelectionForTestingReport(e: any) {
    console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.............");
    this.checkboxBoolean = e.value;

  }



}
