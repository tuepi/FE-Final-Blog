import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Post} from "../models/post";

const API_URL = environment.apiUrl + "/api/posts";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient : HttpClient) { }

  getAllByPublicStatus(): Observable<any> {
    return this.httpClient.get<any>(API_URL + '/status/1');
  }
  findById(id:any): Observable<Post>{
    return this.httpClient.get<Post>(API_URL +id)
  }
}
