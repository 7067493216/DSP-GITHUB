import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MukhyaMantriKrishakYojnaFormComponent } from "../mukhya-mantri-krishak-yojna-form/mukhya-mantri-krishak-yojna-form.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificationService } from "src/app/shared-services/notification.service";
import { GenerateUrl } from "src/environments/generate-url.model";
import { NewApplicationService } from "../services/new-application.service";
// import { samagraObjectModel } from "../models/samagra.module";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-mukhya-mantri-krishak-yojna",
  templateUrl: "./mukhya-mantri-krishak-yojna.component.html",
  styleUrls: ["./mukhya-mantri-krishak-yojna.component.css"],
})
export class MukhyaMantriKrishakYojnaComponent {
  mmkyForm: FormGroup;
  showErrorPopup: boolean = false;
  // smrgObj: samagraObjectModel = new samagraObjectModel();
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private url: GenerateUrl,
    private newApplicationService: NewApplicationService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.mmkyForm = this.fb.group({
      samgraId: ["", Validators.required],
    });
  }

  openDialog() {
    if (!this.mmkyForm.valid) {
      this.showErrorPopup = true;
      this.notificationService.error("Invalid Form !"); // return;
    } else {
      // {
      //       "memberId": "106194976"
      //   }
      //this.smrgObj.memberId = this.mmkyForm.value.samgraId;
      let abc = {
        memberId: this.mmkyForm.value.samgraId,
      };

      this.newApplicationService
        .getMukhyaMantriYojnaConsumerApplicationDetails(abc)
        .subscribe((response: any) => {
          // this.http
          //   .post<any>(
          //     "https://rooftop-uat.mpcz.in:8888/deposit_scheme/samagra/SamgraDataBySamgraId",
          //     { memberId: "106194976" },

          //   )
          //   .subscribe((response: any) => {
          //https://rooftop-uat.mpcz.in:8888/deposit_scheme/samagra/SamgraDataBySamgraId
          console.log(response, "responsessssssssssss");
          if (response.statusCodeValue == 200) {
            this.notificationService.success("data retrive successfully");
            this.mmkyForm.reset();
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = "80%";
            dialogConfig.height = "90%";
            dialogConfig.data = response.body[0];
            this.dialog.open(
              MukhyaMantriKrishakYojnaFormComponent,
              dialogConfig
            );
          } else {
            this.notificationService.error("wrong Samagra number");
            return;
          }
        }); // const dialogConfig = new MatDialogConfig; // dialogConfig.disableClose = true; // dialogConfig.autoFocus = true; // dialogConfig.width = '80%' // dialogConfig.height = '90%'; // // dialogConfig.position= {top:'3em',left:'3em'}; // this.dialog.open(MukhyaMantriKrishakYojnaFormComponent, dialogConfig);
    }
  }
}
