import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ConsumerApplicationService } from '../../services/consumer-application.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';



export const YEAR_ONLY_DATE_FORMATS = {
  parse: { dateInput: 'YYYY' },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM-YYYY',
  },
  display: {
    dateInput: 'MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-fill-details-new',
  templateUrl: './fill-details-new.component.html',
  styleUrls: ['./fill-details-new.component.css']
})



export class FillDetailsNewComponent implements OnInit {

  vendorForm: FormGroup;
  capacities: number[] = [25, 63, 100, 200, 315];


  // NOTE: name unchanged; widened type to prevent runtime/type errors.
  vendors: any[] = ['Vendor A', 'Vendor B', 'Vendor C'];

  materialList: Array<any> = [];
  vendorSearch: string = '';
  filteredVendors: any[] = [];
  today = new Date();
  dtrDetails: any


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<FillDetailsNewComponent>,
    private spinnerService: SpinnerService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private consumerApplicationService: ConsumerApplicationService
  ) {
    console.log(this.data, 'FillDetailsComponent init data...');
    this.getVenderList();

    // this.vendorForm = this.fb.group({
    //   vendors: this.fb.array([this.createVendorGroup(0)])
    // });

    //  this.loadForm()
  }

  ngOnInit(): void {

  }

  createVendorGroup(index: number, data?: any): FormGroup {
    console.log(data, "data,,,,,,,,,,,,,,,,,,,,,,");

    console.log("vendorName : ", this.vendors.filter(x => x.Company_ame == data?.vendorName)[0], "meterialSpecification : ", this.vendors.filter(x => x.Company_ame == data?.vendorName)[0]?.Material_details.filter(y => y.Material_Specification == data?.meterialSpecification)[0]);

    return this.fb.group({
      vendorName: [this.vendors.filter(x => x.Company_ame == data?.vendorName)[0] || '', Validators.required],
      meterialSpecification: [this.vendors.filter(x => x.Company_ame == data?.vendorName)[0]?.Material_details.filter(y => y.Material_Specification == data?.meterialSpecification)[0] || '', Validators.required], // data?.meterialSpecification
      totalNoOfDtr: [''],
      shufflingFlag: [0],
      conAppNo: [this.data?.row?.CONSUMER_APPLICATION_NUMBER],
      materialName: [data?.materialName || '', Validators.required],
      serialNo: [data?.serialNo || ''],
      itemNo: [data?.itemNo || ''],
      capacityOfDtr: [null],
      invoiceNO: [data?.invoiceNO || ''],
      yearOfManufacture: [new Date(Number(data?.yearOfManufacture.split("-")[1]), Number(data?.yearOfManufacture.split("-")[0]) - 1, 1) || ''], // const dateObj = new Date(Number(data?.yearOfManufacture.split("-")[1]), Number(data?.yearOfManufacture.split("-")[0]) - 1, 1);
      auticationId: [data?.auticationId || this.data?.row?.CONTRACTOR_AUTHANTICATION_ID],
      totalNoOfPtr: [0],
      capacityOfPtr: [null],
      instalationDate: [data?.instalationDate || '', Validators.required]
    });


  }


  loadForm() {

    //  const apiResponse = [
    // {
    //         "id": 225,
    //         "conAppNo": "SV202307557",
    //         "totalNoOfDtr": 2,
    //         "vendorName": "AWADH TRANSFORMERS",
    //         "serialNo": "232323232",
    //         "invoiceNO": "623565236236",
    //         "yearOfManufacture": "01-2006",
    //         "capacityOfDtr": null,
    //         "auticationId": "CZC20160512195",
    //         "shuffling": null,
    //         "circleName": null,
    //         "childApplicationNo": null,
    //         "shufflingFlag": 0,
    //         "itemNo": "M-0106034",
    //         "materialName": "Distribution Transformer",
    //         "meterialSpecification": "BIS certified Energy Efficiency Level-III (Old)/Level-II (New) Convential 11/0.433KV, 25 KVA Distribution Transformer",
    //         "capacityOfPtr": null,
    //         "totalNoOfPtr": 0,
    //         "divisionName": null,
    //         "consumerName": null,
    //         "address": null,
    //         "contractorAuthenticationNo": null,
    //         "workOrderNumber": null,
    //         "materialRecivedInLab": null,
    //         "circleId": null,
    //         "dtrPassOrFail": null,
    //         "applicationId": null,
    //         "instalationDate": "2009-07-07T18:30:00.000Z",
    //         "regionId": null,
    //         "regionName": null,
    //         "dtrAcceptOrNot": null,
    //         "remark": null,
    //         "date": null,
    //         "parantApplicationNo": null,
    //         "dc_NAME": null,
    //         "taAcceptDtrOrNotDate": null
    //     },
    //     {
    //         "id": 225,
    //         "conAppNo": "SV202307557",
    //         "totalNoOfDtr": 2,
    //         "vendorName": "AWADH TRANSFORMERS",
    //         "serialNo": "232323232",
    //         "invoiceNO": "623565236236",
    //         "yearOfManufacture": "01-2006",
    //         "capacityOfDtr": null,
    //         "auticationId": "CZC20160512195",
    //         "shuffling": null,
    //         "circleName": null,
    //         "childApplicationNo": null,
    //         "shufflingFlag": 0,
    //         "itemNo": "M-0106034",
    //         "materialName": "Distribution Transformer",
    //         "meterialSpecification": "BIS certified Energy Efficiency Level-III (Old)/Level-II (New) Convential 11/0.433KV, 25 KVA Distribution Transformer",
    //         "capacityOfPtr": null,
    //         "totalNoOfPtr": 0,
    //         "divisionName": null,
    //         "consumerName": null,
    //         "address": null,
    //         "contractorAuthenticationNo": null,
    //         "workOrderNumber": null,
    //         "materialRecivedInLab": null,
    //         "circleId": null,
    //         "dtrPassOrFail": null,
    //         "applicationId": null,
    //         "instalationDate": "2009-07-07T18:30:00.000Z",
    //         "regionId": null,
    //         "regionName": null,
    //         "dtrAcceptOrNot": null,
    //         "remark": null,
    //         "date": null,
    //         "parantApplicationNo": null,
    //         "dc_NAME": null,
    //         "taAcceptDtrOrNotDate": null
    //     }
    //  ]


    // this.vendorRows.clear(); // always reset first

    // if (apiResponse && apiResponse.length > 0) {
    //   // build form array from API
    //   apiResponse.forEach(item => {
    //     console.log(item, "iiitttteeemmmmm.............................");

    //     this.vendorRows.push(this.createVendorGroup(0, item));
    //   });
    // } else {
    //   // fallback: old process (create one empty row)
    //   this.vendorRows.push(this.createVendorGroup(0));
    // }


    this.consumerApplicationService.getApiForDtrDetails(this.data?.row?.CONSUMER_APPLICATION_NUMBER).subscribe((resp: any) => {
      console.log(resp, "resp.......................................................");
      if (resp?.code == "200") {
        const apiResponse = resp?.list;
        console.log(apiResponse, "apiResponse");

        this.vendorRows.clear(); // always reset first
        if (apiResponse && apiResponse.length > 0) {
          // build form array from API
          apiResponse.forEach(item => {
            console.log(item, "iiitttteeemmmmm.............................");

            this.vendorRows.push(this.createVendorGroup(0, item));
          });
        } else {
          // fallback: old process (create one empty row)
          this.vendorRows.push(this.createVendorGroup(0));
        }
      } else {
        this.vendorRows.push(this.createVendorGroup(0));
      }

    })

  }

  /* ---------- API ---------- */
  getVenderList() {
    this.consumerApplicationService.getVenderList().subscribe((resp: any) => {
      console.log(resp, 'Vender List Response');
      if (resp?.status == '200') {
        this.notificationService.success('Data Retreive SuccessFully');
        this.vendors = resp?.data;        // expecting array of vendor objects
        this.vendorForm = this.fb.group({
          vendors: this.fb.array([this.createVendorGroup(0)])
        });

        this.loadForm()
        this.filteredVendors = [...this.vendors]; // legacy var (kept)
      } else {
        this.notificationService.warn('Something went wrong !');
      }
    });


  }

  /* ---------- Search Filtering (Vendor) ---------- */
  filterVendorOptions(searchText: string, matSelect: any) {
    const search = (searchText || '').toLowerCase();
    if (!matSelect?.options) return;

    matSelect.options.forEach((option: any) => {
      // skip search input row
      if (option?.disabled) return;
      const vendor = option.value;
      const label = (vendor?.Company_ame || '').toLowerCase();
      const match = label.includes(search);
      const el = option._getHostElement?.();
      if (el) {
        el.style.display = match ? 'block' : 'none';
      }
    });
  }

  /* ---------- Search Filtering (Material) ---------- */
  filterMaterialOptions(searchText: string, matSelect: any) {
    const search = (searchText || '').toLowerCase();
    if (!matSelect?.options) return;

    matSelect.options.forEach((option: any) => {
      if (option?.disabled) return;
      const material = option.value;
      const label = (material?.Material_Specification || '').toLowerCase();
      const match = label.includes(search);
      const el = option._getHostElement?.();
      if (el) {
        el.style.display = match ? 'block' : 'none';
      }
    });
  }

  /* optional: clear filters when panel re-opens */
  resetSearch() {
    this.vendorSearch = '';
    this.filteredVendors = [...this.vendors];
  }

  /* ---------- Event Handlers ---------- */
  onSelectVender(materialDetails: any, i: number) {
    console.log('Vendor material details:', materialDetails, 'row:', i);

    // you said no functionality change -> leaving original behavior.
    // (materialDetails is vendor.Material_details; actual patch done when material is chosen)
  }

  onSelectMaterial(x: any, i: number) {
    console.log('Material selected:', x, 'row:', i);
    this.vendorRows.at(i).get('materialName')?.setValue(x?.Material_Name);
    this.vendorRows.at(i).get('itemNo')?.setValue(x?.item_code);
  }

  /* ---------- FormArray Helpers ---------- */
  get vendorRows(): FormArray {
    return this.vendorForm?.get('vendors') as FormArray;
  }



  addVendor() {
    const newIndex = this.vendorRows.length;
    this.vendorRows.push(this.createVendorGroup(newIndex));
  }

  removeVendor(index: number) {
    this.vendorRows.removeAt(index);
    this.updateVendorIds();
  }

  updateVendorIds() {
    this.vendorRows.controls.forEach((group, idx) => {
      group.get('id')?.setValue(idx + 1);
    });
  }

  /* ---------- Year Picker ---------- */
  onYearSelected(normalizedYear: Date, datepicker: any, rowIndex: number): void {
    const year = normalizedYear.getFullYear();
    const newDate = new Date(year, 0, 1);
    const row = this.vendorRows.at(rowIndex) as FormGroup;
    row.get('yearOfManufacture')?.setValue(newDate);
    datepicker.close();
  }

  onMonthSelected(event: any, datepicker: any, i: number) {
    console.log("event : ", event, "datepicker : ", datepicker, "i : ", i);

    const control = this.vendorRows.at(i).get('yearOfManufacture');
    control?.setValue(event);   // set selected month-year
    datepicker.close();         // close picker after selection
  }

  onMonthSelectedInstallation(event: any, datepicker: any, i: number) {
    const control = this.vendorRows.at(i).get('instalationDate');
    control?.setValue(event);   // set selected month-year
    datepicker.close();         // close picker after selection
  }



  /* ---------- Submit ---------- */
  onSubmit(): void {
    if (this.vendorForm.invalid) {
      this.vendorForm.markAllAsTouched();
      return;
    }

    const raw = this.vendorForm.value;
    const payload = {
      vendors: raw.vendors.map((v: any) => ({
        ...v,
        yearOfManufacture: v.yearOfManufacture
          ? `${String(new Date(v.yearOfManufacture).getMonth() + 1).padStart(2, '0')}-${new Date(v.yearOfManufacture).getFullYear()}`
          : null,

        vendorName: v.vendorName?.Company_ame,
        meterialSpecification: v.meterialSpecification?.Material_Specification,
        totalNoOfDtr: this.vendorForm.value.vendors?.length
      })),
    };

    console.log('FORM VALUE (raw):', raw);
    console.log('PAYLOAD (yearOnly):', payload);

    this.consumerApplicationService.resamplingDataSubmit(payload.vendors).subscribe((resp: any) => {
      console.log(resp, 'Submit Response');
      if (resp?.code == '200') {
        this.notificationService.success(resp?.message);
        this.onClose();
      } else {
        this.notificationService.warn(resp?.message);
      }
    });
  }

  trackByIndex(i: number): number { return i; }

  onClose() {
    this.dialogRef.close();
  }

}
