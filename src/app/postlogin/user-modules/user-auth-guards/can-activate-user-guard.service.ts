import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UserLoginService } from '../services/user-login.service';



@Injectable({
    providedIn: 'root'
})
export class CanActivateUserGuardService implements CanActivate {
    constructor(private userLoginService: UserLoginService, private router: Router, private jwtHelperService: JwtHelperService) {
    }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        var token = sessionStorage.getItem("usertoken") ? JSON.parse(sessionStorage.getItem("usertoken")) : null;
        if (this.userLoginService.isAuthenticated() && token != null) {
            let roles = next.data['permittedRoles'];
            if (roles) {
                if (this.userLoginService.roleMatch(roles)) return true;
                else {
                    this.router.navigate(['/message-pages/access-denied']);
                    return false;
                }
            }
            return true;
        }
        else {
            this.router.navigate(['/user/login']);
            return false;
        }
    }

}