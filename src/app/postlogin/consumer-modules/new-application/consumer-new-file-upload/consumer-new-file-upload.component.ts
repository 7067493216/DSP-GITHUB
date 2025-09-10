import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenerateUrl } from 'src/environments/generate-url.model';
import { PdfService } from '../pdf.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { NewApplicationService } from '../../services/new-application.service';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { DialogService } from 'src/app/shared-services/dialog.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-consumer-new-file-upload',
  templateUrl: './consumer-new-file-upload.component.html',
  styleUrls: ['./consumer-new-file-upload.component.css']
})
export class ConsumerNewFileUploadComponent implements OnInit {
  consumerApplicationDetail: any;
  applicationDocumentData: any;
  docDropdownArray: any;
  chalGayaBoolean: boolean = false;
  // reUploadForm:FormGroup

  docRegistry: any;
  docT$cpPermission: any;
  docReraPermission: any;
  docKhasraKhatoni: any;
  docAdministrative: any;
  docGst: any;
  energyBillDoc: any;
  docSamagraFile: any;
  docNoc: any
  docIndividualOrGroup: any
  docMap: any
  docLoadSheet: any
  ///////


  oldDocRegistryId: any
  oldDocTcpPermissionId: any
  oldDocReraPermissionId: any
  oldDocKhasraKhatoniId: any
  oldDocAdministrativeId: any
  oldDocGstId: any
  oldDocEnergyBillId: any
  oldDocSamagraFileId: any
  oldDocNocId: any
  oldDocIndividualOrGroupFileId: any
  olddocLoadSheetId: any
  olddocMapId: any

  ///////
  docRegistryBoleanForRequired: boolean = false
  docT$cpPermissionBooleanForRequired: boolean = false;
  docReraPermissionBooleanForRequired: boolean = false;
  docKhasraKhatoniBooleanForRequired: boolean = false;
  docAdministrativeBooleanForRequired: boolean = false;
  docGstBooleanForRequired: boolean = false;
  energyBillDocBooleanForRequired: boolean = false;
  docSamagraFileBooleanForRequired: boolean = false;
  docNocBooleanForRequired: boolean = false
  docIndividualOrGroupBooleanForRequired: boolean = false
  docMapBooleanForRequired: boolean = false;
  docLoadSheetBooleanForRequired: boolean = false;

  ///////
  docRegistryBoleanForSize: boolean = false
  docT$cpPermissionBooleanForSize: boolean = false;
  docReraPermissionBooleanForSize: boolean = false;
  docKhasraKhatoniBooleanForSize: boolean = false;
  docAdministrativeBooleanForSize: boolean = false;
  docGstBooleanForSize: boolean = false;
  energyBillDocBooleanForSize: boolean = false;
  docSamagraFileBooleanForSize: boolean = false;
  docNocBooleanForSize: boolean = false
  docIndividualOrGroupBooleanForSize: boolean = false
  docMapBooleanForSize: boolean = false;
  docLoadSheetBooleanForSize: boolean = false
  token: any



  constructor(
    private url: GenerateUrl,
    private http: HttpClient,
    private fb: FormBuilder,
    private pdfService: PdfService,
    private spinnerService: SpinnerService,
    private newApplicationService: NewApplicationService,
    // public role: RoleConstantsService,
    private notification: NotificationService,
    private dialogService: DialogService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConsumerNewFileUploadComponent>,
  ) {
    this.consumerApplicationDetail = this.data.row;
    let consumertoken = sessionStorage.getItem('consumertoken');
    this.token = consumertoken;
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getApplicationDocumentData();
  }

  fileUploadChange(e: any, oldObject: any) {
    console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee...............................................", oldObject);
    if (oldObject?.documentType.documentTypeId == 19) {
      this.docT$cpPermission = e.target.files[0];
      this.oldDocTcpPermissionId = oldObject?.uploadId
      this.docT$cpPermissionBooleanForRequired = false;
      if (e.target.files[0].size <= 2097152) {
        this.docT$cpPermissionBooleanForSize = false
      } else {
        this.docT$cpPermissionBooleanForSize = true
      }

    }
    else if (oldObject?.documentType.documentTypeId == 38) {
      this.docIndividualOrGroup = e.target.files[0];
      this.oldDocIndividualOrGroupFileId = oldObject?.uploadId;
      this.docIndividualOrGroupBooleanForRequired = false
      if (e.target.files[0].size <= 2097152) {
        this.docIndividualOrGroupBooleanForSize = false
      } else {
        this.docIndividualOrGroupBooleanForSize = true
      }
      // 38    Guoup file
    }
    else if (oldObject?.documentType.documentTypeId == 20) {
      this.docReraPermission = e.target.files[0];
      this.oldDocReraPermissionId = oldObject?.uploadId
      this.docReraPermissionBooleanForRequired = false;
      if (e.target.files[0].size <= 2097152) {
        this.docReraPermissionBooleanForSize = false
      } else {
        this.docReraPermissionBooleanForSize = true
      }
      // 20    RERA Permission
    }
    else if (oldObject?.documentType.documentTypeId == 14) {

      this.docRegistry = e.target.files[0];
      this.oldDocRegistryId = oldObject?.uploadId
      this.docRegistryBoleanForRequired = false
      if (e.target.files[0].size <= 2097152) {
        this.docRegistryBoleanForSize = false
      } else {
        this.docRegistryBoleanForSize = true
      }
      // 14    Registry
    }
    else if (oldObject?.documentType.documentTypeId == 32) {
      this.docKhasraKhatoni = e.target.files[0];
      this.oldDocKhasraKhatoniId = oldObject?.uploadId
      this.docKhasraKhatoniBooleanForRequired = false
      if (e.target.files[0].size <= 2097152) {
        this.docKhasraKhatoniBooleanForSize = false
      } else {
        this.docKhasraKhatoniBooleanForSize = true
      }
      // 32    Khasra-Khatoni
    }
    else if (oldObject?.documentType.documentTypeId == 40) {
      this.docGst = e.target.files[0];
      this.oldDocGstId = oldObject?.uploadId
      this.docGstBooleanForRequired = false
      if (e.target.files[0].size <= 2097152) {
        this.docGstBooleanForSize = false
      } else {
        this.docGstBooleanForSize = true
      }
      // 40    GST
    }
    else if (oldObject?.documentType.documentTypeId == 39) {
      this.docAdministrative = e.target.files[0];
      this.oldDocAdministrativeId = oldObject?.uploadId
      this.docAdministrativeBooleanForRequired = false
      if (e.target.files[0].size <= 2097152) {
        this.docAdministrativeBooleanForSize = false
      } else {
        this.docAdministrativeBooleanForSize = true
      }
      // 39    Administrative
    }
    else if (oldObject?.documentType.documentTypeId == 42) {
      this.energyBillDoc = e.target.files[0];
      this.oldDocEnergyBillId = oldObject?.uploadId
      this.energyBillDocBooleanForRequired = false;
      if (e.target.files[0].size <= 2097152) { // 405855
        this.energyBillDocBooleanForSize = false
      } else {
        this.energyBillDocBooleanForSize = true
      }
      // 3    Energy bills 
    }
    else if (oldObject?.documentType.documentTypeId == 26) {
      this.docNoc = e.target.files[0];
      this.oldDocNocId = oldObject?.uploadId
      this.docNocBooleanForRequired = false
      if (e.target.files[0].size <= 2097152) {
        this.docNocBooleanForSize = false
      } else {
        this.docNocBooleanForSize = true
      }
      // 26    NOC
    }
    else if (oldObject?.documentType.documentTypeId == 43) {
      this.docSamagraFile = e.target.files[0];
      this.oldDocSamagraFileId = oldObject?.uploadId
      this.docSamagraFileBooleanForRequired = false
      if (e.target.files[0].size <= 2097152) {
        this.docSamagraFileBooleanForSize = false
      } else {
        this.docSamagraFileBooleanForSize = true
      }
      // 43    SAMAGRA_FILE
    } else if (oldObject?.documentType.documentTypeId == 31) {
      this.docMap = e.target.files[0];
      this.olddocMapId = oldObject?.uploadId
      this.docMapBooleanForRequired = false
      if (e.target.files[0].size <= 2097152) {
        this.docMapBooleanForSize = false
      } else {
        this.docMapBooleanForSize = true
      }
     //31 Approve Map
    } else if (oldObject?.documentType.documentTypeId == 25) {
      this.docLoadSheet = e.target.files[0];
      this.olddocLoadSheetId = oldObject?.uploadId
      this.docLoadSheetBooleanForRequired = false
      if (e.target.files[0].size <= 2097152) {
        this.docLoadSheetBooleanForSize = false
      } else {
        this.docLoadSheetBooleanForSize = true
      }
      // 25 Load sheet Document
    }
    else {

    }

  }


  getApplicationDocumentData() {
    this.newApplicationService.getApplicationDocumentData(this.consumerApplicationDetail.consumerApplicationId).subscribe((applicationDocumentData: any) => {
      console.log(applicationDocumentData, "applicationDocumentData...................................");
      if (applicationDocumentData['code'] == "200") {
        this.applicationDocumentData = applicationDocumentData['list'][0];

        if (this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId == 1) {
          if (this.applicationDocumentData?.docGst != null) {
            this.docDropdownArray = [
              {
                "name": "Gst File",
                "value": this.applicationDocumentData?.docGst
              }
            ]
            if (this.applicationDocumentData?.docGst.documentStatus == 3) {
              this.docGstBooleanForRequired = true;
              this.docGstBooleanForSize = true;
            } else {
              this.docGstBooleanForRequired = false;
              this.docGstBooleanForSize = false;
            }
            console.log(this.docDropdownArray, " this.docDropdownArray....");
          } else {
            this.docDropdownArray = [];
            console.log(this.docDropdownArray, " this.docDropdownArray....");
          }

        } else if (this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId == 2) {
          if (this.applicationDocumentData?.docGst != null) {
            this.docDropdownArray = [
              {
                "name": "Gst File",
                "value": this.applicationDocumentData?.docGst
              }
            ]
            if (this.applicationDocumentData?.docGst.documentStatus == 3) {
              this.docGstBooleanForRequired = true;
              this.docGstBooleanForSize = true;
            } else {
              this.docGstBooleanForRequired = false;
              this.docGstBooleanForSize = false;
            }
            console.log(this.docDropdownArray, " this.docDropdownArray....");
          } else {
            this.docDropdownArray = [];
            console.log(this.docDropdownArray, " this.docDropdownArray....");
          }

        } else if (this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId == 3) {
          if (this.applicationDocumentData?.docGst != null) {
            this.docDropdownArray = [
              {
                "name": "T&CP PERMISSION FILE",
                "value": this.applicationDocumentData?.docT$cpPermission
              },
              {
                "name": "RERA PERMISSION FILE",
                "value": this.applicationDocumentData?.docReraPermission
              },
              {
                "name": "Gst File",
                "value": this.applicationDocumentData?.docGst
              }
            ]
            /////////////////
            if (this.applicationDocumentData?.docGst.documentStatus == 3) {
              this.docGstBooleanForRequired = true;
              this.docGstBooleanForSize = true;
            } else {
              this.docGstBooleanForRequired = false;
              this.docGstBooleanForSize = false;
            }
            ////////////
            if (this.applicationDocumentData?.docT$cpPermission.documentStatus == 3) {
              this.docT$cpPermissionBooleanForRequired = true;
              this.docT$cpPermissionBooleanForSize = true
            } else {
              this.docT$cpPermissionBooleanForRequired = false;
              this.docT$cpPermissionBooleanForSize = false
            }
            ///////////////
            if (this.applicationDocumentData?.docReraPermission.documentStatus == 3) {
              this.docReraPermissionBooleanForRequired = true;
              this.docReraPermissionBooleanForSize = true
            } else {
              this.docReraPermissionBooleanForRequired = false;
              this.docReraPermissionBooleanForSize = false
            }

            console.log(this.docDropdownArray, " this.docDropdownArray....");
          } else {
            this.docDropdownArray = [
              {
                "name": "T&CP PERMISSION FILE",
                "value": this.applicationDocumentData?.docT$cpPermission
              },
              {
                "name": "RERA PERMISSION FILE",
                "value": this.applicationDocumentData?.docReraPermission
              }
            ];

            ////////////
            if (this.applicationDocumentData?.docT$cpPermission.documentStatus == 3) {
              this.docT$cpPermissionBooleanForRequired = true;
              this.docT$cpPermissionBooleanForSize = true
            } else {
              this.docT$cpPermissionBooleanForRequired = false;
              this.docT$cpPermissionBooleanForSize = false
            }
            ///////////////
            if (this.applicationDocumentData?.docReraPermission.documentStatus == 3) {
              this.docReraPermissionBooleanForRequired = true;
              this.docReraPermissionBooleanForSize = true
            } else {
              this.docReraPermissionBooleanForRequired = false;
              this.docReraPermissionBooleanForSize = false
            }
            console.log(this.docDropdownArray, " this.docDropdownArray....");
          }

        } else if (this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId == 4) {
          if (this.applicationDocumentData?.docGst != null) {
            if (this.applicationDocumentData?.docGroup != null) {
              this.docDropdownArray = [
                {
                  "name": "Registery File",
                  "value": this.applicationDocumentData?.docRegistry
                },
                {
                  "name": "NOC File",
                  "value": this.applicationDocumentData?.docNoc
                },
                {
                  "name": "Group Permission File",
                  "value": this.applicationDocumentData?.docGroup
                },
                {
                  "name": "Gst File",
                  "value": this.applicationDocumentData?.docGst
                }
              ]

              console.log(this.docDropdownArray, " this.docDropdownArray....");

            } else {
              this.docDropdownArray = [
                {
                  "name": "Registery File",
                  "value": this.applicationDocumentData?.docRegistry
                },
                {
                  "name": "NOC File",
                  "value": this.applicationDocumentData?.docNoc
                },
                {
                  "name": "GstFile",
                  "value": this.applicationDocumentData?.docGst
                }
              ]
              console.log(this.docDropdownArray, " this.docDropdownArray....");
            }
            /////////////////
            if (this.applicationDocumentData?.docGst.documentStatus == 3) {
              this.docGstBooleanForRequired = true;
              this.docGstBooleanForSize = true;
            } else {
              this.docGstBooleanForRequired = false;
              this.docGstBooleanForSize = false;
            }
            /////////////////
            if (this.applicationDocumentData?.docRegistry.documentStatus == 3) {
              this.docRegistryBoleanForSize = true
              this.docRegistryBoleanForRequired = true
            } else {
              this.docRegistryBoleanForSize = false
              this.docRegistryBoleanForRequired = false
            }
            //////////////////
            if (this.applicationDocumentData?.docNoc.documentStatus == 3) {
              this.docNocBooleanForSize = true
              this.docNocBooleanForRequired = true
            } else {
              this.docNocBooleanForSize = false
              this.docNocBooleanForRequired = false
            }

            //////////////////
            if (this.applicationDocumentData?.docGroup.documentStatus == 3) {
              this.docIndividualOrGroupBooleanForSize = true
              this.docIndividualOrGroupBooleanForRequired = true
            } else {
              this.docIndividualOrGroupBooleanForSize = false
              this.docIndividualOrGroupBooleanForRequired = false
            }



            // this.docRegistryBoleanForSize = true
            // this.docRegistryBoleanForRequired = true


            // this.docNocBooleanForSize = true
            // this.docNocBooleanForRequired = true

          } else {
            if (this.applicationDocumentData?.docGroup != null) {
              this.docDropdownArray = [
                {
                  "name": "Registery File",
                  "value": this.applicationDocumentData?.docRegistry
                },
                {
                  "name": "NOC File",
                  "value": this.applicationDocumentData?.docNoc
                },
                {
                  "name": "Group Permission File",
                  "value": this.applicationDocumentData?.docGroup
                }
              ];
              console.log(this.docDropdownArray, " this.docDropdownArray....");
            } else {
              this.docDropdownArray = [
                {
                  "name": "Registery File",
                  "value": this.applicationDocumentData?.docRegistry
                },
                {
                  "name": "NOC File",
                  "value": this.applicationDocumentData?.docNoc
                }
              ];
              console.log(this.docDropdownArray, " this.docDropdownArray....");
            }

            /////////////////
            if (this.applicationDocumentData?.docRegistry.documentStatus == 3) {
              this.docRegistryBoleanForSize = true
              this.docRegistryBoleanForRequired = true
            } else {
              this.docRegistryBoleanForSize = false
              this.docRegistryBoleanForRequired = false
            }
            //////////////////
            if (this.applicationDocumentData?.docNoc.documentStatus == 3) {
              this.docNocBooleanForRequired = true
              this.docNocBooleanForSize = true
            } else {
              this.docNocBooleanForRequired = false
              this.docNocBooleanForSize = false
            }
            ////////////////////
            if (this.applicationDocumentData?.docGroup.documentStatus == 3) {
              this.docIndividualOrGroupBooleanForSize = true
              this.docIndividualOrGroupBooleanForRequired = true
            } else {
              this.docIndividualOrGroupBooleanForSize = false
              this.docIndividualOrGroupBooleanForRequired = false
            }


          }

        } else if (this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId == 5) {
          if (this.applicationDocumentData?.docGst != null) {
            this.docDropdownArray = [
              {
                "name": "KHASRA KHATONI FILE",
                "value": this.applicationDocumentData?.docKhasraKhatoni
              },
              {
                "name": "Gst File",
                "value": this.applicationDocumentData?.docGst
              }
            ]
            /////////////////
            if (this.applicationDocumentData?.docGst.documentStatus == 3) {
              this.docGstBooleanForRequired = true;
              this.docGstBooleanForSize = true;
            } else {
              this.docGstBooleanForRequired = false;
              this.docGstBooleanForSize = false;
            }
            ////////////////////
            if (this.applicationDocumentData?.docKhasraKhatoni.documentStatus == 3) {
              this.docKhasraKhatoniBooleanForRequired = true;
              this.docKhasraKhatoniBooleanForSize = true
            } else {
              this.docKhasraKhatoniBooleanForRequired = false;
              this.docKhasraKhatoniBooleanForSize = false
            }
            console.log(this.docDropdownArray, " this.docDropdownArray....");
          } else {
            this.docDropdownArray = [
              {
                "name": "KHASRA KHATONI FILE",
                "value": this.applicationDocumentData?.docKhasraKhatoni
              }
            ];
            ////////////////////
            if (this.applicationDocumentData?.docKhasraKhatoni.documentStatus == 3) {
              this.docKhasraKhatoniBooleanForRequired = true;
              this.docKhasraKhatoniBooleanForSize = true
            } else {
              this.docKhasraKhatoniBooleanForRequired = false;
              this.docKhasraKhatoniBooleanForSize = false
            }
            console.log(this.docDropdownArray, " this.docDropdownArray....");
          }

        } else if (this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId == 6) {
          if (this.applicationDocumentData?.docGst != null) {
            this.docDropdownArray = [
              {
                "name": "Administrative Section Along with Order",
                "value": this.applicationDocumentData?.docAdministrative
              },
              {
                "name": "GstFile",
                "value": this.applicationDocumentData?.docGst
              }
            ]
            /////////////////
            if (this.applicationDocumentData?.docGst.documentStatus == 3) {
              this.docGstBooleanForRequired = true;
              this.docGstBooleanForSize = true;
            } else {
              this.docGstBooleanForRequired = false;
              this.docGstBooleanForSize = false;
            }
            ////////////////  
            if (this.applicationDocumentData?.docAdministrative.documentStatus == 3) {
              this.docAdministrativeBooleanForRequired = true;
              this.docAdministrativeBooleanForSize = true;
            } else {
              this.docAdministrativeBooleanForRequired = false;
              this.docAdministrativeBooleanForSize = false;
            }
            console.log(this.docDropdownArray, " this.docDropdownArray....");
          } else {
            this.docDropdownArray = [
              {
                "name": "Administrative Section Along with Order",
                "value": this.applicationDocumentData?.docAdministrative
              }
            ];
            ////////////////  
            if (this.applicationDocumentData?.docAdministrative.documentStatus == 3) {
              this.docAdministrativeBooleanForRequired = true;
              this.docAdministrativeBooleanForSize = true;
            } else {
              this.docAdministrativeBooleanForRequired = false;
              this.docAdministrativeBooleanForSize = false;
            }
            console.log(this.docDropdownArray, " this.docDropdownArray....");
          }

        } else if (this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId == 7) {
          if (this.applicationDocumentData?.docGst != null) {
            this.docDropdownArray = [
              {
                "name": "Energy Bill File",
                "value": this.applicationDocumentData?.docEnergyBillFile
              },
              {
                "name": "GstFile",
                "value": this.applicationDocumentData?.docGst
              }
            ];
            /////////////////
            if (this.applicationDocumentData?.docGst.documentStatus == 3) {
              this.docGstBooleanForRequired = true;
              this.docGstBooleanForSize = true;
            } else {
              this.docGstBooleanForRequired = false;
              this.docGstBooleanForSize = false;
            }
            /////////////////
            if (this.applicationDocumentData?.docEnergyBillFile.documentStatus == 3) {
              this.energyBillDocBooleanForRequired = true;
              this.energyBillDocBooleanForSize = true;
            } else {
              this.energyBillDocBooleanForRequired = false;
              this.energyBillDocBooleanForSize = false;
            }
            console.log(this.docDropdownArray, " this.docDropdownArray....");
          } else {
            this.docDropdownArray = [
              {
                "name": "Energy Bill File",
                "value": this.applicationDocumentData?.docEnergyBillFile
              }
            ];
            /////////////////
            if (this.applicationDocumentData?.docEnergyBillFile.documentStatus == 3) {
              this.energyBillDocBooleanForRequired = true;
              this.energyBillDocBooleanForSize = true;
            } else {
              this.energyBillDocBooleanForRequired = false;
              this.energyBillDocBooleanForSize = false;
            }
            console.log(this.docDropdownArray, " this.docDropdownArray....");
          }

        } else if (this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId == 10) {
          if (this.applicationDocumentData?.docGst != null) {
            this.docDropdownArray = [
              {
                "name": "Approve Map Document",
                "value": this.applicationDocumentData?.docMap
              },
              {
                "name": "Load Sheet Document",
                "value": this.applicationDocumentData?.docLoadSheet
              },
              {
                "name": "GstFile",
                "value": this.applicationDocumentData?.docGst
              }
            ];
            /////////////////
            if (this.applicationDocumentData?.docGst.documentStatus == 3) {
              this.docGstBooleanForRequired = true;
              this.docGstBooleanForSize = true;
            } else {
              this.docGstBooleanForRequired = false;
              this.docGstBooleanForSize = false;
            }
            /////////////////
            if (this.applicationDocumentData?.docMap.documentStatus == 3) {
              this.docMapBooleanForRequired = true;
              this.docMapBooleanForSize = true;
            } else {
              this.docMapBooleanForRequired = false;
              this.docMapBooleanForSize = false;
            }
            console.log(this.docDropdownArray, " this.docDropdownArray....");
            ////////////////////////////////
            if (this.applicationDocumentData?.docLoadSheet.documentStatus == 3) {
              this.docLoadSheetBooleanForRequired = true;
              this.docLoadSheetBooleanForSize = true;
            } else {
              this.docLoadSheetBooleanForRequired = false;
              this.docLoadSheetBooleanForSize = false;
            }
            console.log(this.docDropdownArray, " this.docDropdownArray....");
            ////////////////////////////////
          } else {
            this.docDropdownArray = [
              {
                "name": "Approve Map Document",
                "value": this.applicationDocumentData?.docMap
              },
              {
                "name": "Load Sheet Document",
                "value": this.applicationDocumentData?.docLoadSheet
              }
            ];
            /////////////////
            if (this.applicationDocumentData?.docMap.documentStatus == 3) {
              this.docMapBooleanForRequired = true;
              this.docMapBooleanForSize = true;
            } else {
              this.docMapBooleanForRequired = false;
              this.docMapBooleanForSize = false;
            }
            console.log(this.docDropdownArray, " this.docDropdownArray....");
            ////////////////////////////////
            if (this.applicationDocumentData?.docLoadSheet.documentStatus == 3) {
              this.docLoadSheetBooleanForRequired = true;
              this.docLoadSheetBooleanForSize = true;
            } else {
              this.docLoadSheetBooleanForRequired = false;
              this.docLoadSheetBooleanForSize = false;
            }
            console.log(this.docDropdownArray, " this.docDropdownArray....");
            ////////////////////////////////
          }
        }
        else {
          this.docDropdownArray = [];
          console.log(this.docDropdownArray, " this.docDropdownArray....");
        }
      }

    })
  }

  onSubmit() {

    console.log("this.energyBillDocBooleanForRequired : ",this.energyBillDocBooleanForRequired,".................this.energyBillDocBooleanForSize:",this.energyBillDocBooleanForSize);
    

    ///////////////////// for group file ////////////////////////
    if (this.docIndividualOrGroupBooleanForRequired == true && this.docIndividualOrGroupBooleanForSize == true) {
      this.notification.error("Group file must be required & file should not be greater than 2MB !");
      return
    } else if (this.docIndividualOrGroupBooleanForRequired == true && this.docIndividualOrGroupBooleanForSize == false) {
      this.notification.error("Group file must be required !");
      return
    } else if (this.docIndividualOrGroupBooleanForRequired == false && this.docIndividualOrGroupBooleanForSize == true) {
      this.notification.error("Group file should not be greater than 2MB !");
      return
    } else {

    }


    ///////////////////// for noc file ////////////////////////
    if (this.docNocBooleanForRequired == true && this.docNocBooleanForSize == true) {
      this.notification.error("Noc file must be required & file should not be greater than 2MB !");
      return
    } else if (this.docNocBooleanForRequired == true && this.docNocBooleanForSize == false) {
      this.notification.error("Noc file must be required !");
      return
    } else if (this.docNocBooleanForRequired == false && this.docNocBooleanForSize == true) {
      this.notification.error("Noc file should not be greater than 2MB !");
      return
    } else {

    }

    ////////////////////// for samagra file ///////////////////////
    if (this.docSamagraFileBooleanForRequired == true && this.docSamagraFileBooleanForSize == true) {
      this.notification.error("Samagra file must be required && file should not be greater than 2MB !");
      return
    } else if (this.docSamagraFileBooleanForRequired == true && this.docSamagraFileBooleanForSize == false) {
      this.notification.error("Samagra file must be required !");
      return
    } else if (this.docSamagraFileBooleanForRequired == false && this.docSamagraFileBooleanForSize == true) {
      this.notification.error("Samagra file should not be greater than 2MB !");
      return
    } else {

    }

    /////////////////////////// for energy bill file ////////////////////
    if (this.energyBillDocBooleanForRequired == true && this.energyBillDocBooleanForSize == true) {
      this.notification.error("Energy Bill file must be required && file should not be greater than 2MB !");
      return
    } else if (this.energyBillDocBooleanForRequired == true && this.energyBillDocBooleanForSize == false) {
      this.notification.error("Energy Bill file must be required !");
      return
    } else if (this.energyBillDocBooleanForRequired == false && this.energyBillDocBooleanForSize == true) {
      this.notification.error("Energy Bill file should not be greater than 2MB !");
      return
    } else {

    }

    ////////////////////// for gst file ////////////////////////////
    if (this.docGstBooleanForRequired == true && this.docGstBooleanForSize == true) {
      this.notification.error("Gst file must be required && file should not be greater than 2MB !");
      return
    } else if (this.docGstBooleanForRequired == true && this.docGstBooleanForSize == false) {
      this.notification.error("Gst file must be required !");
      return
    } else if (this.docGstBooleanForRequired == false && this.docGstBooleanForSize == true) {
      this.notification.error("Gst file should not be greater than 2MB !");
      return
    } else {

    }


    ////////////////for Administrative file /////////////////////////////
    if (this.docAdministrativeBooleanForRequired == true && this.docAdministrativeBooleanForSize == true) {
      this.notification.error("Administrative file must be required && file should not be greater than 2MB !");
      return
    } else if (this.docAdministrativeBooleanForRequired == true && this.docAdministrativeBooleanForSize == false) {
      this.notification.error("Administrative file must be required !");
      return
    } else if (this.docAdministrativeBooleanForRequired == false && this.docAdministrativeBooleanForSize == true) {
      this.notification.error("Administrative file should not be greater than 2MB !");
      return
    } else {

    }

    /////////////// for khasra khatoni file //////////////////////
    if (this.docKhasraKhatoniBooleanForRequired == true && this.docKhasraKhatoniBooleanForSize == true) {
      this.notification.error("Khasra Khatoni file must be required && file should not be greater than 2MB !");
      return
    } else if (this.docKhasraKhatoniBooleanForRequired == true && this.docKhasraKhatoniBooleanForSize == false) {
      this.notification.error("Khasra Khatoni file must be required !");
      return
    } else if (this.docKhasraKhatoniBooleanForRequired == false && this.docKhasraKhatoniBooleanForSize == true) {
      this.notification.error("Khasra Khatoni file should not be greater than 2MB !");
      return
    } else {

    }

    ///////////////////// for rera permission file  /////////////////////
    if (this.docReraPermissionBooleanForRequired == true && this.docReraPermissionBooleanForSize == true) {
      this.notification.error("Rera Permission file must be required && file should not be greater than 2MB !");
      return
    } else if (this.docReraPermissionBooleanForRequired == true && this.docReraPermissionBooleanForSize == false) {
      this.notification.error("Rera Permission file must be required !");
      return
    } else if (this.docReraPermissionBooleanForRequired == false && this.docReraPermissionBooleanForSize == true) {
      this.notification.error("Rera Permission file should not be greater than 2MB !");
      return
    } else {

    }


    /////////////////////for T&cp file ////////////////////////
    if (this.docT$cpPermissionBooleanForRequired == true && this.docT$cpPermissionBooleanForSize == true) {
      this.notification.error("T&CP Permission file must be required && file should not be greater than 2MB !");
      return
    } else if (this.docT$cpPermissionBooleanForRequired == true && this.docT$cpPermissionBooleanForSize == false) {
      this.notification.error("T&CP Permission file must be required !");
      return
    } else if (this.docT$cpPermissionBooleanForRequired == false && this.docT$cpPermissionBooleanForSize == true) {
      this.notification.error("T&CP Permission file should not be greater than 2MB !");
      return
    } else {

    }



    ///////////////// for Registry file  ////////////////////////////////////

    if (this.docRegistryBoleanForRequired == true && this.docRegistryBoleanForSize == true) {
      this.notification.error("Registry file must be required && file should not be greater than 2MB !");
      return
    } else if (this.docRegistryBoleanForRequired == true && this.docRegistryBoleanForSize == false) {
      this.notification.error("Registry file must be required !");
      return
    } else if (this.docRegistryBoleanForRequired == false && this.docRegistryBoleanForSize == true) {
      this.notification.error("Registry file should not be greater than 2MB !");
      return
    } else {

    }


    ////////////////////////////////////////// for docMap //////////////////////////////////////////
    if (this.docMapBooleanForRequired == true && this.docMapBooleanForSize == true) {
      this.notification.error("Approve Map file must be required && file should not be greater than 2MB !");
      return
    } else if (this.docMapBooleanForRequired == true && this.docMapBooleanForSize == false) {
      this.notification.error("Approve Map file must be required !");
      return
    } else if (this.docMapBooleanForRequired == false && this.docMapBooleanForSize == true) {
      this.notification.error("Approve Map file should not be greater than 2MB !");
      return
    } else {

    }

    //////////////////////////////////////// for LoadSheet //////////////////////////////////////////
    if (this.docLoadSheetBooleanForRequired == true && this.docLoadSheetBooleanForSize == true) {
      this.notification.error("Load Sheet file must be required && file should not be greater than 2MB !");
      return
    } else if (this.docLoadSheetBooleanForRequired == true && this.docLoadSheetBooleanForSize == false) {
      this.notification.error("Load Sheet file must be required !");
      return
    } else if (this.docLoadSheetBooleanForRequired == false && this.docLoadSheetBooleanForSize == true) {
      this.notification.error("Load Sheet file should not be greater than 2MB !");
      return
    } else {

    }


    // oldDocRegistryId :any
    // oldDocTcpPermissionId :any
    // oldDocReraPermissionId :any
    // oldDocKhasraKhatoniId :any
    // oldDocAdministrativeId :any
    // oldDocGstId :any
    // oldDocEnergyBillId :any
    // oldDocSamagraFileId :any
    // oldDocNocId :any
    //oldDocIndividualOrGroupFileId:any
    if (this.oldDocIndividualOrGroupFileId == undefined || this.oldDocIndividualOrGroupFileId == null) {
      this.oldDocIndividualOrGroupFileId = 0;
    }

    if (this.oldDocRegistryId == undefined || this.oldDocRegistryId == null) {
      this.oldDocRegistryId = 0;
    }

    if (this.oldDocTcpPermissionId == undefined || this.oldDocTcpPermissionId == null) {
      this.oldDocTcpPermissionId = 0;
    }

    if (this.oldDocReraPermissionId == undefined || this.oldDocReraPermissionId == null) {
      this.oldDocReraPermissionId = 0;
    }

    if (this.oldDocKhasraKhatoniId == undefined || this.oldDocKhasraKhatoniId == null) {
      this.oldDocKhasraKhatoniId = 0;
    }

    if (this.oldDocAdministrativeId == undefined || this.oldDocAdministrativeId == null) {
      this.oldDocAdministrativeId = 0;
    }

    if (this.oldDocGstId == undefined || this.oldDocGstId == null) {
      this.oldDocGstId = 0;
    }

    if (this.oldDocEnergyBillId == undefined || this.oldDocEnergyBillId == null) {
      this.oldDocEnergyBillId = 0;
    }

    if (this.oldDocSamagraFileId == undefined || this.oldDocSamagraFileId == null) {
      this.oldDocSamagraFileId = 0;
    }
    if (this.oldDocNocId == undefined || this.oldDocNocId == null) {
      this.oldDocNocId = 0;
    }

    ////////////////////////////////////
    if (this.olddocMapId == undefined || this.olddocMapId == null) {
      this.olddocMapId = 0;
    }

    if (this.olddocLoadSheetId == undefined || this.olddocLoadSheetId == null) {
      this.olddocLoadSheetId = 0;
    }
    ///////////////////////////////////

    let formData: FormData = new FormData();
    if (this.docRegistry != null || this.docRegistry != undefined) {
      formData.append("docRegistry", this.docRegistry);
    }
    if (this.docT$cpPermission != null || this.docT$cpPermission != undefined) {
      formData.append("docT$cpPermission", this.docT$cpPermission);
    }
    if (this.docReraPermission != null || this.docReraPermission != undefined) {
      formData.append("docReraPermission", this.docReraPermission);
    }
    if (this.docKhasraKhatoni != null || this.docKhasraKhatoni != undefined) {
      formData.append("docKhasraKhatoni", this.docKhasraKhatoni);
    }
    if (this.docAdministrative != null || this.docAdministrative != undefined) {
      formData.append("docAdministrative", this.docAdministrative);
    }
    if (this.docGst != null || this.docGst != undefined) {
      formData.append("docGst", this.docGst);
    }

    //////////////////////////
    if (this.docMap != null || this.docMap != undefined) {
      formData.append("docMap", this.docMap);
    }

    if (this.docLoadSheet != null || this.docLoadSheet != undefined) {
      formData.append("docLoadSheet", this.docLoadSheet);
    }
    ////////////////////////////

    if (this.energyBillDoc != null || this.energyBillDoc != undefined) {
      formData.append("energyBillDoc", this.energyBillDoc);
    }
    if (this.docSamagraFile != null || this.docSamagraFile != undefined) {
      formData.append("docSamagraFile", this.docSamagraFile);
    }
    if (this.docNoc != null || this.docNoc != undefined) {
      formData.append("docNoc", this.docNoc);
    }
    if (this.docIndividualOrGroup != null || this.docIndividualOrGroup != undefined) {
      formData.append("docIndividualOrGroup", this.docIndividualOrGroup);
    }

    formData.append("oldDocRegistryId", this.oldDocRegistryId);
    formData.append("oldDocTcpPermissionId", this.oldDocTcpPermissionId);
    formData.append("oldDocReraPermissionId", this.oldDocReraPermissionId);
    formData.append("oldDocKhasraKhatoniId", this.oldDocKhasraKhatoniId);
    formData.append("oldDocAdministrativeId", this.oldDocAdministrativeId);
    formData.append("oldDocGstId", this.oldDocGstId);
    //////////////////////////
    formData.append("oldDocMapId", this.olddocMapId);
    formData.append("oldDocLoadSheetId", this.olddocLoadSheetId);
    ///////////////////////////
    formData.append("oldDocEnergyBillId", this.oldDocEnergyBillId);
    formData.append("oldDocSamagraFileId", this.oldDocSamagraFileId);
    formData.append("oldDocNocId", this.oldDocNocId);
    formData.append("oldDocIndividualOrGroupFileId", this.oldDocIndividualOrGroupFileId);
    formData.append("consumerAppNo", this.consumerApplicationDetail.consumerApplicationNo);
    // consumerAppNo

    this.newApplicationService.newFileAgainSubmit(formData, this.token).subscribe((data: any) => {
      console.log(data, "datttaaa......................................................");
      if (data.code == "200") {
        this.notification.success(data.message);
        this.chalGayaBoolean = true
        this.onClose();
      } else {
        this.notification.error(data.message);
        return
      }

    }, (error: any) => {
      console.log(error, "eerrrooorrrttttyyyyyyyyyy.............................");

    }
    )
  }

}
