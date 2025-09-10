import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared-services/notification.service';
import { SpinnerService } from 'src/app/shared-services/spinner.service';
import { ConsumerApplicationService } from '../../services/consumer-application.service';






export const YEAR_ONLY_DATE_FORMATS = {
  parse: { dateInput: 'YYYY' },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};


@Component({
  selector: 'app-sampling-multiple-dtr',
  templateUrl: './sampling-multiple-dtr.component.html',
  styleUrls: ['./sampling-multiple-dtr.component.css']
})
export class SamplingMultipleDtrComponent implements OnInit {

  vendorForm: FormGroup;
  vendorFormForPtr: FormGroup;
  myForm: FormGroup

  // NOTE: name unchanged; widened type to prevent runtime/type errors.
  vendors: any[] = ['Vendor A', 'Vendor B', 'Vendor C'];
  materialList: Array<any> = [];
  vendorSearch: string = '';
  filteredVendors: any[] = [];

  vendorsForPtr: any[] = ['Vendor A', 'Vendor B', 'Vendor C'];
  materialListForPtr: Array<any> = [];
  vendorSearchForPtr: string = '';
  filteredVendorsForPtr: any[] = [];
  capacities: number[] = [25, 100, 200, 315];
  ptrList: Array<any> = [];
  ptrDetailsBoolean: boolean = false;

   displayedColumns: string[] = [
    'conAppNo',
    'vendorName',
    'serialNo',
    'invoiceNO',
    'yearOfManufacture',
    'itemNo',
    'materialName',
    'capacityOfPtr',
    'totalNoOfPtr',
    'meterialSpecification'
  ];

  dataSource = [
    {
      id: 87,
      conAppNo: "SV202307049",
      totalNoOfDtr: 0,
      vendorName: "PRATIK'S STEEL MART ",
      serialNo: "56666",
      invoiceNO: "5454666",
      yearOfManufacture: "2024",
      capacityOfDtr: null,
      auticationId: null,
      shuffling: null,
      circleName: null,
      childApplicationNo: null,
      shufflingFlag: 0,
      itemNo: "M-0502230",
      materialName: "Stay Set",
      capacityOfPtr: "100",
      totalNoOfPtr: 1,
      parantApplicationNo: null,
      meterialSpecification: null
    },
    {
      id: 88,
      conAppNo: "SV202307050",
      totalNoOfDtr: 0,
      vendorName: "PRATIK'S STEEL MART ",
      serialNo: "56666",
      invoiceNO: "5454666",
      yearOfManufacture: "2024",
      capacityOfDtr: null,
      auticationId: null,
      shuffling: null,
      circleName: null,
      childApplicationNo: null,
      shufflingFlag: 0,
      itemNo: "M-0502230",
      materialName: "Stay Set",
      capacityOfPtr: "100",
      totalNoOfPtr: 1,
      parantApplicationNo: null,
      meterialSpecification: null
    },
    {
      id: 89,
      conAppNo: "SV202307051",
      totalNoOfDtr: 0,
      vendorName: "PRATIK'S STEEL MART ",
      serialNo: "56666",
      invoiceNO: "5454666",
      yearOfManufacture: "2024",
      capacityOfDtr: null,
      auticationId: null,
      shuffling: null,
      circleName: null,
      childApplicationNo: null,
      shufflingFlag: 0,
      itemNo: "M-0502230",
      materialName: "Stay Set",
      capacityOfPtr: "100",
      totalNoOfPtr: 1,
      parantApplicationNo: null,
      meterialSpecification: null
    },
    {
      id: 90,
      conAppNo: "SV202307052",
      totalNoOfDtr: 0,
      vendorName: "PRATIK'S STEEL MART ",
      serialNo: "56666",
      invoiceNO: "5454666",
      yearOfManufacture: "2024",
      capacityOfDtr: null,
      auticationId: null,
      shuffling: null,
      circleName: null,
      childApplicationNo: null,
      shufflingFlag: 0,
      itemNo: "M-0502230",
      materialName: "Stay Set",
      capacityOfPtr: "100",
      totalNoOfPtr: 1,
      parantApplicationNo: null,
      meterialSpecification: null
    }
  ];


  ptrBoolean:boolean = false;
  dtrBoolean:boolean = false



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<SamplingMultipleDtrComponent>,
    private spinnerService: SpinnerService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private consumerApplicationService: ConsumerApplicationService
  ) {
    console.log(this.data, 'FillDetailsComponent init data...');
    this.resamplingGettingPtrValue(this.data.row.consumerApplicationNo);
    this.getVenderList();

    this.vendorForm = this.fb.group({
      vendors: this.fb.array([this.createVendorGroup(0)])
    });

    this.vendorFormForPtr = this.fb.group({
      vendors: this.fb.array([this.createVendorGroupForPtr(0)])
    });
  }

  resamplingGettingPtrValue(consumerApplicationNumber: any) {
    this.consumerApplicationService.resamplingGettingPtrValue(consumerApplicationNumber).subscribe((resp: any) => {
      console.log(resp, "rrrreeeesssssssppppppppp..........................................");
      if (resp?.code == "200") {
        if (resp?.list?.length > 0) {
          this.dataSource = resp?.list;
          this.ptrDetailsBoolean = true
        } else {
          this.dataSource = [];
          this.ptrDetailsBoolean = false
        }
      } else {
        this.dataSource = [];
        this.ptrDetailsBoolean = false
        this.notificationService.warn(resp?.message);
        return
      }

    })
  }

  buildCheckBoxForm() {
    // Reactive form create
    this.myForm = this.fb.group({
      dtrCheckbox: [false],    // Checkbox 1
      dtr: [{ value: '', disabled: true }],  // Input field 1 (default disabled)

      ptrCheckbox: [false],    // Checkbox 2
      ptr: [{ value: '', disabled: true }]   // Input field 2 (default disabled)
    });

    // Checkbox 1 listener
    this.myForm.get('dtrCheckbox')?.valueChanges.subscribe((checked: boolean) => {
      const field1Control = this.myForm.get('dtr');
      checked ? field1Control?.enable() : field1Control?.disable();
    });

    // Checkbox 2 listener
    this.myForm.get('ptrCheckbox')?.valueChanges.subscribe((checked: boolean) => {
      const field2Control = this.myForm.get('ptr');
       if(this.ptrDetailsBoolean==false){
 checked ? field2Control?.enable() : field2Control?.disable();
      }else{
         //checked ? field2Control?.disable() : field2Control?.disable();
         if(checked){
          field2Control?.disable();
this.notificationService.error("you have already entered ptr details");
         }else{
field2Control?.disable();
         }
         
      }
      //checked ? field2Control?.enable() : field2Control?.disable();
    });
  }

  onCheckBoxSubmit() {
    this.vendorForm = this.fb.group({
      vendors: this.fb.array([this.createVendorGroup(0)])
    });

    this.vendorFormForPtr = this.fb.group({
      vendors: this.fb.array([this.createVendorGroupForPtr(0)])
    });

    if(this.myForm.value.dtr!=undefined && this.myForm.value.dtr!=null && this.myForm.value.dtr!=''){
      this.enterNoOfRows(this.myForm.value.dtr);
      this.dtrBoolean = true
    }else{
      this.dtrBoolean = false
    }

    if(this.myForm.value.ptr!=undefined && this.myForm.value.ptr!=null && this.myForm.value.ptr!=''){
       this.enterNoOfRowsForPtr(this.myForm.value.ptr);
       this.ptrBoolean = true
    }else{
      this.ptrBoolean = false
    }
    console.log('Form Value:', this.myForm.value);
    
   

  }

  ngOnInit(): void {
    this.buildCheckBoxForm()
  }

  /* ---------- API ---------- */
  getVenderList() {
    this.consumerApplicationService.getVenderList().subscribe((resp: any) => {
      console.log(resp, 'Vender List Response');
      if (resp?.status == '200') {
        this.notificationService.success('Data Retreive SuccessFully');
        this.vendors = resp?.data;        // expecting array of vendor objects
        this.filteredVendors = [...this.vendors]; // legacy var (kept)
        this.vendorsForPtr = resp?.data;        // expecting array of vendor objects
        this.filteredVendorsForPtr = [...this.vendors]; // legacy var (kept)
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
  filterMaterialOptionsForPtr(searchText: string, matSelect: any) {
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

  resetSearchForPtr() {
    this.vendorSearchForPtr = '';
    this.filteredVendorsForPtr = [...this.vendorsForPtr];
  }

  /* ---------- Event Handlers ---------- */
  onSelectVender(materialDetails: any, i: number) {
    console.log('Vendor material details:', materialDetails, 'row:', i);

    // you said no functionality change -> leaving original behavior.
    // (materialDetails is vendor.Material_details; actual patch done when material is chosen)
  }

  onSelectVenderForPtr(materialDetails: any, i: number) {
    console.log('Vendor material details:', materialDetails, 'row:', i);

    // you said no functionality change -> leaving original behavior.
    // (materialDetails is vendor.Material_details; actual patch done when material is chosen)
  }

  onSelectMaterial(x: any, i: number) {
    console.log('Material selected:', x, 'row:', i);
    this.vendorRows.at(i).get('materialName')?.setValue(x?.Material_Name);
    this.vendorRows.at(i).get('itemNo')?.setValue(x?.item_code);
  }

  onSelectMaterialForPtr(x: any, i: number) {
    console.log('Material selected:', x, 'row:', i);
    this.vendorRowsForPtr.at(i).get('materialName')?.setValue(x?.Material_Name);
    this.vendorRowsForPtr.at(i).get('itemNo')?.setValue(x?.item_code);
  }

  /* ---------- FormArray Helpers ---------- */
  get vendorRows(): FormArray {
    return this.vendorForm.get('vendors') as FormArray;
  }

  createVendorGroup(index: number): FormGroup {
    return this.fb.group({
      totalNoOfDtr: [''],
      shufflingFlag: [0],
      conAppNo: [this.data.row.consumerApplicationNo],
      vendorName: ['', Validators.required],
      MeterialSpecification: [''],
      materialName: ['', Validators.required],
      serialNo: [''],
      itemNo: [''],
      capacityOfDtr: [''],
      invoiceNO: [''],
      yearOfManufacture: [''],
      auticationId: [this.data?.row?.CONTRACTOR_AUTHANTICATION_ID],
      totalNoOfPtr: [0],
      capacityOfPtr: [0]
    });
  }

  addVendor() {

    const newIndex = this.vendorRows.length;
    this.vendorRows.push(this.createVendorGroup(newIndex));
    const currentValue = Number(this.myForm.get('dtr')?.value) || 0;
    this.myForm.get('dtr')?.setValue(currentValue + 1);

  }

  enterNoOfRows(no: number) {
    const newIndex = this.vendorRows.length;
    for (let k = 1; k <= no - 1; k++) {
      this.vendorRows.push(this.createVendorGroup(newIndex));
    }
  }

  removeVendor(index: number) {
    this.vendorRows.removeAt(index);
    this.updateVendorIds();
    const currentValue = Number(this.myForm.get('dtr')?.value) || 0;
    this.myForm.get('dtr')?.setValue(currentValue - 1);

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

  /* ---------- Submit ---------- */
  onSubmit(): void {
    console.log(this.vendorForm, "this.vendorForm   dtr.........................");


    if (this.vendorFormForPtr.invalid) {
      this.vendorFormForPtr.markAllAsTouched();
      this.notificationService.error("Invalid PTR FORM")
      return;
    }

    if (this.vendorForm.invalid) {
      this.vendorForm.markAllAsTouched();
      this.notificationService.error("Invalid DTR FORM")
      return;
    }

    const raw = this.vendorForm.value;
    const payload = {
      vendors: raw.vendors.map((v: any) => ({
        ...v,
        yearOfManufacture: v.yearOfManufacture
          ? JSON.stringify(new Date(v.yearOfManufacture).getFullYear())
          : null,
        vendorName: v.vendorName?.Company_ame,
        MeterialSpecification: v.MeterialSpecification?.Material_Specification,
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


  ///////////////////////////////////////////////////////////////////////////////////////////////// for ptr //////////////////////////////////////////




  get vendorRowsForPtr(): FormArray {
    return this.vendorFormForPtr.get('vendors') as FormArray;
  }

  createVendorGroupForPtr(index: number): FormGroup {
    return this.fb.group({
      totalNoOfDtr: [0],
      shufflingFlag: [0],
      conAppNo: [this.data.row.consumerApplicationNo],
      vendorName: ['', Validators.required],
      MeterialSpecification: [''],
      materialName: ['', Validators.required],
      serialNo: [''],
      itemNo: [''],
      capacityOfDtr: [0],
      invoiceNO: [''],
      yearOfManufacture: [''],
      auticationId: [this.data?.row?.CONTRACTOR_AUTHANTICATION_ID],
      totalNoOfPtr: [''],
      capacityOfPtr: ['']
    });
  }

  addVendorForPtr() {

    const newIndexForPtr = this.vendorRowsForPtr.length;
    this.vendorRowsForPtr.push(this.createVendorGroupForPtr(newIndexForPtr));
    const currentValueForPtr = Number(this.myForm.get('ptr')?.value) || 0;
    this.myForm.get('ptr')?.setValue(currentValueForPtr + 1);

  }

  enterNoOfRowsForPtr(no: number) {
    const newIndex = this.vendorRowsForPtr.length;
    for (let k = 1; k <= no - 1; k++) {
      this.vendorRowsForPtr.push(this.createVendorGroupForPtr(newIndex));
    }
  }

  removeVendorForPtr(index: number) {
    this.vendorRowsForPtr.removeAt(index);
    this.updateVendorIdsForPtr();
    const currentValueForPtr = Number(this.myForm.get('ptr')?.value) || 0;
    this.myForm.get('ptr')?.setValue(currentValueForPtr - 1);

  }

  updateVendorIdsForPtr() {
    this.vendorRowsForPtr.controls.forEach((group, idx) => {
      group.get('id')?.setValue(idx + 1);
    });
  }

  /* ---------- Year Picker ---------- */
  onYearSelectedForPtr(normalizedYear: Date, datepicker: any, rowIndex: number): void {
    const year = normalizedYear.getFullYear();
    const newDate = new Date(year, 0, 1);
    const row = this.vendorRowsForPtr.at(rowIndex) as FormGroup;
    row.get('yearOfManufacture')?.setValue(newDate);
    datepicker.close();
  }

  /* ---------- Submit ---------- */
  onSubmitPtr(): void {

    console.log(this.vendorFormForPtr, "this.vendorFormForPtr........");

    if (this.vendorFormForPtr.invalid) {
      this.vendorFormForPtr.markAllAsTouched();
      this.notificationService.error("Invalid PTR FORM")
      return;
    }

    if (this.vendorForm.invalid) {
      this.vendorForm.markAllAsTouched();
      this.notificationService.error("Invalid DTR FORM")
      return;
    }

    const raw = this.vendorFormForPtr.value;
    const payload = {
      vendors: raw.vendors.map((v: any) => ({
        ...v,
        yearOfManufacture: v.yearOfManufacture
          ? JSON.stringify(new Date(v.yearOfManufacture).getFullYear())
          : null,
        vendorName: v.vendorName?.Company_ame,
        MeterialSpecification: v.MeterialSpecification?.Material_Specification,
        totalNoOfPtr: this.vendorFormForPtr.value.vendors?.length
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

  trackByIndexForPtr(i: number): number { return i; }


}
