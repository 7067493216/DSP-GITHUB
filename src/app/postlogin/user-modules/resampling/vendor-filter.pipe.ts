import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vendorFilter'
})
export class VendorFilterPipe implements PipeTransform {

  transform(vendors: any[], searchText: string): any[] {
    if (!vendors || !searchText) return vendors;
    searchText = searchText.toLowerCase();

    return vendors.filter(vendor =>
      vendor?.Company_ame?.toLowerCase().includes(searchText)
    );
  }

}
