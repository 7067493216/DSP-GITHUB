import { DatePipe } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { GatePassChallan, GatePassPayload, MaterialDetail, VerifierBy, VerifierGatekeeper, VerifierIssuingAuthority } from '../../models/gatePassPayload';
import { PdfService } from '../../services/pdf.service';
import html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-gate-pass',
  templateUrl: './gate-pass.component.html',
  styleUrls: ['./gate-pass.component.css']
})
export class GatePassComponent implements OnInit {

  myForm!: FormGroup;
  getPassPatchingData: any
  gatePassPayload: GatePassPayload = new GatePassPayload();
  gatePassChallan: GatePassChallan = new GatePassChallan();
  materialDetail: MaterialDetail = new MaterialDetail()
  verifierGatekeeper: VerifierGatekeeper = new VerifierGatekeeper();
  verifierIssuingAuthority: VerifierIssuingAuthority = new VerifierIssuingAuthority();
  verifierBy: VerifierBy = new VerifierBy();
  tableShowBoolean: boolean = false;


  @ViewChild('componentView', { static: false }) pdfTable: ElementRef;
  @ViewChild('componentView') htmlData!: ElementRef;
  token:any;
   checkboxBoolean:boolean=false;
   accessLeveOfUser:any
   currentRoleOfUser:any

   startDate = new Date();
   today = new Date();



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<GatePassComponent>,
    private spinnerService: SpinnerService,
    private fb: FormBuilder,
    private datePipe: DatePipe,

    private consumerApplicationService: ConsumerApplicationService
  ) {
    console.log(this.data,"......................");
    
    this.getPassPatchingDetails(this.data.row.conAppNo);
     this.token = sessionStorage.getItem("usertoken");
     console.log(this.token,"tttttoooookkkkkeeeennnnnn...................");
      this.accessLeveOfUser = JSON.parse(sessionStorage.getItem("accessLeveOfUser"));
    console.log(this.accessLeveOfUser, "v............");

    this.currentRoleOfUser = JSON.parse(sessionStorage.getItem("currentRoleOfUser"));
    console.log(this.currentRoleOfUser, "v............");
    
  }

  

  downloadPDF() {
    const options = {
      margin: 0.3,
      filename: 'Gate-Pass.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const content = this.htmlData.nativeElement;

    html2pdf()
      .set(options)
      .from(content)
      .save()
      .toPdf() // Ensure PDF generation
      .outputPdf('blob') // Get the PDF as a Blob
      .then((pdfBlob: Blob) => {
        console.log(pdfBlob, 'Generated PDF Blob');

        ///////////////////////////////////////////////////////////
        // Prepare form data for upload
        const formDataNew: FormData = new FormData();
        formDataNew.append('getPassFilee', pdfBlob, `Gate-Pass.pdf`); // Add a filename for clarity
        formDataNew.append(
          'consumerApplicationNo',
          this.myForm.value.applicationNumber || ''
        );
        formDataNew.append('trfFile', null)
        this.consumerApplicationService.trfAndGatePassUpload(formDataNew, this.token).subscribe((resp: any) => {
          console.log(resp, "rrreeessssspppppp............");

        })
        ////////////////////////////////////////////////////////////



      })
  }

  getPassPatchingDetails(applicationNumber: any) {
    this.consumerApplicationService.getGetPassDetails(applicationNumber).subscribe((res: any) => {
      console.log(res, "ressssssssssssssssssssssssssssssss.....................");
      if (res?.code == "200") {
        this.notificationService.success(res?.message)
        this.getPassPatchingData = res?.list[0]
        this.loadEditForm()
      } else {
        this.notificationService.warn(res?.message)
        return
      }

    })

  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      quantity: [1,Validators.required],
      circle: [''],
      division: [''],
      // subdivision: [''],
      dc: [''],
      applicationNumber: [''],
      consumerName: [''],
      address: [''],
      contractorAuthId: [''],
      workOrderNumber: [''],
      workOrderDate: [''],
      venderName: [''],
      itemName: [''],
      itemCode: [''],
      materialType: ['DTR',Validators.required],
      serialNumber: [''],
      capacity: [''],
      invoiceNumber: [''],
      yom: [''],
      vehicleName: ['',Validators.required],
      vehicleNumber: ['',Validators.required],
      driverName: ['',Validators.required],
      issueDate: ['',Validators.required],
      sNo: [''],
      materialSerialNo: [''],
      batchNo: [''],
      nisthaLab: [''],
      designation: [''],
      employeeNumber: [''],
      nameOfEmployee: ['']

    });


  }


  onSubmit() {

    if(this.checkboxBoolean==false){
      this.notificationService.error("Please Select Checkbox First !");
      return
    }

    if(this.myForm.invalid && ( this.myForm.value.vehicleName==undefined || this.myForm.value.vehicleNumber==undefined || this.myForm.value.driverName==undefined )){
      this.notificationService.warn("Please Enter Vehicle Details First !");
      return
    }

    if(this.myForm.invalid){
      this.notificationService.error("Invalid Form !");
      return
    }

    // gatePassChallan
    this.gatePassChallan.id = null
    this.gatePassChallan.outwardQuantity = this.myForm.value.quantity
    this.gatePassChallan.manualDINo = null
    this.gatePassChallan.nameOfEntity = null
    this.gatePassChallan.loaOrderNo = null
    this.gatePassChallan.loaOrderDate = null
    this.gatePassChallan.itemnName = this.myForm.value.itemName
    this.gatePassChallan.itemCode = this.myForm.value.itemCode
    this.gatePassChallan.materialType = this.myForm.value.materialType
    this.gatePassChallan.serialNo = this.myForm.value.serialNumber
    this.gatePassChallan.dtrCapacity = this.myForm.value.capacity
    this.gatePassChallan.invoiceNo = this.myForm.value.invoiceNumber
    this.gatePassChallan.yearOfMenufacture = this.myForm.value.yom
    this.gatePassChallan.manufacturerFirmName = null
    this.gatePassChallan.descriptionOfItem = null
    this.gatePassChallan.driverName = this.myForm.value.driverName
    this.gatePassChallan.diNo = null
    this.gatePassChallan.driverContactNo = null
    this.gatePassChallan.issuedTo = null
    this.gatePassChallan.issueDate = this.myForm.value.issueDate
    this.gatePassChallan.receiverEntityName = null
    this.gatePassChallan.receiverDetails = null
    this.gatePassChallan.contactPerson = null
    this.gatePassChallan.contactNo = null
    this.gatePassChallan.consumerApplicationNumber = this.myForm.value.applicationNumber
    this.gatePassChallan.divisionName = this.myForm.value.division
    this.gatePassChallan.DC_NAME = this.myForm.value.dc
    this.gatePassChallan.consumerName = this.myForm.value.consumerName
    this.gatePassChallan.address = this.myForm.value.address
    this.gatePassChallan.contractorAuthenticationNo = this.myForm.value.contractorAuthId
    this.gatePassChallan.workOrderNumber = this.myForm.value.workOrderNumber
    this.gatePassChallan.circleName = this.myForm.value.circle
    this.gatePassChallan.workOrderDate = this.myForm.value.workOrderDate
    this.gatePassChallan.vendorName = this.myForm.value.venderName
    this.gatePassChallan.nisthaLab = this.myForm.value.nisthaLab
    this.gatePassChallan.vehicleName = this.myForm.value.vehicleName
    this.gatePassChallan.vehicleNNumber = this.myForm.value.vehicleNumber
    this.gatePassChallan.veriferCode = this.myForm.value.employeeNumber

    // materialDetail
    this.materialDetail.batchNo = this.myForm.value.batchNo
    this.materialDetail.consumerApplicationNumber = this.myForm.value.applicationNumber
    this.materialDetail.finalRemark = null
    this.materialDetail.materialDetailsId = null
    this.materialDetail.materialSerialNo = this.myForm.value.materialSerialNo
    this.materialDetail.serialNo = 1
    let materialDetailsArray: MaterialDetail[] = [];
    materialDetailsArray.push(this.materialDetail);


    // verifierGatekeeper
    // this.verifierBy.designation =
    // this.verifierBy.name =
    // this.verifierBy.verifierById =


    // verifierIssuingAuthority
    // this.verifierIssuingAuthority.designation =
    // this.verifierIssuingAuthority.name =
    // this.verifierIssuingAuthority.verifierIssuingAuthorityId =


    // verifierBy
    this.verifierBy.designation = this.myForm.value.designation
    this.verifierBy.name = this.myForm.value.nameOfEmployee
    this.verifierBy.verifierById = this.myForm.value.employeeNumber


    this.gatePassPayload.gatePassChallan = this.gatePassChallan;
    this.gatePassPayload.materialDetail = materialDetailsArray;
    this.gatePassPayload.verifierGatekeeper = this.verifierGatekeeper
    this.gatePassPayload.verifierIssuingAuthority = this.verifierIssuingAuthority
    this.gatePassPayload.verifierBy = this.verifierBy;

    

    this.consumerApplicationService.gatePassCreate(this.gatePassPayload).subscribe((resp: any) => {
      console.log(resp, "reeesssppp..............................");
      if (resp?.code == "200") {
        this.notificationService.success(resp?.message);
        this.tableShowBoolean = true
        this.getPassPatchingDetails(this.myForm.value.applicationNumber)
      } else {
        this.notificationService.warn(resp?.message);
        this.tableShowBoolean = false

        return
      }

    })

  }

  onClose() {
    this.dialogRef.close();
  }

  

  chosenMonthHandler(event: Date, datepicker: any) {
  // store the selected month/year as a Date (1st day of that month)
  this.myForm.get('yom')?.setValue(new Date(event.getFullYear(), event.getMonth(), 1));
  datepicker.close();
}





  loadEditForm() {
    console.log(this.getPassPatchingData, "88888888888888888888888888888888");

    // this.myForm.get('quantity').setValue(this.getPassPatchingData?.)
    this.myForm.get('circle').setValue(this.getPassPatchingData?.CIRCLE)
    this.myForm.get('division').setValue(this.getPassPatchingData?.DIVISION)
    // this.myForm.get('subdivision').setValue(this.getPassPatchingData?.)
    this.myForm.get('dc').setValue(this.getPassPatchingData?.DC_NAME)
    this.myForm.get('applicationNumber').setValue(this.getPassPatchingData?.CONSUMER_APPLICATION_NUMBER)
    this.myForm.get('consumerName').setValue(this.getPassPatchingData?.CONSUMER_NAME)
    this.myForm.get('address').setValue(this.getPassPatchingData?.ADDRESS)
    this.myForm.get('contractorAuthId').setValue(this.getPassPatchingData?.CONTRACTOR_AUTHANTICATION_ID)
    this.myForm.get('workOrderNumber').setValue(this.getPassPatchingData?.WORK_ORDER_NO)
    this.myForm.get('workOrderDate').setValue(new Date(this.getPassPatchingData?.WORK_ORDER_DATE))
    this.myForm.get('venderName').setValue(this.getPassPatchingData?.VENDOR_NAME)
    this.myForm.get('itemName').setValue(this.getPassPatchingData?.MATERIAL_SPECIFICATION)
    this.myForm.get('itemCode').setValue(this.getPassPatchingData?.ITEM_NO)
    this.myForm.get('materialType').setValue(this.getPassPatchingData?.MATERIAL_TYPE)
    this.myForm.get('serialNumber').setValue(this.getPassPatchingData?.SERIAL_NO)
    this.myForm.get('capacity').setValue(this.getPassPatchingData?.DTR_CAPACITY)
    this.myForm.get('invoiceNumber').setValue(this.getPassPatchingData?.INVOICE_NO)
    // this.myForm.get('yom').setValue(this.getPassPatchingData?.YEAR_OF_MANUFACTURE)
  const rawValue = this.getPassPatchingData?.YEAR_OF_MANUFACTURE; // "11-2009"

if (rawValue) {
  const [month, year] = rawValue.split('-'); // ["11", "2009"]
  const dateObj = new Date(+year, +month - 1, 1); // 1st of that month
  this.myForm.get('yom')?.setValue(dateObj);
}



    let nl = this.getPassPatchingData?.NISTHA_LAB
    // this.myForm.get('nisthaLab').setValue( this.getPassPatchingData?.NISTHA_LAB +``+ this.getPassPatchingData?.REGION)
    this.myForm.get('nisthaLab')?.setValue(
      `${this.getPassPatchingData?.NISTHA_LAB ?? ''} ${this.getPassPatchingData?.REGION ?? ''}`.trim()
    );

     this.myForm.get('vehicleName').setValue(this.getPassPatchingData?.VEHICLE_NAME)
     this.myForm.get('vehicleNumber').setValue(this.getPassPatchingData?.VEHICLE_NUMER)
     this.myForm.get('driverName').setValue(this.getPassPatchingData?.DRIVER_NAME);
      this.myForm.get('issueDate').setValue(this.getPassPatchingData?.ISSUE_DATE);
     this.myForm.get('nameOfEmployee').setValue(this.accessLeveOfUser?.userName);
     this.myForm.get('employeeNumber').setValue(this.accessLeveOfUser?.userId);
     this.myForm.get('designation').setValue(this.currentRoleOfUser?.role);

    //  this.myForm.get('sNo').setValue(this.getPassPatchingData?.)
    //  this.myForm.get('materialsNo').setValue(this.getPassPatchingData?.)
    //  this.myForm.get('batchNo').setValue(this.getPassPatchingData?.)

    //  '{
    //             "WORK_ORDER_NO": "WO_2023090514442",
    //             "VENDOR_NAME": null,
    //             "CONSUMER_NAME": "INDUS TOWER RAKESH PATHAK",
    //             "SERIAL_NO": null,
    //             "CAPACITY_OF_DTR": null,
    //             "CONSUMER_APPLICATION_NUMBER": "SV202308232",
    //             "MATERIAL_SPECIFICATION": null,
    //             "DC_NAME": "Hakimabad DC",
    //             "INVOICE_NO": null,
    //             "WORK_ORDER_DATE": "2023-09-05T14:44:02.416",
    //             "NATURE_OF_WORK_NAME": "New Service Connection (Extension) ",
    //             "ADDRESS": "INDORE HEAD QUARTER",
    //             "CONSUMER_MOBILE_NO": "9575950008",
    //             "PARANT_APPLICATION_NO": null,
    //             "YEAR_OF_MANUFACTURE": null,
    //             "CIRCLE": "O&M Circle Sehore",
    //             "ERP_WORKFLOW_NUMBER": "21555",
    //             "TOTAL_NO_OF_DTR": null,
    //             "DIVISION": "O&M Division Ashta",
    //             "WORK_COMPLETION_DATE": null,
    //             "CONTRACTOR_NAME": "DEEPANSH BABBAR",
    //             "PHONE_NUMBER": null,
    //             "MATERIAL_NAME": null,
    //             "CONTRACTOR_AUTHANTICATION_ID": "CZC20160512195"
    //         }


  }

 

  onCheckBoxSelect(e:any){
    console.log(e);
    this.checkboxBoolean = e.value;
  }

}
