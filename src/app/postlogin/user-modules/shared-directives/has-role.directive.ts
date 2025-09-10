import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserLoginService } from '../services/user-login.service';



@Directive({
    selector: '[appHasRole]'
})
export class HasRoleDirective {



    allowedRoles: Array<string> = [];
    @Input() set appHasRole(allowedRoles) {
        this.allowedRoles = allowedRoles;
       // console.log("this.allowedRoles---->", this.allowedRoles);
        this.showIfUserAllowed();
    }
    constructor(
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private jwtHelperService: JwtHelperService,
        private userLoginService: UserLoginService
    ) {
        this.showIfUserAllowed()
    }
    roles(): boolean {
        const userRoles = this.jwtHelperService.decodeToken(sessionStorage.getItem('usertoken')).roles as Array<string>
        // console.log("userRoles--->", userRoles);
        // console.log("this.allowedRoles---->", this.allowedRoles);
        if (this.allowedRoles == undefined) {
            return false;
        } else {
            return this.allowedRoles.some(a => userRoles.some(m => a === m));
        }


    }

    showIfUserAllowed() {
       // console.log("@@@@this.userLoginService.currentUserName@@@@", this.userLoginService.currentUserName);
        if (this.userLoginService.currentUserName !== null) {
            if (this.roles() !== true) {
                this.viewContainer.clear();
                return;
            } else if (this.roles()) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainer.clear();
            }
        }
    }
}

