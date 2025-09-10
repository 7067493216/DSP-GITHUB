import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ConsumerLoginService } from "./consumer-login.service";


@Injectable({
  providedIn: "root",
})
export class RedirectGatewayService {
  constructor(private router: Router, private auth: ConsumerLoginService) { }

  post(obj, url) {
    // var myWindow = window.open("", "MsgWindow", "width=500,height=900");
    var mapForm = document.createElement("form");
    mapForm.target = "_blank";
    mapForm.method = "POST"; // or "post" if appropriate
    mapForm.action = url;
    console.log("url :" + url);
    Object.keys(obj).forEach(function (param) {
      var mapInput = document.createElement("input");
      mapInput.type = "hidden";
      mapInput.name = param;
      console.log(param + ":" + obj[param]);
      mapInput.setAttribute("value", obj[param]);
      mapForm.appendChild(mapInput);
    });
    document.body.appendChild(mapForm);
    mapForm.submit();

    // isAuthenticated()
    // if (this.auth.isLoggednIn()) {
    //   this.router.navigate(["ViewPayBillApp/bill-Payment"]);
    // } else {
    //   this.router.navigate(["ViewPayBillApp/bill-Payment"]);
    // }
  }
}
