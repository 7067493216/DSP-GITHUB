import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NscCoreService } from 'src/app/postlogin/ht-nsc/services/nsc-core.service';
import { NotificationService } from 'src/app/shared-services/notification.service';

@Component({
  selector: 'app-consumer-search-bar',
  templateUrl: './consumer-search-bar.component.html',
  styleUrls: ['./consumer-search-bar.component.css']
})
export class ConsumerSearchBarComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject();
  advanceSearchFg: FormGroup;
  minLength: number;
  maxLength: number;
  inputPattern: RegExp;
  listData = new MatTableDataSource<any>();
  displayedColumns: string[] = ['consumerId', 'consumerName', 'meterSerialNo', 'mobile', 'email', 'aadhar', 'pancard', 'tariffSubCategoryCode', 'connectedLoad', 'supplyVoltage', 'address'];
  isLoading: boolean = true;
  showTable: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<ConsumerSearchBarComponent>,
    private formBuilder: FormBuilder,
    private nscCoreService: NscCoreService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.advanceSearchFg = this.formBuilder.group({
      searchType: ['', Validators.required],
      searchValue: ['', Validators.required]
    });
  }
  changeSelection(value) {
    this.listData.data = [];
    this.showTable = false;
    this.advanceSearchFg.controls['searchValue'].reset();
    if (value == 'aadhar') {
      this.minLength = 12
      this.maxLength = 12
      this.inputPattern = /[0-9]{12}$/;
    } else if (value == 'email') {
      this.minLength = 8
      this.maxLength = 30
      this.inputPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}$/;
    } else if (value == 'meterNo') {
      this.minLength = 4
      this.maxLength = 11
      this.inputPattern = /[a-zA-Z0-9]$/;
    } else if (value == 'mobile') {
      this.minLength = 10
      this.maxLength = 10
      this.inputPattern = /[6-9][0-9]{9}$/;
    } else if (value == 'name') {
      this.minLength = 4
      this.maxLength = 10
      this.inputPattern = /^[a-zA-Z ]*$/;
    } else if (value == 'pancard') {
      this.minLength = 10
      this.maxLength = 10
      this.inputPattern = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    }
    this.advanceSearchFg.controls['searchValue'].updateValueAndValidity();
  }
  advanceSearch() {
    if (this.advanceSearchFg.valid) {
      const formValue = this.advanceSearchFg.value;
      const param = formValue.searchType + '=' + formValue.searchValue;
      this.isLoading = true;
      this.nscCoreService.advanceSearch(param).pipe(takeUntil(this.unsubscribe$)).subscribe(
        responce => {
          if (responce['code'] == "200") {
            this.listData.data = responce['list'];
            this.isLoading = false;
            this.showTable = true;
          } else {
            this.notificationService.warn(responce['message'])
            this.showTable = false;
          }
        }
      );
    } else {
      this.notificationService.warn('Please enter the parameters');
    }
  }
  closeDialog(): void {
    this.showTable = false;
    this.dialogRef.close(null);
  }
  getRecord(consumerId) {
    this.dialogRef.close(consumerId);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
