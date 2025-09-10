import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/app/shared-models/list.response.model';
import { SignUpModel } from '../models/signUp.model';
import { UserStatus } from '../models/user-status.model';
import { GenerateUrl } from 'src/environments/generate-url.model';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {
  baseUrl: string = this.url.mastersUrl;
  authUrl: string = this.url.authUrl;

  constructor(
    private http: HttpClient,
    private url: GenerateUrl
  ) { }

  addUser(reg: SignUpModel) {
    return this.http.post(this.authUrl + '/signup', reg);
  }

  updateUser(userId: number, reg: SignUpModel): Observable<any> {
    return this.http.put(this.authUrl + '/updateUser/' + userId, reg);
  }
  getUserById(userId: number): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.authUrl + '/get/' + userId);
  }
  viewUserById(userId: number): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.authUrl + '/getUser/' + userId);
  }
  getUserList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.authUrl + '/getAll');
  }
  getDesignationList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllDesignation');
  }
  getAccessLevel(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllAccessLevel');
  }

  getRoleList(): Observable<ListResponse[]> {
    return this.http.get<ListResponse[]>(this.baseUrl + '/getAllRole');
  }

  changeUserStatus(status: UserStatus) {
    return this.http.put(this.authUrl + '/changeUserStaus', status);
  }
}
