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

  currentUserId = localStorage.getItem('ID')

  constructor(private httpClient : HttpClient) { }

  getAllByPublicStatus(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(environment.apiUrl + '/api/guest');
  }

  getAllForAdmin(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(environment.apiUrl + '/api/admin');
  }

  getMyPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(API_URL + 'user/' + this.currentUserId);
  }

  getPublicAndMyPrivate(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(API_URL + 'public/user/' + this.currentUserId);
  }

  top5ByLikes(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(environment.apiUrl + '/api/guest/like');
  }

  findById(id:any): Observable<Post>{
    return this.httpClient.get<Post>(environment.apiUrl + '/api/guest/' + id)
  }

  deletePost(id:any):Observable<Post>{
    return this.httpClient.delete<Post>(API_URL + id)
  }

  deletePostByAdmin(id:any):Observable<Post>{
    return this.httpClient.delete<Post>(environment.apiUrl + '/api/admin/' + id)
  }

  save(post:Post){
    return this.httpClient.post<Post>(API_URL, post)
  }


  updatePost(postId: any, post: Post) {
    return this.httpClient.put<Post>(API_URL + postId, post)
  }
}
