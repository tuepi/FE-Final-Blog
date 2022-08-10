import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {PostLabelService} from "./post-label.service";
import {Likes} from "../models/likes";

const API_URL = environment.apiUrl + "/api/posts/";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  currentUserId = localStorage.getItem('ID')

  constructor(private httpClient : HttpClient,
  ) { }

  getAllByPublicStatus(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(environment.apiUrl + '/api/guest');
  }

  getAllForAdmin(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(environment.apiUrl + '/api/admin');
  }

  getMyPosts(id : any): Observable<Post[]> {
    return this.httpClient.get<Post[]>(API_URL + 'user/' + id);
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

  save(post:Post) {
    return this.httpClient.post<Post>(API_URL, post)
  }

  // sendListLabel(id: any, listLabel : String []) {
  //   let post = this.httpClient.post<any>(environment.apiUrl + '/api/posts/send-list-label/' + id);
  //   return post;
  // }


  updatePost(postId: any, post: Post) {
    return this.httpClient.put<Post>(API_URL + postId, post)
  }

  search(title: string) {
    return this.httpClient.get<Post[]>(environment.apiUrl + '/api/guest/title?title=' + title);
  }

  likePost(postId:any, userId :any) : Observable<any>{
    return this.httpClient.post(environment.apiUrl +`/api/likes?postId=${postId}&userId=${userId}`,postId,userId);
  }
  countLike(postId:any): Observable<any>{
    return this.httpClient.put(API_URL+`/update-like-by-post-id/`+postId ,postId);
  }

  likedCheck(postId:any, userId :any) : Observable<Likes>{
    return this.httpClient.get<Likes>(environment.apiUrl +`/api/likes?postId=${postId}&userId=${userId}`);
  }

  getAllLabels(id: any, listLabel : String []) {
    return this.httpClient.post(environment.apiUrl + '/api/posts/send-list-label/' + id,listLabel );
    // return this.httpClient.request(`${environment.apiUrl}/api/posts/send-list-label/${id}`);
  }




}
