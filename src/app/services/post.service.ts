import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

const API_URL = environment.apiUrl + "/api/posts";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient : HttpClient) { }

  getAllByPublicStatus(): Observable<any> {
    return this.httpClient.get<any>(API_URL + '/status/1');
  }

}
