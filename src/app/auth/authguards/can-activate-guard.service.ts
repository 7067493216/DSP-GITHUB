import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConsumerLoginService } from 'src/app/postlogin/consumer-modules/services/consumer-login.service';
// import { ConsumerLoginService } from 'src/app/postlogin/consumer-modules/services/consumer-login.service';


// ConsumerLoginService

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate {
  constructor(private router: Router, private jwtHelperService: JwtHelperService) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // var token = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null;
    // if (this.consumerLoginService.isAuthenticated() && token != null) {
    //   let roles = next.data['permittedRoles'];
    //   if (roles) {
    //     if (this.consumerLoginService.roleMatch(roles)) return true;
    //     else {
    //       this.router.navigate(['/message-pages/access-denied']);
    //       return false;
    //     }
    //   }
    //   return true;
    // }
    // else {
    //   this.router.navigate(['consumer-login']);
    //   return false;
    // }
    return true;
  }




  // constructor(private router: Router, private jwtHelperService: JwtHelperService,private consumerLoginService:ConsumerLoginService) {
  // }
  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   let token = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null;
  //   console.log(this.consumerLoginService.isAuthenticated(),"this.consumerLoginService.isAuthenticated().....",token);
    
  //   if (this.consumerLoginService.isAuthenticated() && token != null) {
  //     let roles = next.data['permittedRoles'];
  //     if (roles) {
  //       if (this.consumerLoginService.roleMatch(roles)) return true;
  //       else {
  //         this.router.navigate(['/message-pages/access-denied']);
  //         return false;
  //       }
  //     }
  //     return true;
  //   }
  //   else {
  //     this.router.navigate(['consumer-login']);
  //     return false;
  //   }
    
  // }

}