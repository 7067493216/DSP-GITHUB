import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumerLoginService } from '../services/consumer-login.service';


@Component({
  selector: 'app-logout',
  templateUrl: './consumer-logout.component.html',
  styleUrls: ['./consumer-logout.component.css']
})
export class ConsumerLogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private consumerLoginService: ConsumerLoginService
  ) { }

  ngOnInit() {
    this.consumerLoginService.logout();

    sessionStorage.clear();
  }

}
