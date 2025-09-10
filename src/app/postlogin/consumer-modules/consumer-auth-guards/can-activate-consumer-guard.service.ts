import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConsumerLoginService } from '../services/consumer-login.service';



@Injectable({
    providedIn: 'root'
})
export class CanActivateConsumerGuardService implements CanActivate {
    constructor(private consumerLoginService: ConsumerLoginService, private router: Router, private jwtHelperService: JwtHelperService) {
    }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        var token = sessionStorage.getItem("consumertoken") ? JSON.parse(sessionStorage.getItem("consumertoken")) : null;
console.log(token,"saammmmToken abhi ka.................");

        console.log("this.consumerLoginService.isAuthenticated()", this.consumerLoginService.isAuthenticated());
        if (this.consumerLoginService.isAuthenticated() && token != null) {
           
            return true;
        }
        else {
            this.router.navigate(['/consumer/login']);
            return false;
        }
    }

}