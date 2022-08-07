import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Comment} from "../models/comment";
import {Post} from "../models/post";

const API_URL = environment.apiUrl + '/api/comments'

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient : HttpClient) { }

  getAllByPostId(id : any) : Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(API_URL + '/post/' + id)
  }

  save(comment: Comment | any) : Observable<Comment> {
    return this.httpClient.post<Comment>(API_URL , comment)
  }
}
