import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-discom-master',
  templateUrl: './discom-master.component.html',
  styleUrls: ['./discom-master.component.css']
})
export class DiscomMasterComponent implements OnInit {
  tabIndex = 0 ;
  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Discom Master');
  }
  changeTab(event){
     this.tabIndex = event.index;
  }
}
