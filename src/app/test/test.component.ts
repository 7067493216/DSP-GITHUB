import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ChildComponent } from './child/child.component';
// import { ConsumerLoginService } from '../auth/authservices/consumer-login.service';
import { RoleConstantsService } from '../auth/authservices/role-constants.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject();
  @ViewChild(ChildComponent) child: ChildComponent;
  constructor(
    // public role: ConsumerLoginService,
    public array: RoleConstantsService

  ) { }
  ngOnInit() {

  }
  ;
  Onsubmit() {
    // this.child.test();
    console.log("tests");

  }

}
