import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
  selector: 'app-fill-details',
  templateUrl: './fill-details.component.html',
  styleUrls: ['./fill-details.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: YEAR_ONLY_DATE_FORMATS }, { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }]
})
export class FillDetailsComponent implements OnInit {

  vendorForm: FormGroup;
  capacities: number[] = [25,63, 100, 200, 315];


  // NOTE: name unchanged; widened type to prevent runtime/type errors.
  vendors: any[] = ['Vendor A', 'Vendor B', 'Vendor C'];

  materialList: Array<any> = [];
  vendorSearch: string = '';
  filteredVendors: any[] = [];
  today = new Date();
  inValidDate:boolean=false


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<FillDetailsComponent>,
    private spinnerService: SpinnerService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private consumerApplicationService: ConsumerApplicationService
  ) {
    console.log(this.data, 'FillDetailsComponent init data...');
    this.getVenderList();

    this.vendorForm = this.fb.group({
      vendors: this.fb.array([this.createVendorGroup(0)])
    });
  }

  ngOnInit(): void {

  }

  

  /* ---------- API ---------- */
  getVenderList() {
    this.consumerApplicationService.getVenderList().subscribe((resp: any) => {
      console.log(resp, 'Vender List Response');
      if (resp?.status == '200') {
        this.notificationService.success('Data Retreive SuccessFully');
        this.vendors = resp?.data;        // expecting array of vendor objects
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
    return this.vendorForm.get('vendors') as FormArray;
  }

  createVendorGroup(index: number): FormGroup {
    return this.fb.group({
      totalNoOfDtr: [''],
      shufflingFlag: [0],
      conAppNo: [this.data?.row?.CONSUMER_APPLICATION_NUMBER],
      vendorName: ['',Validators.required],
      meterialSpecification: ['',Validators.required],
      materialName: ['',Validators.required],
      serialNo: ['',Validators.required],
      itemNo: ['',Validators.required],
       capacityOfDtr: [null],
      invoiceNO: ['',Validators.required],
      yearOfManufacture: ['',Validators.required],
      auticationId: [this.data?.row?.CONTRACTOR_AUTHANTICATION_ID],
      totalNoOfPtr:[0],
      capacityOfPtr:[null],
      instalationDate:['',Validators.required]
    },
  { validators: this.dateOrderValidator } 
);
  }

  // Custom validator
dateOrderValidator = (group: AbstractControl): ValidationErrors | null => {
  const manufacture = group.get('yearOfManufacture')?.value;
  const installation = group.get('instalationDate')?.value;

  if (!manufacture || !installation) return null;

  const manuDate = new Date(manufacture);
  const installDate = new Date(installation);

  if (manuDate < installDate) {
    this.inValidDate = false;
    return null;
  } else {
    this.inValidDate = true;
    console.log(this.inValidDate, "yyyessssss............");
     
    return { dateOrderInvalid: true };
  }
};

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
    if( this.inValidDate == true){
      this.notificationService.error("Installation Date must be after Year of Manufacture");

      return
    }
  const control = this.vendorRows.at(i).get('yearOfManufacture');
  control?.setValue(event);   // set selected month-year
  datepicker.close();         // close picker after selection
}

onMonthSelectedInstallation(event: any, datepicker: any, i: number){
   if( this.inValidDate == true){
      this.notificationService.error("Installation Date must be after Year of Manufacture");
      return
    }
 const control = this.vendorRows.at(i).get('instalationDate');
  control?.setValue(event);   // set selected month-year
  datepicker.close();         // close picker after selection
}

  

  /* ---------- Submit ---------- */
  onSubmit(): void {
     if( this.inValidDate == true){
      this.notificationService.error("Installation Date must be after Year of Manufacture");
      return
    }

    if (this.vendorForm.invalid) {
      this.vendorForm.markAllAsTouched();
      this.notificationService.error("INVALID Form !")
      return;
    }

   

    const raw = this.vendorForm.value;
    const payload = {
      vendors: raw.vendors.map((v: any) => ({
        ...v,
        // yearOfManufacture: v.yearOfManufacture
        //   ? JSON.stringify(new Date(v.yearOfManufacture).getFullYear())
        //   : null,
         yearOfManufacture: v.yearOfManufacture
          ? `${String(new Date(v.yearOfManufacture).getMonth() + 1).padStart(2, '0')}-${new Date(v.yearOfManufacture).getFullYear()}`
          : null,
        vendorName: v.vendorName?.Company_ame,
        meterialSpecification: v.meterialSpecification?.Material_Specification,
        totalNoOfDtr: this.vendorForm.value.vendors?.length
      })),
    };

    console.log();
    

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
