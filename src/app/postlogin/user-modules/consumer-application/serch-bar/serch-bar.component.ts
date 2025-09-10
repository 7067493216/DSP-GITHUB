import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-serch-bar',
  templateUrl: './serch-bar.component.html',
  styleUrls: ['./serch-bar.component.css']
})
export class SerchBarComponent implements OnInit {
  tableData = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Alex', age: 28 },
    // ...
  ];

  filteredData = [...this.tableData]; // Create a copy of the original data to filter
  searchTerm: any;

  constructor() { }

  ngOnInit(): void {
    this.filterData();
  }

  filterData() {
    this.filteredData = this.tableData.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
