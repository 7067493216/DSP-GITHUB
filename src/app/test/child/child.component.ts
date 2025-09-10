import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @Output() eventName = new EventEmitter<String>();

  callParentMethod() {
      this. eventName.next();
  }

  constructor() { }

  ngOnInit(): void {
  }
test(){
  console.log("triggerd");
  
}
}
