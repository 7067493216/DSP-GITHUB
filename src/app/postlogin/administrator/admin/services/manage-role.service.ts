import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleData } from '../models/role.model';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { GenerateUrl } from 'src/environments/generate-url.model';



@Injectable({
  providedIn: 'root'
})
export class ManageRoleService {
  formData: RoleData;
  baseUrl: string = this.url.roleUrl;
  constructor(
    private http: HttpClient,
    private url: GenerateUrl
  ) { }

  getRoleList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAll');
  }

  addRole(role: RoleData) {
    return this.http.post(this.baseUrl + '/add', role);

  }

  deleteRole(roleId: number) {
    return this.http.delete(this.baseUrl + '/delete/' + roleId);
  }

  getRoleById(roleId: number): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/get/' + roleId);
  }

  updateRole(roleId: number, role: RoleData): Observable<any> {
    return this.http.put(this.baseUrl + '/update/' + roleId, role);
  }

}
