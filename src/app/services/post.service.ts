import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Post} from "../models/post";

const API_URL = environment.apiUrl + "/api/posts/";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  currentUserId : any = localStorage.getItem('ID')

  constructor(private httpClient : HttpClient) { }

  getAllByPublicStatus(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(environment.apiUrl + '/api/guest');
  }

  // getUsers(page: number){
  //   return this.httpClient.get(API_URL + '?page=' + page);
  // }

  getMyPosts(): Observable<any> {
    return this.httpClient.get<any>(API_URL + 'user/' + this.currentUserId);
  }
  findById(id:any): Observable<Post>{
    return this.httpClient.get<Post>(API_URL +id)
  }
  deletePost(id:any):Observable<Post>{
    return this.httpClient.delete<Post>(API_URL+id)
  }


  save(post:Post){
    return this.httpClient.post<Post>(API_URL, post)
  }

}
