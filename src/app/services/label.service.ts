import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

const API_URL = environment.apiUrl + "/api/labels/";

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private httpClient: HttpClient) {
  }

  getAllLabels() : Observable<any>{
    return this.httpClient.get<any>(API_URL);
  }

}
