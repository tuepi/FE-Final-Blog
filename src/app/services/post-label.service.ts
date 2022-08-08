import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
const API_URL = environment.apiUrl + "/api/post-labels/";

@Injectable({
  providedIn: 'root'
})
export class PostLabelService {
listPostLabel : any = []
  constructor(private httpClient: HttpClient) { }

  getAllPostLabel(labelId: any) : Observable<any>{
    return this.httpClient.get<any>(API_URL + "label/" + labelId);
  }
}
