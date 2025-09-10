import { Component, OnInit, OnDestroy} from '@angular/core';
import { SharedDataService } from 'src/app/shared-services/shared-data.service';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-nsc-view',
    templateUrl: './nsc-view.component.html',
    styleUrls: ['./nsc-view.component.css']
})
export class NscViewComponent implements OnInit,OnDestroy {
    unsubscribe$: Subject<void> = new Subject();
    nscViewData:Array<any> =[];
    constructor(
        private data: SharedDataService,
        private location: Location
    ) { }

    ngOnInit() {
        this.data.getData.pipe(takeUntil(this.unsubscribe$)).subscribe(message => this.nscViewData = message);
        
        if(this.nscViewData === undefined || ! this.nscViewData.length){
            this.location.back();
        }
    }
    printToCart(printSectionId: string) {
        let popupWinindow;
        let innerContents = document.getElementById(printSectionId).innerHTML;
        popupWinindow = window.open('', '_blank', 'width=1200,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this.nscViewData = [];
      }
}
