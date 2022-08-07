import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-display-posts',
  templateUrl: './display-posts.component.html',
  styleUrls: ['./display-posts.component.css']
})
export class DisplayPostsComponent implements OnInit {
  //
  // p : number = 1;
  // total: number = 0;
  //
  // @Input() posts: Post[] | any;
  //
  // constructor() { }
  //
  // ngOnInit(): void {
  // }
  //
  // pageChangeEvent(event: number){
  //   this.p = event;
  //   // getAllByPublicStatus();
  // }


  id: any;

  @Input()
  posts: Post[] | any;
  p: number = 1;
  total: number = 0;

  constructor(private postService: PostService,
              private router: Router) {
  }

  ngOnInit(): void {
    // this.getAllByPublicStatus()
  }

  // getAllByPublicStatus() {
  //   this.postService.getAllByPublicStatus().subscribe(result => {
  //     console.log(result)
  //     this.posts = result;
  //   }, error => {
  //     console.log("Lỗi");
  //   });
  // }

  // getAllByPublicStatus(){
  //   // @ts-ignore
  //   this.postService.getAllByPublicStatus(this.p).subscribe((response: any) => {
  //     this.posts = response;
  //     this.total = response.total;
  //   });
  // }

  /**
   * Write code on Method
   *
   * @return response()
   */

  pageChangeEvent(event: number) {
    this.p = event;
    // this.getAllByPublicStatus();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }


}
