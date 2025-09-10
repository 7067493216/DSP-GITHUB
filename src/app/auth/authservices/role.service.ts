import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(
    private jwtHelperService: JwtHelperService,
  ) { }

  roles(role: Array<any>): boolean {
    const userRoles = this.jwtHelperService.decodeToken(sessionStorage.getItem('usertoken')).roles as Array<string>
    return role.some(a => userRoles.some(m => a === m));
  }
}
