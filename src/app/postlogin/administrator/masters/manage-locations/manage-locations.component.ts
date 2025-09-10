import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-manage-locations',
  templateUrl: './manage-locations.component.html',
  styleUrls: ['./manage-locations.component.css']
})
export class ManageLocationsComponent implements OnInit {
  tabIndex = 0 ;
  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Location Master');
  }
  changeTab(event){
     this.tabIndex = event.index;
  }
}
