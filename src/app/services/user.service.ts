import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {environment} from "../../environments/environment";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }

  getAll(): Observable<[]> {
    return this.httpClient.get<[]>(environment.apiUrl + '/api/guest/users');
  }
  updateUser(userId : any , user : User){
    return this.httpClient.put<User>(environment.apiUrl + '/users/' + userId, user)
  }
  findById(id:any): Observable<User>{
    return this.httpClient.get<User>(environment.apiUrl + '/users/' + id)
  }


}
