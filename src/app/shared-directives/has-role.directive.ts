import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserLoginService } from '../postlogin/user-modules/services/user-login.service';
import { RoleConstantsService } from '../auth/authservices/role-constants.service';



@Directive({
    selector: '[appHasRole]'
})
export class HasRoleDirective {



    allowedRoles: Array<string> = [];
    @Input() set appHasRole(allowedRoles) {
        this.allowedRoles = allowedRoles;
        this.showIfUserAllowed();
    }
    constructor(
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private jwtHelperService: JwtHelperService,
        private userLoginService: UserLoginService,
        public role: RoleConstantsService,
    ) {
        this.showIfUserAllowed();
        console.log(this.role,"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrrrrrrr",this.appHasRole);
        
    }
    roles(): boolean {
        const userRoles = this.jwtHelperService.decodeToken(sessionStorage.getItem('usertoken')).roles as Array<string>
        console.log("userRoles--->", userRoles);
        return this.allowedRoles.some(a => userRoles.some(m => a === m));
    }

    showIfUserAllowed() {
        console.log("@@@@this.userLoginService.currentUserName@@@@", this.userLoginService.currentUserName);
        if (this.userLoginService.currentUserName !== null) {
           sessionStorage.setItem('currentUserName',this.userLoginService.currentUserName);
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

